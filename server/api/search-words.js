import { getConnection } from "./db.config";
import { getQuery } from "h3"; // Pour récupérer les paramètres de la requête

export default defineEventHandler(async (event) => {
  const { query, language, mode } = getQuery(event);

  if (!query || query.trim() === "") {
    return [];
  }

  let sqlQuery = "";
  let params = [];

  // Recherche stricte ou automatique en fonction du mode
  if (mode === "strict") {
    switch (language) {
      case "kikongo":
        sqlQuery = `
          SELECT 'word' AS type, s.slug, w.singular, w.plural, w.phonetic,
                GROUP_CONCAT(DISTINCT wm_fr.meaning ORDER BY wm_fr.meaning SEPARATOR ', ') AS translation_fr,
                GROUP_CONCAT(DISTINCT wm_en.meaning ORDER BY wm_en.meaning SEPARATOR ', ') AS translation_en
          FROM words w
          JOIN slugs s ON w.word_id = s.word_id
          LEFT JOIN word_meanings wm_fr ON w.word_id = wm_fr.word_id AND wm_fr.language_code = 'fr'
          LEFT JOIN word_meanings wm_en ON w.word_id = wm_en.word_id AND wm_en.language_code = 'en'
          WHERE w.singular = ? OR w.plural = ?
          GROUP BY w.word_id, s.slug, w.singular, w.plural, w.phonetic
          ORDER BY w.singular;
        `;
        params = [query, query];
        break;

      case "français":
        sqlQuery = `
          SELECT 'translation' AS type, s.slug, w.singular, w.plural, w.phonetic,
                wm.meaning AS translation_fr, NULL AS translation_en
          FROM word_meanings wm
          JOIN words w ON wm.word_id = w.word_id
          JOIN slugs s ON w.word_id = s.word_id
          WHERE wm.meaning = ? AND wm.language_code = 'fr'
          GROUP BY wm.meaning, w.word_id, s.slug, w.singular, w.plural, w.phonetic
          ORDER BY wm.meaning;
        `;
        params = [query];
        break;

      case "anglais":
        sqlQuery = `
          SELECT 'translation' AS type, s.slug, w.singular, w.plural, w.phonetic,
                NULL AS translation_fr, wm.meaning AS translation_en
          FROM word_meanings wm
          JOIN words w ON wm.word_id = w.word_id
          JOIN slugs s ON w.word_id = s.word_id
          WHERE wm.meaning = ? AND wm.language_code = 'en'
          GROUP BY wm.meaning, w.word_id, s.slug, w.singular, w.plural, w.phonetic
          ORDER BY wm.meaning;
        `;
        params = [query];
        break;

      default:
        return [];
    }
  } else {
    // Correspondance partielle pour la recherche automatique
    const searchParam = `%${query}%`;
    switch (language) {
      case "kikongo":
        sqlQuery = `
          SELECT 'word' AS type, s.slug, w.singular, w.plural, w.phonetic,
                GROUP_CONCAT(DISTINCT wm_fr.meaning ORDER BY wm_fr.meaning SEPARATOR ', ') AS translation_fr,
                GROUP_CONCAT(DISTINCT wm_en.meaning ORDER BY wm_en.meaning SEPARATOR ', ') AS translation_en
          FROM words w
          JOIN slugs s ON w.word_id = s.word_id
          LEFT JOIN word_meanings wm_fr ON w.word_id = wm_fr.word_id AND wm_fr.language_code = 'fr'
          LEFT JOIN word_meanings wm_en ON w.word_id = wm_en.word_id AND wm_en.language_code = 'en'
          WHERE w.singular LIKE ? OR w.plural LIKE ? OR w.phonetic LIKE ?
          GROUP BY w.word_id, s.slug, w.singular, w.plural, w.phonetic
          ORDER BY w.singular;
        `;
        params = [searchParam, searchParam, searchParam];
        break;

      case "français":
        sqlQuery = `
          SELECT 'translation' AS type, s.slug, w.singular, w.plural, w.phonetic,
                wm.meaning AS translation_fr, NULL AS translation_en
          FROM word_meanings wm
          JOIN words w ON wm.word_id = w.word_id
          JOIN slugs s ON w.word_id = s.word_id
          WHERE wm.meaning LIKE ? AND wm.language_code = 'fr'
          GROUP BY wm.meaning, w.word_id, s.slug, w.singular, w.plural, w.phonetic
          ORDER BY wm.meaning;
        `;
        params = [searchParam];
        break;

      case "anglais":
        sqlQuery = `
          SELECT 'translation' AS type, s.slug, w.singular, w.plural, w.phonetic,
                NULL AS translation_fr, wm.meaning AS translation_en
          FROM word_meanings wm
          JOIN words w ON wm.word_id = w.word_id
          JOIN slugs s ON w.word_id = s.word_id
          WHERE wm.meaning LIKE ? AND wm.language_code = 'en'
          GROUP BY wm.meaning, w.word_id, s.slug, w.singular, w.plural, w.phonetic
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
    console.error("Erreur lors de la récupération des mots :", error);
    return [];
  }
});

/*import { getConnection } from "./db.config";
import { getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const { query } = getQuery(event);

  console.log("Received query:", query);

  if (!query || query.trim() === "") {
    return [];
  }

  const sqlQuery = `
    SELECT 'word' AS type, s.slug, w.singular, w.plural, w.phonetic,
           GROUP_CONCAT(DISTINCT wm_fr.meaning ORDER BY wm_fr.meaning SEPARATOR ', ') AS translation_fr,
           GROUP_CONCAT(DISTINCT wm_en.meaning ORDER BY wm_en.meaning SEPARATOR ', ') AS translation_en
    FROM words w
    JOIN slugs s ON w.word_id = s.word_id
    LEFT JOIN word_meanings wm_fr ON w.word_id = wm_fr.word_id AND wm_fr.language_code = 'fr'
    LEFT JOIN word_meanings wm_en ON w.word_id = wm_en.word_id AND wm_en.language_code = 'en'
    WHERE w.singular LIKE ? OR w.plural LIKE ? OR w.phonetic LIKE ? OR wm_fr.meaning LIKE ? OR wm_en.meaning LIKE ?
    GROUP BY w.word_id, s.slug, w.singular, w.plural, w.phonetic
    ORDER BY w.singular;
  `;

  const searchParam = `%${query}%`;
  const params = [
    searchParam,
    searchParam,
    searchParam,
    searchParam,
    searchParam,
  ];

  console.log("SQL Query:", sqlQuery);
  console.log("Params:", params);

  try {
    const connection = await getConnection();
    const [results] = await connection.execute(sqlQuery, params);
    console.log("Results from DB:", results);
    await connection.end();
    return results;
  } catch (error) {
    console.error("Erreur lors de la récupération des mots :", error);
    return { error: "Erreur lors de la récupération des mots." };
  }
});*/
/*
import { getConnection } from "./db.config";
import { getQuery } from "h3"; // Pour récupérer les paramètres de la requête

export default defineEventHandler(async (event) => {
  const { query } = getQuery(event);

  if (!query || query.trim() === "") {
    return [];
  }

  const sqlQuery = `
    SELECT 'word' AS type, s.slug, w.singular, w.plural, w.phonetic,
           GROUP_CONCAT(DISTINCT wm_fr.meaning ORDER BY wm_fr.meaning SEPARATOR ', ') AS translation_fr,
           GROUP_CONCAT(DISTINCT wm_en.meaning ORDER BY wm_en.meaning SEPARATOR ', ') AS translation_en
    FROM words w
    JOIN slugs s ON w.word_id = s.word_id
    LEFT JOIN word_meanings wm_fr ON w.word_id = wm_fr.word_id AND wm_fr.language_code = 'fr'
    LEFT JOIN word_meanings wm_en ON w.word_id = wm_en.word_id AND wm_en.language_code = 'en'
    WHERE w.singular LIKE ? OR w.plural LIKE ? OR w.phonetic LIKE ? OR wm_fr.meaning LIKE ? OR wm_en.meaning LIKE ?
    GROUP BY w.word_id, s.slug, w.singular, w.plural, w.phonetic
    ORDER BY w.singular;
  `;

  const searchParam = `%${query}%`;
  const params = [
    searchParam,
    searchParam,
    searchParam,
    searchParam,
    searchParam,
  ];

  try {
    const connection = await getConnection();
    const [results] = await connection.execute(sqlQuery, params);

    await connection.end();
    return results;
  } catch (error) {
    console.error("Erreur lors de la récupération des mots :", error);
    return { error: "Erreur lors de la récupération des mots." };
  }
});
*/
