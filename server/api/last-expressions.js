import { getConnection } from "./db.config";

export default defineEventHandler(async (event) => {
  try {
    const connection = await getConnection();

    // Requête pour récupérer les derniers mots et verbes avec traductions
    const [expressions] = await connection.execute(`
      SELECT 
        'word' AS type,
        w.singular,
        w.plural,
        w.phonetic,
        NULL AS name,
        (SELECT GROUP_CONCAT(DISTINCT wm.meaning SEPARATOR ', ') 
         FROM word_meanings wm 
         WHERE wm.word_id = w.word_id AND wm.language_code = 'fr') AS translation_fr,
        (SELECT GROUP_CONCAT(DISTINCT wm.meaning SEPARATOR ', ') 
         FROM word_meanings wm 
         WHERE wm.word_id = w.word_id AND wm.language_code = 'en') AS translation_en,
        w.created_at,
        s.slug
      FROM words w
      JOIN slugs s ON w.word_id = s.word_id
      WHERE w.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)

      UNION ALL

      SELECT 
        'verb' AS type,
        NULL AS singular,
        NULL AS plural,
        v.phonetic,
        v.name,
        (SELECT GROUP_CONCAT(DISTINCT vm.meaning SEPARATOR ', ') 
         FROM verb_meanings vm 
         WHERE vm.verb_id = v.verb_id AND vm.language_code = 'fr') AS translation_fr,
        (SELECT GROUP_CONCAT(DISTINCT vm.meaning SEPARATOR ', ') 
         FROM verb_meanings vm 
         WHERE vm.verb_id = v.verb_id AND vm.language_code = 'en') AS translation_en,
        v.created_at,
        s.slug
      FROM verbs v
      JOIN slugs s ON v.verb_id = s.verb_id
      WHERE v.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)

      ORDER BY created_at DESC
    `);

    await connection.end();
    return expressions;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des dernières expressions :",
      error
    );
    return {
      error: "Erreur lors de la récupération des dernières expressions.",
    };
  }
});
