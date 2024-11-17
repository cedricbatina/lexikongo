// api/search-verbs.js
/*
import { getConnection } from "./db.config";
import { getQuery } from "h3";

export default defineEventHandler(async (event) => {
  // Récupérer les paramètres de la requête
  const { query } = getQuery(event);

  // Si la requête est vide ou non définie, retourner un tableau vide
  if (!query || query.trim() === "") {
    return [];
  }

  // Requête SQL pour rechercher les verbes correspondants
  const sqlQuery = `
    SELECT 'verb' AS type, s.slug, v.name AS singular, NULL AS plural, v.phonetic,
           GROUP_CONCAT(DISTINCT vm_fr.meaning ORDER BY vm_fr.meaning SEPARATOR ', ') AS translation_fr,
           GROUP_CONCAT(DISTINCT vm_en.meaning ORDER BY vm_en.meaning SEPARATOR ', ') AS translation_en
    FROM verbs v
    JOIN slugs s ON v.verb_id = s.verb_id
    LEFT JOIN verb_meanings vm_fr ON v.verb_id = vm_fr.verb_id AND vm_fr.language_code = 'fr'
    LEFT JOIN verb_meanings vm_en ON v.verb_id = vm_en.verb_id AND vm_en.language_code = 'en'
    WHERE v.name LIKE ? OR v.phonetic LIKE ? OR vm_fr.meaning LIKE ? OR vm_en.meaning LIKE ?
    GROUP BY v.verb_id, s.slug, v.name, v.phonetic
    ORDER BY v.name;
  `;

  // Paramètres pour la requête préparée
  const searchParam = `%${query}%`;
  const params = [searchParam, searchParam, searchParam, searchParam];

  try {
    const connection = await getConnection();
    const [results] = await connection.execute(sqlQuery, params);
    await connection.end();
    return results;
  } catch (error) {
    console.error("Erreur lors de la récupération des verbes :", error);
    return { error: "Erreur lors de la récupération des verbes." };
  }
});
*/
import { getConnection } from "./db.config";
import { getQuery } from "h3"; // Pour récupérer les paramètres de la requête

export default defineEventHandler(async (event) => {
  const { query } = getQuery(event);

  console.log("Received query for verbs:", query);

  if (!query || query.trim() === "") {
    return [];
  }

  const sqlQuery = `
    SELECT 'verb' AS type, s.slug, v.name AS singular, NULL AS plural, v.phonetic,
           GROUP_CONCAT(DISTINCT vm_fr.meaning ORDER BY vm_fr.meaning SEPARATOR ', ') AS translation_fr,
           GROUP_CONCAT(DISTINCT vm_en.meaning ORDER BY vm_en.meaning SEPARATOR ', ') AS translation_en
    FROM verbs v
    JOIN slugs s ON v.verb_id = s.verb_id
    LEFT JOIN verb_meanings vm_fr ON v.verb_id = vm_fr.verb_id AND vm_fr.language_code = 'fr'
    LEFT JOIN verb_meanings vm_en ON v.verb_id = vm_en.verb_id AND vm_en.language_code = 'en'
    WHERE v.name LIKE ? OR v.phonetic LIKE ? OR vm_fr.meaning LIKE ? OR vm_en.meaning LIKE ?
    GROUP BY v.verb_id, s.slug, v.name, v.phonetic
    ORDER BY v.name;
  `;

  const searchParam = `%${query}%`;
  const params = [searchParam, searchParam, searchParam, searchParam];

  console.log("SQL Query for verbs:", sqlQuery);
  console.log("Params for verbs:", params);

  try {
    const connection = await getConnection();
    const [results] = await connection.execute(sqlQuery, params);
    console.log("Results from DB for verbs:", results);
    await connection.end();
    return results;
  } catch (error) {
    console.error("Erreur lors de la récupération des verbes :", error);
    return { error: "Erreur lors de la récupération des verbes." };
  }
});
