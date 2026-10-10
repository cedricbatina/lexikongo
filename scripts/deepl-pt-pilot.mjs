/**
 * Pilot FR -> PT proposals for Lexikongo. READ-ONLY database access.
 * Usage (Node >= 18, mysql2 installed): node scripts/deepl-pt-pilot.mjs
 * Env: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT,
 * DEEPL_API_KEY, optional DEEPL_API_URL, PT_PILOT_LIMIT (default 20),
 * PT_TARGET_LANG (default PT-PT).
 * The script NEVER writes to the DB. Review output before any import.
 */
import mysql from "mysql2/promise";
import { writeFile } from "node:fs/promises";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const key = process.env.DEEPL_API_KEY;
const limit = Math.min(50, Math.max(1, Number(process.env.PT_PILOT_LIMIT || 20)));
const targetLang = process.env.PT_TARGET_LANG || "PT-PT";
const endpoint = process.env.DEEPL_API_URL || "https://api-free.deepl.com/v2/translate";
if (!key || !/^PT(-PT|-BR)?$/.test(targetLang) || !Number.isInteger(limit)) {
  throw new Error("Set DEEPL_API_KEY and valid PT_TARGET_LANG / PT_PILOT_LIMIT.");
}
if (!/^https:\/\/(api-free|api)\.deepl\.com\/v2\/translate$/.test(endpoint)) {
  throw new Error("DEEPL_API_URL must be an official DeepL API translation endpoint.");
}

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 3306),
});

const candidates = [];
try {
  // NOTE: entity-level NOT EXISTS does not imply per-sense alignment.
  // We deliberately propose only entities with NO Portuguese meaning at all.
  // Existing PT entries are never touched, and ambiguous multiple FR meanings
  // are flagged for manual alignment rather than assumed to be 1:1.
  for (const entry of [
    { kind: "word", table: "word_meanings", id: "word_id" },
    { kind: "verb", table: "verb_meanings", id: "verb_id" },
  ]) {
    const [rows] = await connection.execute(
      `SELECT f.${entry.id} AS entity_id, f.meaning_id AS fr_meaning_id,
              f.meaning AS fr_meaning
         FROM ${entry.table} AS f
        WHERE f.language_code = 'fr'
          AND f.meaning IS NOT NULL AND TRIM(f.meaning) <> ''
          AND NOT EXISTS (
            SELECT 1 FROM ${entry.table} AS p
             WHERE p.${entry.id} = f.${entry.id}
               AND p.language_code IN ('pt', 'pt-PT', 'pt-BR')
          )
        ORDER BY f.${entry.id}, f.meaning_id
        LIMIT ${limit}`
    );
    candidates.push(...rows.map(row => ({ kind: entry.kind, ...row })));
  }
} finally {
  await connection.end();
}

const selected = candidates.slice(0, limit);
if (!selected.length) {
  console.log("No candidate meanings found. No output created.");
  process.exit(0);
}
const sourceTexts = selected.map(row => row.fr_meaning);
const form = new URLSearchParams({ source_lang: "FR", target_lang: targetLang });
for (const sourceText of sourceTexts) form.append("text", sourceText);
const response = await fetch(endpoint, {
  method: "POST",
  headers: { Authorization: `DeepL-Auth-Key ${key}`, "Content-Type": "application/x-www-form-urlencoded" },
  body: form,
});
if (!response.ok) throw new Error(`DeepL request failed (HTTP ${response.status}). Check API plan, endpoint and quota.`);
const data = await response.json();
if (!Array.isArray(data.translations) || data.translations.length !== selected.length) {
  throw new Error("Unexpected translation count; no output created.");
}
const multiplicity = new Map();
for (const row of selected) {
  const id = `${row.kind}:${row.entity_id}`;
  multiplicity.set(id, (multiplicity.get(id) || 0) + 1);
}
const proposals = selected.map((row, i) => ({
  ...row,
  target_language: targetLang,
  proposed_pt_meaning: data.translations[i].text,
  status: "AUTO_DRAFT",
  needs_manual_sense_alignment: (multiplicity.get(`${row.kind}:${row.entity_id}`) || 0) > 1,
}));
await mkdir(resolve("tmp"), { recursive: true });
const outputPath = resolve("tmp", "lexikongo-pt-pilot.json");
await writeFile(outputPath, JSON.stringify({
  note: "REVIEW ONLY. No DB write performed. Multiple FR senses must be manually aligned.",
  source: "fr",
  target: targetLang,
  count: proposals.length,
  proposals,
}, null, 2), { mode: 0o600 });
console.log(`Wrote ${proposals.length} review proposals to ${outputPath}. No database modifications.`);
