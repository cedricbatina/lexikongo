import { getConnection } from "./db.config";
import { getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const { query, language, mode } = getQuery(event);

  if (!query || query.trim() === "") {
    return [];
  }

  let sqlQuery = "";
  let params = [];

  if (mode === "strict") {
    switch (language) {
      case "kikongo":
        sqlQuery = `
          SELECT 'verb' AS type, s.slug, v.name AS singular, NULL AS plural, v.phonetic,
                GROUP_CONCAT(DISTINCT vm_fr.meaning ORDER BY vm_fr.meaning SEPARATOR ', ') AS translation_fr,
                GROUP_CONCAT(DISTINCT vm_en.meaning ORDER BY vm_en.meaning SEPARATOR ', ') AS translation_en
          FROM verbs v
          JOIN slugs s ON v.verb_id = s.verb_id
          LEFT JOIN verb_meanings vm_fr ON v.verb_id = vm_fr.verb_id AND vm_fr.language_code = 'fr'
          LEFT JOIN verb_meanings vm_en ON v.verb_id = vm_en.verb_id AND vm_en.language_code = 'en'
          WHERE v.name = ? OR v.phonetic = ?
          GROUP BY v.verb_id, s.slug, v.name, v.phonetic
          ORDER BY v.name;
        `;
        params = [query, query];
        break;

      case "fr":
        sqlQuery = `
          SELECT 'translation' AS type, s.slug, v.name AS singular, NULL AS plural, v.phonetic,
                wm.meaning AS translation_fr,
                GROUP_CONCAT(DISTINCT vm_en.meaning ORDER BY vm_en.meaning SEPARATOR ', ') AS translation_en
          FROM verb_meanings wm
          JOIN verbs v ON wm.verb_id = v.verb_id
          JOIN slugs s ON v.verb_id = s.verb_id
          LEFT JOIN verb_meanings vm_en ON v.verb_id = vm_en.verb_id AND vm_en.language_code = 'en'
          WHERE wm.meaning = ? AND wm.language_code = 'fr'
          GROUP BY wm.meaning, v.verb_id, s.slug, v.name, v.phonetic
          ORDER BY wm.meaning;
        `;
        params = [query];
        break;

      case "en":
        sqlQuery = `
          SELECT 'translation' AS type, s.slug, v.name AS singular, NULL AS plural, v.phonetic,
                GROUP_CONCAT(DISTINCT vm_fr.meaning ORDER BY vm_fr.meaning SEPARATOR ', ') AS translation_fr,
                wm.meaning AS translation_en
          FROM verb_meanings wm
          JOIN verbs v ON wm.verb_id = v.verb_id
          JOIN slugs s ON v.verb_id = s.verb_id
          LEFT JOIN verb_meanings vm_fr ON v.verb_id = vm_fr.verb_id AND vm_fr.language_code = 'fr'
          WHERE wm.meaning = ? AND wm.language_code = 'en'
          GROUP BY wm.meaning, v.verb_id, s.slug, v.name, v.phonetic
          ORDER BY wm.meaning;
        `;
        params = [query];
        break;

      default:
        return [];
    }
  } else {
    const searchParam = `%${query}%`;
    switch (language) {
      case "kikongo":
        sqlQuery = `
          SELECT 'verb' AS type, s.slug, v.name AS singular, NULL AS plural, v.phonetic,
                GROUP_CONCAT(DISTINCT vm_fr.meaning ORDER BY vm_fr.meaning SEPARATOR ', ') AS translation_fr,
                GROUP_CONCAT(DISTINCT vm_en.meaning ORDER BY vm_en.meaning SEPARATOR ', ') AS translation_en
          FROM verbs v
          JOIN slugs s ON v.verb_id = s.verb_id
          LEFT JOIN verb_meanings vm_fr ON v.verb_id = vm_fr.verb_id AND vm_fr.language_code = 'fr'
          LEFT JOIN verb_meanings vm_en ON v.verb_id = vm_en.verb_id AND vm_en.language_code = 'en'
          WHERE v.name LIKE ? OR v.phonetic LIKE ?
          GROUP BY v.verb_id, s.slug, v.name, v.phonetic
          ORDER BY v.name;
        `;
        params = [searchParam, searchParam];
        break;

      case "fr":
        sqlQuery = `
          SELECT 'translation' AS type, s.slug, v.name AS singular, NULL AS plural, v.phonetic,
                wm.meaning AS translation_fr,
                GROUP_CONCAT(DISTINCT vm_en.meaning ORDER BY vm_en.meaning SEPARATOR ', ') AS translation_en
          FROM verb_meanings wm
          JOIN verbs v ON wm.verb_id = v.verb_id
          JOIN slugs s ON v.verb_id = s.verb_id
          LEFT JOIN verb_meanings vm_en ON v.verb_id = vm_en.verb_id AND vm_en.language_code = 'en'
          WHERE wm.meaning LIKE ? AND wm.language_code = 'fr'
          GROUP BY wm.meaning, v.verb_id, s.slug, v.name, v.phonetic
          ORDER BY wm.meaning;
        `;
        params = [searchParam];
        break;

      case "en":
        sqlQuery = `
          SELECT 'translation' AS type, s.slug, v.name AS singular, NULL AS plural, v.phonetic,
                GROUP_CONCAT(DISTINCT vm_fr.meaning ORDER BY vm_fr.meaning SEPARATOR ', ') AS translation_fr,
                wm.meaning AS translation_en
          FROM verb_meanings wm
          JOIN verbs v ON wm.verb_id = v.verb_id
          JOIN slugs s ON v.verb_id = s.verb_id
          LEFT JOIN verb_meanings vm_fr ON v.verb_id = vm_fr.verb_id AND vm_fr.language_code = 'fr'
          WHERE wm.meaning LIKE ? AND wm.language_code = 'en'
          GROUP BY wm.meaning, v.verb_id, s.slug, v.name, v.phonetic
          ORDER BY wm.meaning;
        `;
        params = [searchParam];
        break;

      default:
        return [];
    }
  }

  try {
    const connection = await getConnection();
    const [results] = await connection.execute(sqlQuery, params);
    await connection.end();

    return Array.isArray(results) ? results : [];
  } catch (error) {
    console.error("Erreur lors de la récupération des verbes :", error);
    return [];
  }
});
