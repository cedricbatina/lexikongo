// api/search-words.js

import { getConnection } from "./db.config";
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
});
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
