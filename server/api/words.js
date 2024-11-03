import { getQuery, readBody } from "h3";
import { getConnection } from "./db.config";
import { generateUniqueSlug } from "../utils/generate-unique-slugs";
import { generatePendingSubmissionSlug } from "../utils/generate-pending-slugs";

//import slugify from "slugify"; // Import slugify at the top

// Gestion des différentes méthodes (GET, POST, PUT, DELETE)
export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === "GET") {
    return handleGetRequest(event);
  } else if (method === "POST") {
    return handlePostRequest(event);
  } else if (method === "PUT") {
    return handlePutRequest(event);
  } else if (method === "DELETE") {
    return handleDeleteRequest(event);
  } else {
    return { error: "Méthode non supportée." };
  }
});

// Gestion de la requête GET (modifiée pour utiliser les slugs)
async function handleGetRequest(event) {
  const { query, language } = getQuery(event);

  if (!query) {
    return [];
  }

  let sqlQuery = "";
  let params = [];

  if (language === "kikongo" || !language) {
    sqlQuery = `
      (SELECT 'word' AS type, s.slug, w.singular, w.plural, w.phonetic, 
              (SELECT GROUP_CONCAT(DISTINCT wm.meaning SEPARATOR ', ') 
               FROM word_meanings wm 
               WHERE wm.word_id = w.word_id AND wm.language_code = 'fr') AS translation_fr,
              (SELECT GROUP_CONCAT(DISTINCT wm.meaning SEPARATOR ', ') 
               FROM word_meanings wm 
               WHERE wm.word_id = w.word_id AND wm.language_code = 'en') AS translation_en
      FROM words w
      JOIN slugs s ON w.word_id = s.word_id -- Jointure avec la table slugs
      WHERE w.singular COLLATE utf8mb4_unicode_ci LIKE ? 
      OR w.plural COLLATE utf8mb4_unicode_ci LIKE ? 
      OR w.root COLLATE utf8mb4_unicode_ci LIKE ?
      GROUP BY w.word_id, w.singular, w.plural, w.phonetic)
    UNION
    (SELECT 'verb' AS type, s.slug, v.name AS singular, NULL AS plural, v.phonetic,
              (SELECT GROUP_CONCAT(DISTINCT vm.meaning SEPARATOR ', ') 
               FROM verb_meanings vm 
               WHERE vm.verb_id = v.verb_id AND vm.language_code = 'fr') AS translation_fr,
              (SELECT GROUP_CONCAT(DISTINCT vm.meaning SEPARATOR ', ') 
               FROM verb_meanings vm 
               WHERE vm.verb_id = v.verb_id AND vm.language_code = 'en') AS translation_en
      FROM verbs v
      JOIN slugs s ON v.verb_id = s.verb_id -- Jointure avec la table slugs
      WHERE v.name COLLATE utf8mb4_unicode_ci LIKE ?
      GROUP BY v.verb_id, v.name, v.phonetic)
    ORDER BY singular LIMIT 30;`;

    params = [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`];
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
}

async function handlePostRequest(event) {
  const body = await readBody(event);
  const {
    singular,
    plural,
    phonetic,
    translations,
    user_id,
    class_id,
    name,
    root,
    suffix,
    derived_word = 0,
    derived_from_word = null,
    derived_from_verb = null,
    number_variability = "variable",
  } = body;

  if (!user_id) {
    return {
      error: "L'utilisateur doit être connecté pour ajouter un contenu.",
    };
  }

  const connection = await getConnection();
  const [user] = await connection.execute(
    `SELECT role FROM users WHERE user_id = ?`,
    [user_id]
  );
  const isAdmin = user[0]?.role === "admin";

  const contentType = singular ? "word" : "verb";
  let slug;

  if (contentType === "word") {
    // Génération d'un slug unique pour le mot
    slug = await generatePendingSubmissionSlug(connection, singular);

    // Vérifications séparées d'existence pour les mots dans `pending_words_submissions` et `words`
    const [existingPendingWords] = await connection.execute(
      `SELECT * FROM pending_words_submissions 
       WHERE singular = ? AND plural = ? AND phonetic = ?`,
      [singular, plural, phonetic]
    );

    const [existingApprovedWords] = await connection.execute(
      `SELECT * FROM words 
       WHERE singular = ? AND plural = ? AND phonetic = ?`,
      [singular, plural, phonetic]
    );

    if (existingPendingWords.length > 0 || existingApprovedWords.length > 0) {
      await connection.end();
      return { error: "Ce mot existe déjà dans la base de données." };
    }
  } else if (contentType === "verb") {
    // Génération d'un slug unique pour le verbe
    slug = await generatePendingSubmissionSlug(connection, name);

    // Vérifications séparées d'existence pour les verbes dans `pending_verbs_submissions` et `verbs`
    const [existingPendingVerbs] = await connection.execute(
      `SELECT * FROM pending_verbs_submissions 
       WHERE name = ? AND phonetic = ?`,
      [name, phonetic]
    );

    const [existingApprovedVerbs] = await connection.execute(
      `SELECT * FROM verbs 
       WHERE name = ? AND phonetic = ?`,
      [name, phonetic]
    );

    if (existingPendingVerbs.length > 0 || existingApprovedVerbs.length > 0) {
      await connection.end();
      return { error: "Ce verbe existe déjà dans la base de données." };
    }
  }

  let submissionId;
  if (!isAdmin) {
    if (contentType === "word") {
      // Insertion dans les tables de mots en attente pour les utilisateurs non-admin
      const [result] = await connection.execute(
        `INSERT INTO pending_words_submissions 
          (user_id, status, singular, plural, phonetic, class_id, derived_word, derived_from_word, derived_from_verb, number_variability)
         VALUES (?, 'pending', ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          user_id,
          singular,
          plural || null,
          phonetic || null,
          class_id || null,
          derived_word,
          derived_from_word,
          derived_from_verb,
          number_variability,
        ]
      );
      submissionId = result.insertId;

      // Insertion du slug pour le mot soumis
      await connection.execute(
        `INSERT INTO pending_words_slugs (submission_id, slug) VALUES (?, ?)`,
        [submissionId, slug]
      );

      // Association de la classe nominale
      await connection.execute(
        `INSERT INTO pending_words_nominal_classes (submission_id, class_id) VALUES (?, ?)`,
        [submissionId, class_id]
      );
    } else if (contentType === "verb") {
      // Insertion dans les tables de verbes en attente pour les utilisateurs non-admin
      const [result] = await connection.execute(
        `INSERT INTO pending_verbs_submissions (user_id, status, name, root, suffix, phonetic)
         VALUES (?, 'pending', ?, ?, ?, ?)`,
        [user_id, name, root || null, suffix || null, phonetic || null]
      );
      submissionId = result.insertId;

      // Insertion du slug pour le verbe soumis
      await connection.execute(
        `INSERT INTO pending_verbs_slugs (submission_id, slug) VALUES (?, ?)`,
        [submissionId, slug]
      );
    }

    // Insertion des traductions
    if (
      translations &&
      Array.isArray(translations) &&
      translations.length > 0
    ) {
      for (const { language_code, meaning } of translations) {
        const table =
          contentType === "word"
            ? "pending_words_translations"
            : "pending_verbs_translations";
        await connection.execute(
          `INSERT INTO ${table} (submission_id, language_code, meaning) VALUES (?, ?, ?)`,
          [submissionId, language_code, meaning]
        );
      }
    }
  } else {
    // Insertion directe pour les admins
    if (contentType === "word") {
      return await insertWord(body);
    } else if (contentType === "verb") {
      return await insertVerb(body);
    }
  }

  await connection.end();
  return {
    message: "Soumission envoyée avec succès, en attente de validation.",
  };
}

/*
async function handlePostRequest(event) {
  const body = await readBody(event);
  const {
    singular,
    plural,
    phonetic,
    translations,
    user_id,
    class_id,
    name,
    root,
    suffix,
    // Nouvelles colonnes avec valeurs par défaut
    derived_word = 0,
    derived_from_word = null,
    derived_from_verb = null,
    number_variability = "variable",
  } = body;

  // Vérification de l'utilisateur connecté
  if (!user_id) {
    return {
      error: "L'utilisateur doit être connecté pour ajouter un contenu.",
    };
  }

  const connection = await getConnection();
  const [user] = await connection.execute(
    `SELECT role FROM users WHERE user_id = ?`,
    [user_id]
  );
  const isAdmin = user[0]?.role === "admin";

  // Gestion de la soumission pour un utilisateur non admin
  if (!isAdmin) {
    const contentType = singular ? "word" : "verb";
    let submissionId;

    try {
      // Génération d'un slug unique pour la soumission
      const baseName = singular || name;
      const slug = await generatePendingSubmissionSlug(connection, baseName);

      // Gestion de l'insertion des mots
      if (contentType === "word") {
        const [result] = await connection.execute(
          `INSERT INTO pending_words_submissions 
            (user_id, status, singular, plural, phonetic, class_id, derived_word, derived_from_word, derived_from_verb, number_variability)
           VALUES (?, 'pending', ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            user_id,
            singular,
            plural || null,
            phonetic || null,
            class_id || null,
            derived_word,
            derived_from_word,
            derived_from_verb,
            number_variability,
          ]
        );
        submissionId = result.insertId;

        // Insertion du slug pour le mot soumis
        await connection.execute(
          `INSERT INTO pending_words_slugs (submission_id, slug) VALUES (?, ?)`,
          [submissionId, slug]
        );

        // Association de la classe nominale au mot
        await connection.execute(
          `INSERT INTO pending_words_nominal_classes (submission_id, class_id)
           VALUES (?, ?)`,
          [submissionId, class_id]
        );

        // Gestion de l'insertion des verbes (inchangé ici)
      } else if (contentType === "verb") {
        const [result] = await connection.execute(
          `INSERT INTO pending_verbs_submissions (user_id, status, name, root, suffix, phonetic)
           VALUES (?, 'pending', ?, ?, ?, ?)`,
          [user_id, name, root || null, suffix || null, phonetic || null]
        );
        submissionId = result.insertId;

        // Insertion du slug pour le verbe soumis
        await connection.execute(
          `INSERT INTO pending_verbs_slugs (submission_id, slug) VALUES (?, ?)`,
          [submissionId, slug]
        );
      }

      // Insertion des traductions pour le mot ou verbe soumis
      if (
        translations &&
        Array.isArray(translations) &&
        translations.length > 0
      ) {
        for (const translation of translations) {
          const { language_code, meaning } = translation;

          if (!language_code || !meaning) {
            console.error("Traduction mal formatée :", translation);
            continue; // Ignorer les traductions mal formatées
          }

          if (contentType === "word") {
            await connection.execute(
              `INSERT INTO pending_words_translations (submission_id, language_code, meaning)
               VALUES (?, ?, ?)`,
              [submissionId, language_code, meaning]
            );
          } else if (contentType === "verb") {
            await connection.execute(
              `INSERT INTO pending_verbs_translations (submission_id, language_code, meaning)
               VALUES (?, ?, ?)`,
              [submissionId, language_code, meaning]
            );
          }
        }
      } else {
        console.warn("Aucune traduction fournie pour le contenu soumis.");
      }

      await connection.end();
      return {
        message: "Soumission envoyée avec succès, en attente de validation.",
      };
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      await connection.end();
      return {
        error: "Erreur lors de la soumission du contenu.",
      };
    }
  }

  // Si l'utilisateur est admin, insertion directe dans `words` ou `verbs`
  if (singular) {
    return await insertWord(body); // Insertion directe pour les admins
  } else if (name) {
    return await insertVerb(body); // Insertion directe pour les admins
  } else {
    return { error: "Les champs 'singular' ou 'name' sont requis." };
  }
}*/
async function handlePutRequest(event) {
  const body = await readBody(event);

  // Gestion de la mise à jour d'un mot
  if (body.word_id) {
    const {
      word_id,
      singular,
      plural,
      phonetic,
      root,
      class_id,
      derived_from_word,
      derived_from_verb,
      number_variability,
      translations,
    } = body;

    if (!word_id || !singular || !translations) {
      return {
        error: "Les champs 'word_id', 'singular' et 'traductions' sont requis.",
      };
    }

    try {
      const connection = await getConnection();
      const slug = await generateUniqueSlug(connection, singular, "words");

      await connection.execute(
        `UPDATE words SET singular = ?, plural = ?, phonetic = ?, root = ?, class_id = ?, derived_from_word = ?, derived_from_verb = ?, number_variability = ?, slug = ? WHERE word_id = ?`,
        [
          singular,
          plural || null,
          phonetic || null,
          root || null,
          class_id,
          derived_from_word || null,
          derived_from_verb || null,
          number_variability || null,
          slug,
          word_id,
        ]
      );

      // Mise à jour des traductions associées au mot
      for (const { language_code, meaning } of translations) {
        await connection.execute(
          `UPDATE word_meanings SET meaning = ? WHERE word_id = ? AND language_code = ?`,
          [meaning, word_id, language_code]
        );
      }

      await connection.end();
      return { success: true };
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mot :", error);
      return { error: "Erreur lors de la mise à jour du mot." };
    }

    // Gestion de la mise à jour d'un verbe
  } else if (body.verb_id) {
    const {
      verb_id,
      name,
      root,
      suffix,
      phonetic,
      derived_from,
      derived_verb_type_id,
      translations,
    } = body;

    if (!verb_id || !name || !translations) {
      return {
        error: "Les champs 'verb_id', 'name' et 'traductions' sont requis.",
      };
    }

    try {
      const connection = await getConnection();
      const slug = await generateUniqueSlug(connection, name, "verbs");

      await connection.execute(
        `UPDATE verbs SET name = ?, root = ?, suffix = ?, phonetic = ?, derived_from = ?, derived_verb_type_id = ?, slug = ? WHERE verb_id = ?`,
        [
          name,
          root || null,
          suffix || null,
          phonetic || null,
          derived_from || null,
          derived_verb_type_id || null,
          slug,
          verb_id,
        ]
      );

      // Mise à jour des traductions associées au verbe
      for (const { language_code, meaning } of translations) {
        await connection.execute(
          `UPDATE verb_meanings SET meaning = ? WHERE verb_id = ? AND language_code = ?`,
          [meaning, verb_id, language_code]
        );
      }

      await connection.end();
      return { success: true };
    } catch (error) {
      console.error("Erreur lors de la mise à jour du verbe :", error);
      return { error: "Erreur lors de la mise à jour du verbe." };
    }
  } else {
    return { error: "Les champs 'word_id' ou 'verb_id' sont requis." };
  }
}

async function handleDeleteRequest(event) {
  const body = await readBody(event);
  const { slug, type } = body;

  if (!slug || !type) {
    return { error: "Les champs 'slug' et 'type' sont requis." };
  }

  try {
    const connection = await getConnection();

    if (type === "word") {
      // Deleting a word
      await connection.execute(`DELETE FROM words WHERE slug = ?`, [slug]);
      await connection.execute(
        `DELETE FROM word_meanings WHERE word_id = (SELECT word_id FROM words WHERE slug = ?);`,
        [slug]
      );

      console.log(`Mot avec le slug ${slug} supprimé`);
    } else if (type === "verb") {
      // Deleting a verb
      await connection.execute(`DELETE FROM verbs WHERE slug = ?`, [slug]);
      await connection.execute(
        `DELETE FROM verb_meanings WHERE verb_id = (SELECT verb_id FROM verbs WHERE slug = ?);`,
        [slug]
      );

      console.log(`Verbe avec le slug ${slug} supprimé`);
    } else {
      return { error: "Le type doit être 'word' ou 'verb'." };
    }

    await connection.end();
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    return { error: `Erreur lors de la suppression: ${error.message}` };
  }
}

async function insertWord({
  singular,
  plural,
  phonetic,
  class_id,
  translations,
  user_id,
}) {
  try {
    const connection = await getConnection();

    const [user] = await connection.execute(
      `SELECT role FROM users WHERE user_id = ?`,
      [user_id]
    );
    const isAdmin = user[0]?.role === "admin";
    const isApproved = isAdmin ? 1 : 0;

    // Insertion du mot dans la table `words`
    const [result] = await connection.execute(
      `INSERT INTO words (singular, plural, phonetic, class_id, user_id, is_approved) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [singular, plural, phonetic, class_id, user_id, isApproved]
    );

    // Générer et insérer le slug dans la table `slugs`
    const wordId = result.insertId; // ID du mot inséré
    const slug = await generateUniqueSlug(connection, singular, "slugs");

    await connection.execute(
      `INSERT INTO slugs (word_id, slug) VALUES (?, ?)`,
      [wordId, slug]
    );

    // Insertion des traductions dans `word_meanings`
    for (const { language_code, meaning } of translations) {
      await connection.execute(
        `INSERT INTO word_meanings (word_id, language_code, meaning) VALUES (?, ?, ?)`,
        [wordId, language_code, meaning]
      );
    }

    await connection.end();
    return { success: true, word_id: wordId };
  } catch (error) {
    console.error("Erreur lors de l'ajout du mot :", error);
    return { error: "Erreur lors de l'ajout du mot." };
  }
}

async function insertVerb({
  name,
  phonetic,
  root,
  suffix,
  translations,
  user_id,
}) {
  try {
    const connection = await getConnection();

    const [user] = await connection.execute(
      `SELECT role FROM users WHERE user_id = ?`,
      [user_id]
    );
    const isAdmin = user[0]?.role === "admin";
    const isApproved = isAdmin ? 1 : 0;

    // Insertion du verbe dans la table `verbs`
    const [result] = await connection.execute(
      `INSERT INTO verbs (name, phonetic, root, suffix, user_id, is_approved) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        name,
        phonetic || null,
        root || null,
        suffix || null,
        user_id,
        isApproved,
      ]
    );

    const verbId = result.insertId; // ID du verbe inséré

    // Générer et insérer le slug dans la table `slugs`
    const slug = await generateUniqueSlug(connection, name, "slugs");

    await connection.execute(
      `INSERT INTO slugs (verb_id, slug) VALUES (?, ?)`,
      [verbId, slug]
    );

    // Insertion des traductions dans `verb_meanings`
    for (const { language_code, meaning } of translations) {
      await connection.execute(
        `INSERT INTO verb_meanings (verb_id, language_code, meaning) VALUES (?, ?, ?)`,
        [verbId, language_code, meaning]
      );
    }

    await connection.end();
    return { success: true, verb_id: verbId };
  } catch (error) {
    console.error("Erreur lors de l'ajout du verbe :", error.message || error);
    return { error: "Erreur lors de l'ajout du verbe." };
  }
}
/*
async function handlePostRequest(event) {
  const body = await readBody(event);
  const {
    singular,
    plural,
    phonetic,
    translations,
    user_id,
    name,
    root,
    suffix,
    class_id,
  } = body;

  if (!user_id) {
    return {
      error: "L'utilisateur doit être connecté pour ajouter un contenu.",
    };
  }

  const connection = await getConnection();
  const [user] = await connection.execute(
    `SELECT role FROM users WHERE user_id = ?`,
    [user_id]
  );
  const isAdmin = user[0]?.role === "admin";

  if (!isAdmin) {
    const contentType = singular ? "word" : "verb";
    let submissionId;

    try {
      // Génération d'un slug unique pour la soumission
      const baseName = singular || name;
      const slug = await generatePendingSubmissionSlug(connection, baseName);

      if (contentType === "word") {
        const [result] = await connection.execute(
          `INSERT INTO pending_words_submissions (user_id, status, singular, plural, phonetic, class_id)
           VALUES (?, 'pending', ?, ?, ?, ?)`,
          [
            user_id,
            singular,
            plural || null,
            phonetic || null,
            class_id || null,
          ]
        );
        submissionId = result.insertId;

        await connection.execute(
          `INSERT INTO pending_words_nominal_classes (submission_id, class_id)
           VALUES (?, ?)`,
          [submissionId, class_id]
        );
      } else if (contentType === "verb") {
        const [result] = await connection.execute(
          `INSERT INTO pending_verbs_submissions (user_id, status, name, root, suffix, phonetic)
           VALUES (?, 'pending', ?, ?, ?, ?)`,
          [user_id, name, root || null, suffix || null, phonetic || null]
        );
        submissionId = result.insertId;

        await connection.execute(
          `INSERT INTO pending_verbs_slugs (submission_id, slug) VALUES (?, ?)`,
          [submissionId, slug]
        );
      }

      // Vérification et insertion des traductions
      if (
        translations &&
        Array.isArray(translations) &&
        translations.length > 0
      ) {
        console.log("Traductions soumises :", translations);

        for (const translation of translations) {
          const { language_code, meaning } = translation;

          if (!language_code || !meaning) {
            console.error("Traduction mal formatée :", translation);
            continue; // Ignore les traductions mal formatées
          }

          if (contentType === "word") {
            await connection.execute(
              `INSERT INTO pending_words_translations (submission_id, language_code, meaning)
               VALUES (?, ?, ?)`,
              [submissionId, language_code, meaning]
            );
          } else if (contentType === "verb") {
            await connection.execute(
              `INSERT INTO pending_verbs_translations (submission_id, language_code, meaning)
               VALUES (?, ?, ?)`,
              [submissionId, language_code, meaning]
            );
          }
        }
      } else {
        console.warn("Aucune traduction fournie pour le contenu soumis.");
      }

      await connection.end();
      return {
        message: "Soumission envoyée avec succès, en attente de validation.",
      };
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      await connection.end();
      return {
        error: "Erreur lors de la soumission du contenu.",
      };
    }
  }

  // Si l'utilisateur est admin, insérer directement dans les tables finales `words` ou `verbs`
  if (singular) {
    return await insertWord(body); // Insertion directe pour les admins
  } else if (name) {
    return await insertVerb(body); // Insertion directe pour les admins
  } else {
    return { error: "Les champs 'singular' ou 'name' sont requis." };
  }
}
*/
/*
async function handlePostRequest(event) {
  const body = await readBody(event);
  const {
    singular,
    plural,
    phonetic,
    translations,
    user_id,
    name,
    root,
    suffix,
    class_id,
  } = body;

  if (!user_id) {
    return {
      error: "L'utilisateur doit être connecté pour ajouter un contenu.",
    };
  }

  const connection = await getConnection();
  const [user] = await connection.execute(
    `SELECT role FROM users WHERE user_id = ?`,
    [user_id]
  );
  const isAdmin = user[0]?.role === "admin";

  if (!isAdmin) {
    const contentType = singular ? "word" : "verb";
    let submissionId;

    try {
      // Génération d'un slug unique pour la soumission
      const baseName = singular || name;
      const slug = await generatePendingSubmissionSlug(connection, baseName);

      if (contentType === "word") {
        const [result] = await connection.execute(
          `INSERT INTO pending_words_submissions (user_id, status, singular, plural, phonetic, class_id)
     VALUES (?, 'pending', ?, ?, ?, ?)`,
          [
            user_id,
            singular,
            plural || null,
            phonetic || null,
            class_id || null,
          ]
        );
        submissionId = result.insertId;

        await connection.execute(
          `INSERT INTO pending_words_nominal_classes (submission_id, class_id)
     VALUES (?, ?)`,
          [submissionId, class_id]
        );
      } else if (contentType === "verb") {
        const [result] = await connection.execute(
          `INSERT INTO pending_verbs_submissions (user_id, status, name, root, suffix, phonetic)
           VALUES (?, 'pending', ?, ?, ?, ?)`,
          [user_id, name, root || null, suffix || null, phonetic || null]
        );
        submissionId = result.insertId;

        // Insertion du slug dans la table des slugs de verbes en attente
        await connection.execute(
          `INSERT INTO pending_verbs_slugs (submission_id, slug) VALUES (?, ?)`,
          [submissionId, slug]
        );
      }

      // Insertion des traductions pour les soumissions en attente
      for (const translation of translations) {
        const { language_code, meaning } = translation;
        if (contentType === "word") {
          await connection.execute(
            `INSERT INTO pending_words_translations (submission_id, language_code, meaning)
             VALUES (?, ?, ?)`,
            [submissionId, language_code, meaning]
          );
        } else if (contentType === "verb") {
          await connection.execute(
            `INSERT INTO pending_verbs_translations (submission_id, language_code, meaning)
             VALUES (?, ?, ?)`,
            [submissionId, language_code, meaning]
          );
        }
      }

      await connection.end();
      return {
        message: "Soumission envoyée avec succès, en attente de validation.",
      };
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      await connection.end();
      return {
        error: "Erreur lors de la soumission du contenu.",
      };
    }
  }

  // Si l'utilisateur est admin, insérer directement dans les tables finales `words` ou `verbs`
  if (singular) {
    return await insertWord(body); // Insertion directe pour les admins
  } else if (name) {
    return await insertVerb(body); // Insertion directe pour les admins
  } else {
    return { error: "Les champs 'singular' ou 'name' sont requis." };
  }
}*/
/*
async function handlePutRequest(event) {
  const body = await readBody(event);

  if (body.word_id) {
    // Updating a word
    const {
      word_id,
      singular,
      plural,
      phonetic,
      root,
      class_id,
      derived_from_word,
      derived_from_verb,
      number_variability,
      translations,
    } = body;

    if (!word_id || !singular || !translations) {
      return {
        error:
          "Les champs 'word_id', 'singulier' et 'traductions' sont requis.",
      };
    }

    try {
      const connection = await getConnection();

      // Generate a new slug if the singular is modified
      const slug = await generateUniqueSlug(connection, singular, "words");

      await connection.execute(
        `UPDATE words SET singular = ?, plural = ?, phonetic = ?, root = ?, class_id = ?, derived_from_word = ?, derived_from_verb = ?, number_variability = ?, slug = ? WHERE word_id = ?`,
        [
          singular,
          plural || null,
          phonetic || null,
          root || null,
          class_id,
          derived_from_word || null,
          derived_from_verb || null,
          number_variability || null,
          slug,
          word_id,
        ]
      );

      // Update associated translations for the word
      for (const { language_code, meaning } of translations) {
        await connection.execute(
          `UPDATE word_meanings SET meaning = ? WHERE word_id = ? AND language_code = ?`,
          [meaning, word_id, language_code]
        );
      }

      await connection.end();
      return { success: true };
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mot :", error);
      return { error: "Erreur lors de la mise à jour du mot." };
    }
  } else if (body.verb_id) {
    // Updating a verb
    const {
      verb_id,
      name,
      root,
      suffix,
      phonetic,
      derived_from,
      derived_verb_type_id,
      translations,
    } = body;

    if (!verb_id || !name || !translations) {
      return {
        error: "Les champs 'verb_id', 'name' et 'traductions' sont requis.",
      };
    }

    try {
      const connection = await getConnection();

      // Generate a new slug if the name is modified
      const slug = await generateUniqueSlug(connection, name, "verbs");

      await connection.execute(
        `UPDATE verbs SET name = ?, root = ?, suffix = ?, phonetic = ?, derived_from = ?, derived_verb_type_id = ?, slug = ? WHERE verb_id = ?`,
        [
          name,
          root || null,
          suffix || null,
          phonetic || null,
          derived_from || null,
          derived_verb_type_id || null,
          slug,
          verb_id,
        ]
      );

      // Update associated translations for the verb
      for (const { language_code, meaning } of translations) {
        await connection.execute(
          `UPDATE verb_meanings SET meaning = ? WHERE verb_id = ? AND language_code = ?`,
          [meaning, verb_id, language_code]
        );
      }

      await connection.end();
      return { success: true };
    } catch (error) {
      console.error("Erreur lors de la mise à jour du verbe :", error);
      return { error: "Erreur lors de la mise à jour du verbe." };
    }
  } else {
    return { error: "Les champs 'word_id' ou 'verb_id' sont requis." };
  }
}*/
/*
// Helper to generate unique slug
async function generateUniqueSlug(connection, base, table) {
  let slug = slugify(base, { lower: true, strict: true });
  let suffix = 0;
  let uniqueSlug = slug;

  // Check if the slug already exists
  while (true) {
    const [rows] = await connection.execute(
      `SELECT COUNT(*) AS count FROM ${table} WHERE slug = ?`,
      [uniqueSlug]
    );

    if (rows[0].count === 0) {
      break;
    }

    suffix += 1;
    uniqueSlug = `${slug}-${suffix}`;
  }

  return uniqueSlug;
}*/
/*
// Helper to generate a unique slug specifically for pending submissions
async function generatePendingSubmissionSlug(connection, base, isWord) {
  const table = isWord ? "pending_words_slugs" : "pending_verbs_slugs";
  let slug = slugify(base, { lower: true, strict: true });
  let uniqueSlug = slug;
  let suffix = 0;

  while (true) {
    // Vérifier l'unicité du slug dans la table spécifique
    const [rows] = await connection.execute(
      `SELECT COUNT(*) AS count FROM ${table} WHERE slug = ?`,
      [uniqueSlug]
    );

    if (rows[0].count === 0) {
      // Slug unique trouvé
      break;
    }

    // Ajouter un suffixe numérique pour rendre le slug unique
    suffix += 1;
    uniqueSlug = `${slug}-${suffix}`;
  }

  return uniqueSlug;
}

// Exporter la fonction si nécessaire
export { generatePendingSubmissionSlug };*/
