import { getConnection } from "./db.config";

export default defineEventHandler(async (event) => {
  try {
    const connection = await getConnection();

    // Requête SQL sans LIMIT pour récupérer tous les mots et verbes
    const [results] = await connection.execute(`
      (SELECT 'word' AS type, w.word_id AS id, w.singular, w.plural, w.phonetic,
              (SELECT GROUP_CONCAT(wm.meaning SEPARATOR ', ') 
               FROM word_meanings wm 
               WHERE wm.word_id = w.word_id AND wm.language_code = 'fr') AS translation_fr,
              (SELECT GROUP_CONCAT(wm.meaning SEPARATOR ', ') 
               FROM word_meanings wm 
               WHERE wm.word_id = w.word_id AND wm.language_code = 'en') AS translation_en
        FROM words w)
      UNION
      (SELECT 'verb' AS type, v.verb_id AS id, v.name AS singular, NULL AS plural, v.phonetic,
              (SELECT GROUP_CONCAT(vm.meaning SEPARATOR ', ') 
               FROM verb_meanings vm 
               WHERE vm.verb_id = v.verb_id AND vm.language_code = 'fr') AS translation_fr,
              (SELECT GROUP_CONCAT(vm.meaning SEPARATOR ', ') 
               FROM verb_meanings vm 
               WHERE vm.verb_id = v.verb_id AND vm.language_code = 'en') AS translation_en
        FROM verbs v)
      ORDER BY singular;
    `);

    await connection.end();

    return results;
  } catch (error) {
    console.error("Erreur lors de la récupération des mots et verbes :", error);
    return { error: "Erreur lors de la récupération des données." };
  }
});
