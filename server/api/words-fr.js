import { getQuery } from "h3";
import { getConnection } from "./db.config";

export default defineEventHandler(async (event) => {
  const { query } = getQuery(event);

  if (!query) {
    return [];
  }

  try {
    const connection = await getConnection();

    const [results] = await connection.execute(
      `(SELECT 'word' AS type, w.slug AS slug, w.singular, w.plural, w.phonetic, 
                GROUP_CONCAT(DISTINCT wm.meaning ORDER BY wm.meaning SEPARATOR ', ') AS translation
        FROM words w
        LEFT JOIN word_meanings wm ON w.word_id = wm.word_id
        WHERE wm.meaning COLLATE utf8mb4_unicode_ci LIKE ? AND wm.language_code = 'fr'
        GROUP BY w.slug, w.singular, w.plural, w.phonetic)
      UNION
      (SELECT 'verb' AS type, v.slug AS slug, v.name AS singular, NULL AS plural, v.phonetic,
                GROUP_CONCAT(DISTINCT vm.meaning ORDER BY vm.meaning SEPARATOR ', ') AS translation
        FROM verbs v
        LEFT JOIN verb_meanings vm ON v.verb_id = vm.verb_id
        WHERE vm.meaning COLLATE utf8mb4_unicode_ci LIKE ? AND vm.language_code = 'fr'
        GROUP BY v.slug, v.name, v.phonetic)
      ORDER BY singular;`,
      [`%${query}%`, `%${query}%`]
    );

    await connection.end();

    return results;
  } catch (error) {
    console.error("Erreur lors de la récupération des données MySQL :", error);
    return { error: "Erreur lors de la récupération des données." };
  }
});
