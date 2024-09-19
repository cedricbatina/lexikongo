import { getQuery } from "h3";
import { getConnection } from "./db.config";

export default defineEventHandler(async (event) => {
  const { query, language } = getQuery(event);

  // Log des informations de la requête
  console.log("Requête reçue :", { query, language });

  // Si la requête est vide, renvoyer un tableau vide
  if (!query) {
    console.log("La requête est vide, retour d'un tableau vide.");
    return [];
  }

  let sqlQuery = "";
  let params = [];

  if (language === "kikongo" || !language) {
    console.log("Recherche en Kikongo");
    sqlQuery = `
      (SELECT 'word' AS type, w.word_id AS id, w.singular, w.plural, w.phonetic, 
              (SELECT GROUP_CONCAT(DISTINCT wm.meaning SEPARATOR ', ') 
               FROM word_meanings wm 
               WHERE wm.word_id = w.word_id AND wm.language_code = 'fr') AS translation_fr,
              (SELECT GROUP_CONCAT(DISTINCT wm.meaning SEPARATOR ', ') 
               FROM word_meanings wm 
               WHERE wm.word_id = w.word_id AND wm.language_code = 'en') AS translation_en
      FROM words w
      WHERE w.singular COLLATE utf8mb4_unicode_ci LIKE ? 
      OR w.plural COLLATE utf8mb4_unicode_ci LIKE ? 
      OR w.root COLLATE utf8mb4_unicode_ci LIKE ?
      GROUP BY w.word_id, w.singular, w.plural, w.phonetic)
    UNION
    (SELECT 'verb' AS type, v.verb_id AS id, v.name AS singular, NULL AS plural, v.phonetic,
              (SELECT GROUP_CONCAT(DISTINCT vm.meaning SEPARATOR ', ') 
               FROM verb_meanings vm 
               WHERE vm.verb_id = v.verb_id AND vm.language_code = 'fr') AS translation_fr,
              (SELECT GROUP_CONCAT(DISTINCT vm.meaning SEPARATOR ', ') 
               FROM verb_meanings vm 
               WHERE vm.verb_id = v.verb_id AND vm.language_code = 'en') AS translation_en
      FROM verbs v
      WHERE v.name COLLATE utf8mb4_unicode_ci LIKE ?
      GROUP BY v.verb_id, v.name, v.phonetic)
    ORDER BY singular LIMIT 30;`;

    params = [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`];
  } else if (language === "fr" || language === "en") {
    console.log(`Recherche en ${language}`);
    sqlQuery = `
      (SELECT 'word' AS type, w.word_id AS id, w.singular, w.plural, w.phonetic, 
              (SELECT GROUP_CONCAT(DISTINCT wm.meaning SEPARATOR ', ') 
               FROM word_meanings wm 
               WHERE wm.word_id = w.word_id AND wm.language_code = 'fr') AS translation_fr,
              (SELECT GROUP_CONCAT(DISTINCT wm.meaning SEPARATOR ', ') 
               FROM word_meanings wm 
               WHERE wm.word_id = w.word_id AND wm.language_code = 'en') AS translation_en
      FROM words w
      JOIN word_meanings wm ON wm.word_id = w.word_id
      WHERE wm.language_code = ? AND wm.meaning COLLATE utf8mb4_unicode_ci LIKE ?
      GROUP BY w.word_id, w.singular, w.plural, w.phonetic)
    UNION
    (SELECT 'verb' AS type, v.verb_id AS id, v.name AS singular, NULL AS plural, v.phonetic,
              (SELECT GROUP_CONCAT(DISTINCT vm.meaning SEPARATOR ', ') 
               FROM verb_meanings vm 
               WHERE vm.verb_id = v.verb_id AND vm.language_code = 'fr') AS translation_fr,
              (SELECT GROUP_CONCAT(DISTINCT vm.meaning SEPARATOR ', ') 
               FROM verb_meanings vm 
               WHERE vm.verb_id = v.verb_id AND vm.language_code = 'en') AS translation_en
      FROM verbs v
      JOIN verb_meanings vm ON vm.verb_id = v.verb_id
      WHERE vm.language_code = ? AND vm.meaning COLLATE utf8mb4_unicode_ci LIKE ?
      GROUP BY v.verb_id, v.name, v.phonetic)
    ORDER BY singular LIMIT 30;`;

    params = [language, `%${query}%`, language, `%${query}%`];
  }

  try {
    const connection = await getConnection();
    const [results] = await connection.execute(sqlQuery, params);

    await connection.end();
    return results;
  } catch (error) {
    console.error("Erreur lors de la récupération des données MySQL :", error);
    return { error: "Erreur lors de la récupération des données." };
  }
});
