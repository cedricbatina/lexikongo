import { getConnection } from "./db.config";

export default defineEventHandler(async (event) => {
  try {
    const connection = await getConnection();

    // Requête SQL corrigée pour inclure les slugs
    const [results] = await connection.execute(`
      (SELECT 'word' AS type, w.word_id AS id, s.slug, w.singular, w.plural, w.phonetic,
              (SELECT GROUP_CONCAT(wm.meaning SEPARATOR ', ') 
               FROM word_meanings wm 
               WHERE wm.word_id = w.word_id AND wm.language_code = 'fr') AS translation_fr,
              (SELECT GROUP_CONCAT(wm.meaning SEPARATOR ', ') 
               FROM word_meanings wm 
               WHERE wm.word_id = w.word_id AND wm.language_code = 'en') AS translation_en
        FROM words w
        JOIN slugs s ON w.word_id = s.word_id -- Jointure avec la table slugs
      )
      UNION
      (SELECT 'verb' AS type, v.verb_id AS id, s.slug, v.name AS singular, NULL AS plural, v.phonetic,
              (SELECT GROUP_CONCAT(vm.meaning SEPARATOR ', ') 
               FROM verb_meanings vm 
               WHERE vm.verb_id = v.verb_id AND vm.language_code = 'fr') AS translation_fr,
              (SELECT GROUP_CONCAT(vm.meaning SEPARATOR ', ') 
               FROM verb_meanings vm 
               WHERE vm.verb_id = v.verb_id AND vm.language_code = 'en') AS translation_en
        FROM verbs v
        JOIN slugs s ON v.verb_id = s.verb_id -- Jointure avec la table slugs
      )
      ORDER BY singular;
    `);

    await connection.end();

    return results;
  } catch (error) {
    console.error("Erreur lors de la récupération des mots et verbes :", error);
    return { error: "Erreur lors de la récupération des données." };
  }
});

/*import { getConnection } from "./db.config";
import { getQuery } from "h3"; // Pour récupérer les paramètres de la requête

export default defineEventHandler(async (event) => {
  const { query, language, mode } = getQuery(event);

  if (!query || query.trim() === "") {
    return [];
  }

  let sqlQuery = "";
  let params = [];

  const searchParam = `%${query}%`;

  if (mode === "strict") {
    // Recherche stricte
    switch (language) {
      case "kikongo":
        sqlQuery = `
          (SELECT 'word' AS type, s.slug, w.singular, w.plural, w.phonetic,
                GROUP_CONCAT(DISTINCT wm_fr.meaning ORDER BY wm_fr.meaning SEPARATOR ', ') AS translation_fr,
                GROUP_CONCAT(DISTINCT wm_en.meaning ORDER BY wm_en.meaning SEPARATOR ', ') AS translation_en
          FROM words w
          JOIN slugs s ON w.word_id = s.word_id
          LEFT JOIN word_meanings wm_fr ON w.word_id = wm_fr.word_id AND wm_fr.language_code = 'fr'
          LEFT JOIN word_meanings wm_en ON w.word_id = wm_en.word_id AND wm_en.language_code = 'en'
          WHERE w.singular = ? OR w.plural = ?
          GROUP BY w.word_id, s.slug, w.singular, w.plural, w.phonetic)

          UNION

          (SELECT 'verb' AS type, s.slug, v.name AS singular, NULL AS plural, v.phonetic,
                GROUP_CONCAT(DISTINCT vm_fr.meaning ORDER BY vm_fr.meaning SEPARATOR ', ') AS translation_fr,
                GROUP_CONCAT(DISTINCT vm_en.meaning ORDER BY vm_en.meaning SEPARATOR ', ') AS translation_en
          FROM verbs v
          JOIN slugs s ON v.verb_id = s.verb_id
          LEFT JOIN verb_meanings vm_fr ON v.verb_id = vm_fr.verb_id AND vm_fr.language_code = 'fr'
          LEFT JOIN verb_meanings vm_en ON v.verb_id = vm_en.verb_id AND vm_en.language_code = 'en'
          WHERE v.name = ?
          GROUP BY v.verb_id, s.slug, v.name, v.phonetic)
          ORDER BY singular;
        `;
        params = [query, query, query];
        break;

      case "français":
        sqlQuery = `
          (SELECT 'word' AS type, s.slug, w.singular, w.plural, w.phonetic,
                wm.meaning AS translation_fr, NULL AS translation_en
          FROM word_meanings wm
          JOIN words w ON wm.word_id = w.word_id
          JOIN slugs s ON w.word_id = s.word_id
          WHERE wm.meaning = ? AND wm.language_code = 'fr'
          GROUP BY wm.meaning, w.word_id, s.slug, w.singular, w.plural, w.phonetic)

          UNION

          (SELECT 'verb' AS type, s.slug, v.name AS singular, NULL AS plural, v.phonetic,
                wm.meaning AS translation_fr, NULL AS translation_en
          FROM verb_meanings wm
          JOIN verbs v ON wm.verb_id = v.verb_id
          JOIN slugs s ON v.verb_id = s.verb_id
          WHERE wm.meaning = ? AND wm.language_code = 'fr'
          GROUP BY wm.meaning, v.verb_id, s.slug, v.name, v.phonetic)
          ORDER BY singular;
        `;
        params = [query, query];
        break;

      case "anglais":
        sqlQuery = `
          (SELECT 'word' AS type, s.slug, w.singular, w.plural, w.phonetic,
                NULL AS translation_fr, wm.meaning AS translation_en
          FROM word_meanings wm
          JOIN words w ON wm.word_id = w.word_id
          JOIN slugs s ON w.word_id = s.word_id
          WHERE wm.meaning = ? AND wm.language_code = 'en'
          GROUP BY wm.meaning, w.word_id, s.slug, w.singular, w.plural, w.phonetic)

          UNION

          (SELECT 'verb' AS type, s.slug, v.name AS singular, NULL AS plural, v.phonetic,
                NULL AS translation_fr, wm.meaning AS translation_en
          FROM verb_meanings wm
          JOIN verbs v ON wm.verb_id = v.verb_id
          JOIN slugs s ON v.verb_id = s.verb_id
          WHERE wm.meaning = ? AND wm.language_code = 'en'
          GROUP BY wm.meaning, v.verb_id, s.slug, v.name, v.phonetic)
          ORDER BY singular;
        `;
        params = [query, query];
        break;

      default:
        return [];
    }
  } else {
    // Recherche automatique
    sqlQuery = `
      (SELECT 'word' AS type, s.slug, w.singular, w.plural, w.phonetic,
            GROUP_CONCAT(DISTINCT wm_fr.meaning ORDER BY wm_fr.meaning SEPARATOR ', ') AS translation_fr,
            GROUP_CONCAT(DISTINCT wm_en.meaning ORDER BY wm_en.meaning SEPARATOR ', ') AS translation_en
      FROM words w
      JOIN slugs s ON w.word_id = s.word_id
      LEFT JOIN word_meanings wm_fr ON w.word_id = wm_fr.word_id AND wm_fr.language_code = 'fr'
      LEFT JOIN word_meanings wm_en ON w.word_id = wm_en.word_id AND wm_en.language_code = 'en'
      WHERE w.singular LIKE ? OR w.plural LIKE ? OR wm_fr.meaning LIKE ? OR wm_en.meaning LIKE ?
      GROUP BY w.word_id, s.slug, w.singular, w.plural, w.phonetic)

      UNION

      (SELECT 'verb' AS type, s.slug, v.name AS singular, NULL AS plural, v.phonetic,
            GROUP_CONCAT(DISTINCT vm_fr.meaning ORDER BY vm_fr.meaning SEPARATOR ', ') AS translation_fr,
            GROUP_CONCAT(DISTINCT vm_en.meaning ORDER BY vm_en.meaning SEPARATOR ', ') AS translation_en
      FROM verbs v
      JOIN slugs s ON v.verb_id = s.verb_id
      LEFT JOIN verb_meanings vm_fr ON v.verb_id = vm_fr.verb_id AND vm_fr.language_code = 'fr'
      LEFT JOIN verb_meanings vm_en ON v.verb_id = vm_en.verb_id AND vm_en.language_code = 'en'
      WHERE v.name LIKE ? OR vm_fr.meaning LIKE ? OR vm_en.meaning LIKE ?
      GROUP BY v.verb_id, s.slug, v.name, v.phonetic)
      ORDER BY singular;
    `;
    params = [
      searchParam,
      searchParam,
      searchParam,
      searchParam,
      searchParam,
      searchParam,
    ];
  }

  try {
    const connection = await getConnection();
    console.log("SQL Query:", sqlQuery);
    console.log("Parameters:", params);
    const [results] = await connection.execute(sqlQuery, params);
    await connection.end();

    return Array.isArray(results) ? results : [];
  } catch (error) {
    console.error("Erreur lors de la récupération des mots et verbes :", error);
    return [];
  }
});

import { getConnection } from "./db.config";
import { getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const { query = "", language = "kikongo", mode = "auto" } = getQuery(event);

  if (!query.trim()) {
    return []; // Retourne un tableau vide si aucune recherche n'est effectuée
  }

  let sqlQuery = "";
  let params = [];

  if (mode === "strict") {
    switch (language) {
      case "kikongo":
        sqlQuery = `
          (SELECT 'word' AS type, s.slug, w.singular, w.plural, w.phonetic,
            GROUP_CONCAT(DISTINCT wm_fr.meaning ORDER BY wm_fr.meaning SEPARATOR ', ') AS translation_fr,
            GROUP_CONCAT(DISTINCT wm_en.meaning ORDER BY wm_en.meaning SEPARATOR ', ') AS translation_en
          FROM words w
          JOIN slugs s ON w.word_id = s.word_id
          LEFT JOIN word_meanings wm_fr ON w.word_id = wm_fr.word_id AND wm_fr.language_code = 'fr'
          LEFT JOIN word_meanings wm_en ON w.word_id = wm_en.word_id AND wm_en.language_code = 'en'
          WHERE w.singular = ? OR w.plural = ?
          GROUP BY w.word_id, s.slug, w.singular, w.plural, w.phonetic)

          UNION

          (SELECT 'verb' AS type, s.slug, v.name AS singular, NULL AS plural, v.phonetic,
            GROUP_CONCAT(DISTINCT vm_fr.meaning ORDER BY vm_fr.meaning SEPARATOR ', ') AS translation_fr,
            GROUP_CONCAT(DISTINCT vm_en.meaning ORDER BY vm_en.meaning SEPARATOR ', ') AS translation_en
          FROM verbs v
          JOIN slugs s ON v.verb_id = s.verb_id
          LEFT JOIN verb_meanings vm_fr ON v.verb_id = vm_fr.verb_id AND vm_fr.language_code = 'fr'
          LEFT JOIN verb_meanings vm_en ON v.verb_id = vm_en.verb_id AND vm_en.language_code = 'en'
          WHERE v.name = ?
          GROUP BY v.verb_id, s.slug, v.name, v.phonetic)
          ORDER BY singular;
        `;
        params = [query, query, query];
        break;

      case "fr":
        sqlQuery = `
          (SELECT 'word' AS type, s.slug, w.singular, w.plural, w.phonetic,
            wm.meaning AS translation_fr, NULL AS translation_en
          FROM word_meanings wm
          JOIN words w ON wm.word_id = w.word_id
          JOIN slugs s ON w.word_id = s.word_id
          WHERE wm.meaning = ? AND wm.language_code = 'fr'
          GROUP BY wm.meaning, w.word_id, s.slug, w.singular, w.plural, w.phonetic)

          UNION

          (SELECT 'verb' AS type, s.slug, v.name AS singular, NULL AS plural, v.phonetic,
            vm.meaning AS translation_fr, NULL AS translation_en
          FROM verb_meanings vm
          JOIN verbs v ON vm.verb_id = v.verb_id
          JOIN slugs s ON v.verb_id = s.verb_id
          WHERE vm.meaning = ? AND vm.language_code = 'fr'
          GROUP BY vm.meaning, v.verb_id, s.slug, v.name, v.phonetic)
          ORDER BY singular;
        `;
        params = [query, query];
        break;

      case "en":
        sqlQuery = `
          (SELECT 'word' AS type, s.slug, w.singular, w.plural, w.phonetic,
            NULL AS translation_fr, wm.meaning AS translation_en
          FROM word_meanings wm
          JOIN words w ON wm.word_id = w.word_id
          JOIN slugs s ON w.word_id = s.word_id
          WHERE wm.meaning = ? AND wm.language_code = 'en'
          GROUP BY wm.meaning, w.word_id, s.slug, w.singular, w.plural, w.phonetic)

          UNION

          (SELECT 'verb' AS type, s.slug, v.name AS singular, NULL AS plural, v.phonetic,
            NULL AS translation_fr, vm.meaning AS translation_en
          FROM verb_meanings vm
          JOIN verbs v ON vm.verb_id = v.verb_id
          JOIN slugs s ON v.verb_id = s.verb_id
          WHERE vm.meaning = ? AND vm.language_code = 'en'
          GROUP BY vm.meaning, v.verb_id, s.slug, v.name, v.phonetic)
          ORDER BY singular;
        `;
        params = [query, query];
        break;

      default:
        return [];
    }
  } else {
    const searchParam = `%${query}%`;
    sqlQuery = `
      (SELECT 'word' AS type, s.slug, w.singular, w.plural, w.phonetic,
  GROUP_CONCAT(DISTINCT wm_fr.meaning ORDER BY wm_fr.meaning SEPARATOR ', ') AS translation_fr,
  GROUP_CONCAT(DISTINCT wm_en.meaning ORDER BY wm_en.meaning SEPARATOR ', ') AS translation_en
FROM words w
JOIN slugs s ON w.word_id = s.word_id
LEFT JOIN word_meanings wm_fr ON w.word_id = wm_fr.word_id AND wm_fr.language_code = 'fr'
LEFT JOIN word_meanings wm_en ON w.word_id = wm_en.word_id AND wm_en.language_code = 'en'
WHERE w.singular LIKE ? OR w.plural LIKE ? OR wm_fr.meaning LIKE ? OR wm_en.meaning LIKE ?
GROUP BY w.word_id, s.slug, w.singular, w.plural, w.phonetic)

UNION

(SELECT 'verb' AS type, s.slug, v.name AS singular, NULL AS plural, v.phonetic,
  GROUP_CONCAT(DISTINCT vm_fr.meaning ORDER BY vm_fr.meaning SEPARATOR ', ') AS translation_fr,
  GROUP_CONCAT(DISTINCT vm_en.meaning ORDER BY vm_en.meaning SEPARATOR ', ') AS translation_en
FROM verbs v
JOIN slugs s ON v.verb_id = s.verb_id
LEFT JOIN verb_meanings vm_fr ON v.verb_id = vm_fr.verb_id AND vm_fr.language_code = 'fr'
LEFT JOIN verb_meanings vm_en ON v.verb_id = vm_en.verb_id AND vm_en.language_code = 'en'
WHERE v.name LIKE ? OR vm_fr.meaning LIKE ? OR vm_en.meaning LIKE ?
GROUP BY v.verb_id, s.slug, v.name, v.phonetic)
ORDER BY singular;

    `;
    params = [
      searchParam,
      searchParam,
      searchParam,
      searchParam,
      searchParam,
      searchParam,
    ];
  }

  try {
    const connection = await getConnection();
    const [results] = await connection.execute(sqlQuery, params);
    await connection.end();
    return results;
  } catch (error) {
    console.error("Erreur lors de la récupération des mots et verbes :", error);
    return { error: "Erreur lors de la récupération des mots et verbes." };
  }
});
*/
/*import { getConnection } from "./db.config";
import { getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const { query = "", language = "kikongo", mode = "auto" } = getQuery(event);

  if (!query.trim()) {
    return []; // Retourne un tableau vide si aucune recherche n'est effectuée
  }

  let sqlQuery = "";
  let params = [];

  if (mode === "strict") {
    switch (language) {
      case "kikongo":
        sqlQuery = `
          (SELECT 'word' AS type, s.slug, w.singular, w.plural, w.phonetic,
            GROUP_CONCAT(DISTINCT wm_fr.meaning ORDER BY wm_fr.meaning SEPARATOR ', ') AS translation_fr,
            GROUP_CONCAT(DISTINCT wm_en.meaning ORDER BY wm_en.meaning SEPARATOR ', ') AS translation_en
          FROM words w
          JOIN slugs s ON w.word_id = s.word_id
          LEFT JOIN word_meanings wm_fr ON w.word_id = wm_fr.word_id AND wm_fr.language_code = 'fr'
          LEFT JOIN word_meanings wm_en ON w.word_id = wm_en.word_id AND wm_en.language_code = 'en'
          WHERE w.singular = ? OR w.plural = ?
          GROUP BY w.word_id, s.slug, w.singular, w.plural, w.phonetic)

          UNION

          (SELECT 'verb' AS type, s.slug, v.name AS singular, NULL AS plural, v.phonetic,
            GROUP_CONCAT(DISTINCT vm_fr.meaning ORDER BY vm_fr.meaning SEPARATOR ', ') AS translation_fr,
            GROUP_CONCAT(DISTINCT vm_en.meaning ORDER BY vm_en.meaning SEPARATOR ', ') AS translation_en
          FROM verbs v
          JOIN slugs s ON v.verb_id = s.verb_id
          LEFT JOIN verb_meanings vm_fr ON v.verb_id = vm_fr.verb_id AND vm_fr.language_code = 'fr'
          LEFT JOIN verb_meanings vm_en ON v.verb_id = vm_en.verb_id AND vm_en.language_code = 'en'
          WHERE v.name = ?
          GROUP BY v.verb_id, s.slug, v.name, v.phonetic)
          ORDER BY singular;
        `;
        params = [query, query, query];
        break;

      case "fr":
        sqlQuery = `
          (SELECT 'word' AS type, s.slug, w.singular, w.plural, w.phonetic,
            wm.meaning AS translation_fr, NULL AS translation_en
          FROM word_meanings wm
          JOIN words w ON wm.word_id = w.word_id
          JOIN slugs s ON w.word_id = s.word_id
          WHERE wm.meaning = ? AND wm.language_code = 'fr'
          GROUP BY wm.meaning, w.word_id, s.slug, w.singular, w.plural, w.phonetic)

          UNION

          (SELECT 'verb' AS type, s.slug, v.name AS singular, NULL AS plural, v.phonetic,
            vm.meaning AS translation_fr, NULL AS translation_en
          FROM verb_meanings vm
          JOIN verbs v ON vm.verb_id = v.verb_id
          JOIN slugs s ON v.verb_id = s.verb_id
          WHERE vm.meaning = ? AND vm.language_code = 'fr'
          GROUP BY vm.meaning, v.verb_id, s.slug, v.name, v.phonetic)
          ORDER BY singular;
        `;
        params = [query, query];
        break;

      case "en":
        sqlQuery = `
          (SELECT 'word' AS type, s.slug, w.singular, w.plural, w.phonetic,
            NULL AS translation_fr, wm.meaning AS translation_en
          FROM word_meanings wm
          JOIN words w ON wm.word_id = w.word_id
          JOIN slugs s ON w.word_id = s.word_id
          WHERE wm.meaning = ? AND wm.language_code = 'en'
          GROUP BY wm.meaning, w.word_id, s.slug, w.singular, w.plural, w.phonetic)

          UNION

          (SELECT 'verb' AS type, s.slug, v.name AS singular, NULL AS plural, v.phonetic,
            NULL AS translation_fr, vm.meaning AS translation_en
          FROM verb_meanings vm
          JOIN verbs v ON vm.verb_id = v.verb_id
          JOIN slugs s ON v.verb_id = s.verb_id
          WHERE vm.meaning = ? AND vm.language_code = 'en'
          GROUP BY vm.meaning, v.verb_id, s.slug, v.name, v.phonetic)
          ORDER BY singular;
        `;
        params = [query, query];
        break;

      default:
        return [];
    }
  } else {
    const searchParam = `%${query}%`;
    sqlQuery = `
      (SELECT 'word' AS type, s.slug, w.singular, w.plural, w.phonetic,
        GROUP_CONCAT(DISTINCT wm_fr.meaning ORDER BY wm_fr.meaning SEPARATOR ', ') AS translation_fr,
        GROUP_CONCAT(DISTINCT wm_en.meaning ORDER BY wm_en.meaning SEPARATOR ', ') AS translation_en
      FROM words w
      JOIN slugs s ON w.word_id = s.word_id
      LEFT JOIN word_meanings wm_fr ON w.word_id = wm_fr.word_id AND wm_fr.language_code = 'fr'
      LEFT JOIN word_meanings wm_en ON w.word_id = wm_en.word_id AND wm_en.language_code = 'en'
      WHERE w.singular LIKE ? OR w.plural LIKE ? OR wm_fr.meaning LIKE ? OR wm_en.meaning LIKE ?
      GROUP BY w.word_id, s.slug, w.singular, w.plural, w.phonetic)

      UNION

      (SELECT 'verb' AS type, s.slug, v.name AS singular, NULL AS plural, v.phonetic,
        GROUP_CONCAT(DISTINCT vm_fr.meaning ORDER BY vm_fr.meaning SEPARATOR ', ') AS translation_fr,
        GROUP_CONCAT(DISTINCT vm_en.meaning ORDER BY vm_en.meaning SEPARATOR ', ') AS translation_en
      FROM verbs v
      JOIN slugs s ON v.verb_id = s.verb_id
      LEFT JOIN verb_meanings vm_fr ON v.verb_id = vm_fr.verb_id AND vm_fr.language_code = 'fr'
      LEFT JOIN verb_meanings vm_en ON v.verb_id = vm_en.verb_id AND vm_en.language_code = 'en'
      WHERE v.name LIKE ? OR vm_fr.meaning LIKE ? OR vm_en.meaning LIKE ?
      GROUP BY v.verb_id, s.slug, v.name, v.phonetic)
      ORDER BY singular;
    `;
    params = [
      searchParam,
      searchParam,
      searchParam,
      searchParam,
      searchParam,
      searchParam,
    ];
  }

  try {
    const connection = await getConnection();
    const [results] = await connection.execute(sqlQuery, params);
    await connection.end();
    return results;
  } catch (error) {
    console.error("Erreur lors de la récupération des mots et verbes :", error);
    return { error: "Erreur lors de la récupération des mots et verbes." };
  }
});
*/
