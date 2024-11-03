import { getConnection } from "./db.config";
import { getQuery } from "h3"; // Pour récupérer les paramètres de la requête

export default defineEventHandler(async (event) => {
  const { query, language } = getQuery(event); // On récupère les paramètres 'query' et 'language'

  let sqlQuery = `
    (SELECT 'word' AS type, s.slug, w.singular, w.plural, w.phonetic, 
            GROUP_CONCAT(DISTINCT wm_fr.meaning ORDER BY wm_fr.meaning SEPARATOR ', ') AS translation_fr,
            GROUP_CONCAT(DISTINCT wm_en.meaning ORDER BY wm_en.meaning SEPARATOR ', ') AS translation_en
     FROM words w
     JOIN slugs s ON w.word_id = s.word_id
     LEFT JOIN word_meanings wm_fr ON w.word_id = wm_fr.word_id AND wm_fr.language_code = 'fr'
     LEFT JOIN word_meanings wm_en ON w.word_id = wm_en.word_id AND wm_en.language_code = 'en'
     WHERE w.singular LIKE ? OR w.plural LIKE ? OR w.phonetic LIKE ? OR wm_fr.meaning LIKE ? OR wm_en.meaning LIKE ?
     GROUP BY w.word_id, s.slug, w.singular, w.plural, w.phonetic)

    UNION

    (SELECT 'verb' AS type, s.slug, v.name AS singular, NULL AS plural, v.phonetic,
            GROUP_CONCAT(DISTINCT vm_fr.meaning ORDER BY vm_fr.meaning SEPARATOR ', ') AS translation_fr,
            GROUP_CONCAT(DISTINCT vm_en.meaning ORDER BY vm_en.meaning SEPARATOR ', ') AS translation_en
     FROM verbs v
     JOIN slugs s ON v.verb_id = s.verb_id
     LEFT JOIN verb_meanings vm_fr ON v.verb_id = vm_fr.verb_id AND vm_fr.language_code = 'fr'
     LEFT JOIN verb_meanings vm_en ON v.verb_id = vm_en.verb_id AND vm_en.language_code = 'en'
     WHERE v.name LIKE ? OR v.phonetic LIKE ? OR vm_fr.meaning LIKE ? OR vm_en.meaning LIKE ?
     GROUP BY v.verb_id, s.slug, v.name, v.phonetic)

    ORDER BY singular;
  `;

  const params = [
    `%${query || ""}%`,
    `%${query || ""}%`,
    `%${query || ""}%`,
    `%${query || ""}%`,
    `%${query || ""}%`,
    `%${query || ""}%`,
    `%${query || ""}%`,
    `%${query || ""}%`,
    `%${query || ""}%`,
  ];

  try {
    const connection = await getConnection();
    const [results] = await connection.execute(sqlQuery, params);
    await connection.end();
    return results;
  } catch (error) {
    console.error("Erreur lors de la récupération des mots et verbes:", error);
    return { error: "Erreur lors de la récupération des mots et verbes." };
  }
});
