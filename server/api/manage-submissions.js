// manage-submissions.js

import { getConnection } from "./db.config";
import { generateUniqueSlug } from "../utils/generate-unique-slugs";
//import { generatePendingSubmissionSlug } from "../utils/generate-pending-slugs";
import { archiveWord, archiveVerb } from "./archive-submissions";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === "POST") {
    return handleSubmissionAction(event);
  } else {
    return { error: "Méthode non supportée." };
  }
});

async function handleSubmissionAction(event) {
  const body = await readBody(event);
  const {
    submission_id,
    action,
    user_id: admin_id,
    content_type,
    reason,
    translations, // Inclure les traductions
  } = body;

  if (!submission_id || !action || !admin_id || !content_type) {
    return {
      error:
        "Tous les champs (submission_id, action, admin_id, content_type) sont requis.",
    };
  }

  const connection = await getConnection();
  const submissionQuery =
    content_type === "word"
      ? "SELECT * FROM pending_words_submissions WHERE submission_id = ?"
      : "SELECT * FROM pending_verbs_submissions WHERE submission_id = ?";
  const [submission] = await connection.execute(submissionQuery, [
    submission_id,
  ]);

  if (!submission.length) {
    await connection.end();
    return { error: "Soumission non trouvée." };
  }

  if (action === "approve") {
    if (content_type === "word") {
      await approveWord(connection, submission[0], admin_id, submission_id);
    } else {
      await approveVerb(connection, submission[0], admin_id, submission_id);
    }
    await connection.end();
    return { message: "Soumission approuvée et ajoutée avec succès." };
  } else if (action === "reject") {
    const rejectQuery =
      content_type === "word"
        ? "UPDATE pending_words_submissions SET status = 'rejected' WHERE submission_id = ?"
        : "UPDATE pending_verbs_submissions SET status = 'rejected' WHERE submission_id = ?";

    await connection.execute(rejectQuery, [submission_id]);

    if (content_type === "word") {
      await archiveWord(
        connection,
        submission[0],
        "rejected",
        admin_id,
        reason
      );
    } else {
      await archiveVerb(
        connection,
        submission[0],
        "rejected",
        admin_id,
        reason
      );
    }

    await connection.end();
    return { message: "Soumission rejetée." };
  } else if (action === "update") {
    const updateResult = await updateSubmission(
      connection,
      submission_id,
      body,
      content_type
    );
    await connection.end();
    return updateResult;
  } else {
    return {
      error: "Action non reconnue. Utilisez 'approve', 'reject' ou 'update'.",
    };
  }
}

// Fonction d'approbation pour les mots
async function approveWord(
  connection,
  wordSubmission,
  admin_id,
  submission_id
) {
  // Vérifier si le mot existe déjà dans la table words
  const [existingWord] = await connection.execute(
    `SELECT word_id FROM words WHERE singular = ? AND class_id = ? AND phonetic = ?`,
    [wordSubmission.singular, wordSubmission.class_id, wordSubmission.phonetic]
  );

  if (existingWord.length > 0) {
    console.log(
      "Le mot existe déjà avec la même phonétique et classe nominale, aucun ajout effectué."
    );
    return { message: "Le mot existe déjà dans la base de données." };
  }

  // Génération du slug unique pour le mot
  const slug = await generateUniqueSlug(connection, wordSubmission.singular);

  // Insertion du mot dans la table words
  const [result] = await connection.execute(
    `INSERT INTO words (singular, plural, phonetic, class_id, user_id, is_approved)
     VALUES (?, ?, ?, ?, ?, 1)`,
    [
      wordSubmission.singular,
      wordSubmission.plural,
      wordSubmission.phonetic,
      wordSubmission.class_id,
      wordSubmission.user_id,
    ]
  );

  const approvedWordId = result.insertId;

  // Insertion du slug dans la table slugs en liant l'ID du mot approuvé
  await connection.execute(`INSERT INTO slugs (slug, word_id) VALUES (?, ?)`, [
    slug,
    approvedWordId,
  ]);

  // Transfert des traductions dans word_meanings depuis pending_words_translations
  await connection.execute(
    `INSERT INTO word_meanings (word_id, language_code, meaning)
     SELECT ?, language_code, meaning FROM pending_words_translations WHERE submission_id = ?`,
    [approvedWordId, submission_id]
  );

  // Archiver la soumission approuvée
  await archiveWord(
    connection,
    wordSubmission,
    "approved",
    admin_id,
    approvedWordId
  );

  // Suppression des slugs avant la soumission principale pour éviter les conflits de contrainte de clé étrangère
  const [deletedSlug] = await connection.execute(
    `DELETE FROM pending_words_slugs WHERE submission_id = ?`,
    [submission_id]
  );
  if (deletedSlug.affectedRows > 0) {
    console.log(`Slug supprimé pour submission_id ${submission_id}`);
  }

  // Suppression de la soumission des tables temporaires
  const [deletedSubmission] = await connection.execute(
    `DELETE FROM pending_words_submissions WHERE submission_id = ?`,
    [submission_id]
  );
  if (deletedSubmission.affectedRows > 0) {
    console.log(`Submission supprimée pour submission_id ${submission_id}`);
  }

  const [deletedTranslations] = await connection.execute(
    `DELETE FROM pending_words_translations WHERE submission_id = ?`,
    [submission_id]
  );
  if (deletedTranslations.affectedRows > 0) {
    console.log(`Traductions supprimées pour submission_id ${submission_id}`);
  }

  const [deletedNominalClasses] = await connection.execute(
    `DELETE FROM pending_words_nominal_classes WHERE submission_id = ?`,
    [submission_id]
  );
  if (deletedNominalClasses.affectedRows > 0) {
    console.log(
      `Classes nominales supprimées pour submission_id ${submission_id}`
    );
  }
}

async function approveVerb(
  connection,
  verbSubmission,
  admin_id,
  submission_id
) {
  const {
    name,
    root,
    suffix = null, // Optionnel
    phonetic = null, // Optionnel
    active_verb = 1, // Valeur par défaut 1
    derived_verb = 0, // Valeur par défaut 0
    derived_from = null, // Optionnel
    user_id = null, // Optionnel
    derived_verb_type_id = null, // Optionnel
  } = verbSubmission;

  if (!root) {
    throw new Error(
      "Le champ 'root' est obligatoire et ne peut pas être vide."
    );
  }

  const slug = await generateUniqueSlug(connection, name);

  const [result] = await connection.execute(
    `INSERT INTO verbs 
        (name, root, suffix, phonetic, active_verb, derived_verb, derived_from, is_approved, user_id, derived_verb_type_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?)`,
    [
      name,
      root,
      suffix,
      phonetic,
      active_verb,
      derived_verb,
      derived_from,
      user_id,
      derived_verb_type_id,
    ]
  );

  const approvedVerbId = result.insertId;

  await connection.execute(`INSERT INTO slugs (slug, verb_id) VALUES (?, ?)`, [
    slug,
    approvedVerbId,
  ]);

  await connection.execute(
    `INSERT INTO verb_meanings (verb_id, language_code, meaning)
     SELECT ?, language_code, meaning FROM pending_verbs_translations WHERE submission_id = ?`,
    [approvedVerbId, submission_id]
  );

  await archiveVerb(
    connection,
    verbSubmission,
    "approved",
    admin_id,
    approvedVerbId
  );

  await connection.execute(
    `DELETE FROM pending_verbs_slugs WHERE submission_id = ?`,
    [submission_id]
  );
  await connection.execute(
    `DELETE FROM pending_verbs_submissions WHERE submission_id = ?`,
    [submission_id]
  );
  await connection.execute(
    `DELETE FROM pending_verbs_translations WHERE submission_id = ?`,
    [submission_id]
  );
}
/*
// Fonction pour mise à jour flexible des données et traductions
async function updateSubmission(connection, submission_id, data, content_type) {
  // Définition des tables de contenu et de traductions selon le type
  const table =
    content_type === "word"
      ? "pending_words_submissions"
      : "pending_verbs_submissions";
  const translationTable =
    content_type === "word"
      ? "pending_words_translations"
      : "pending_verbs_translations";

  // Génération du slug en fonction du nom de base (singular pour les mots, name pour les verbes)
  const baseName = content_type === "word" ? data.singular : data.name;
  const slug = await generatePendingSubmissionSlug(connection, baseName);

  // Mise à jour des champs principaux selon le type de contenu
  if (content_type === "word") {
    await connection.execute(
      `UPDATE pending_words_submissions
       SET singular = ?, plural = ?, phonetic = ?, class_id = ?, slug = ?
       WHERE submission_id = ?`,
      [
        data.singular,
        data.plural,
        data.phonetic,
        data.class_id,
        slug,
        submission_id,
      ]
    );
  } else if (content_type === "verb") {
    await connection.execute(
      `UPDATE pending_verbs_submissions
       SET name = ?, root = ?, suffix = ?, phonetic = ?, active_verb = ?, derived_verb = ?, derived_from = ?, derived_verb_type_id = ?, slug = ?
       WHERE submission_id = ?`,
      [
        data.name,
        data.root,
        data.suffix,
        data.phonetic,
        data.active_verb || 1,
        data.derived_verb || 0,
        data.derived_from || null,
        data.derived_verb_type_id || null,
        slug,
        submission_id,
      ]
    );
  }

  // Suppression des traductions existantes pour cette soumission dans la table des traductions
  await connection.execute(
    `DELETE FROM ${translationTable} WHERE submission_id = ?`,
    [submission_id]
  );

  // Insertion des nouvelles traductions
  for (const translation of data.translations) {
    const meanings = translation.meaning.split(";").map((m) => m.trim());

    for (const meaning of meanings) {
      await connection.execute(
        `INSERT INTO ${translationTable} (submission_id, language_code, meaning) VALUES (?, ?, ?)`,
        [submission_id, translation.language_code, meaning]
      );
    }
  }

  return { message: "Soumission mise à jour avec succès." };
}
*/
/*
// Fonction pour mise à jour flexible des traductions
async function updateSubmission(connection, submission_id, data, content_type) {
  const table =
    content_type === "word"
      ? "pending_words_submissions"
      : "pending_verbs_submissions";

  const baseName = content_type === "word" ? data.singular : data.name;
  const slug = await generatePendingSubmissionSlug(connection, baseName);

  const updateQuery = `
    UPDATE ${table}
    SET ${
      content_type === "word"
        ? "singular = ?, plural = ?, phonetic = ?, class_id = ?, slug = ?"
        : "name = ?, root = ?, suffix = ?, phonetic = ?, slug = ?"
    }
    WHERE submission_id = ?
  `;

  const updateData =
    content_type === "word"
      ? [
          data.singular,
          data.plural,
          data.phonetic,
          data.class_id,
          slug,
          submission_id,
        ]
      : [data.name, data.root, data.suffix, data.phonetic, slug, submission_id];

  await connection.execute(updateQuery, updateData);

  const translationTable =
    content_type === "word"
      ? "pending_words_translations"
      : "pending_verbs_translations";

  const translations = data.translations;

  for (const translation of translations) {
    const meanings = translation.meaning.split(";").map((m) => m.trim());

    for (const meaning of meanings) {
      const [existingTranslation] = await connection.execute(
        `SELECT * FROM ${translationTable} WHERE submission_id = ? AND language_code = ? AND meaning = ?`,
        [submission_id, translation.language_code, meaning]
      );

      if (!existingTranslation.length) {
        await connection.execute(
          `INSERT INTO ${translationTable} (submission_id, language_code, meaning) VALUES (?, ?, ?)`,
          [submission_id, translation.language_code, meaning]
        );
      } else {
        // Mise à jour si besoin de la traduction existante
        await connection.execute(
          `UPDATE ${translationTable} SET meaning = ? WHERE submission_id = ? AND language_code = ?`,
          [meaning, submission_id, translation.language_code]
        );
      }
    }
  }

  return { message: "Soumission mise à jour avec succès." };
}*/

/*import { getConnection } from "./db.config";
import { generateUniqueSlug } from "../utils/generate-unique-slugs";
import { generatePendingSubmissionSlug } from "../utils/generate-pending-slugs";
import { archiveWord, archiveVerb } from "./archive-submissions";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === "POST") {
    return handleSubmissionAction(event);
  } else {
    return { error: "Méthode non supportée." };
  }
});

// Gestionnaire d'actions pour approbation, rejet ou mise à jour des soumissions
async function handleSubmissionAction(event) {
  const body = await readBody(event);
  const {
    submission_id,
    action,
    user_id: admin_id,
    content_type,
    reason,
  } = body; // Ajout de 'reason'

  console.log("Received Request Body:", body);

  if (!submission_id || !action || !admin_id || !content_type) {
    return {
      error:
        "Tous les champs (submission_id, action, admin_id, content_type) sont requis.",
    };
  }

  const connection = await getConnection();

  let submissionQuery =
    content_type === "word"
      ? "SELECT * FROM pending_words_submissions WHERE submission_id = ?"
      : "SELECT * FROM pending_verbs_submissions WHERE submission_id = ?";

  const [submission] = await connection.execute(submissionQuery, [
    submission_id,
  ]);

  if (!submission.length) {
    await connection.end();
    return { error: "Soumission non trouvée." };
  }

  if (action === "approve") {
    console.log(
      "Approval process initiated for:",
      content_type,
      "ID:",
      submission_id
    );
    if (content_type === "word") {
      await approveWord(connection, submission[0], admin_id, submission_id);
    } else if (content_type === "verb") {
      await approveVerb(connection, submission[0], admin_id, submission_id);
    }

    await connection.end();
    return { message: "Soumission approuvée et ajoutée avec succès." };
  } else if (action === "reject") {
    console.log(
      "Rejection process initiated for:",
      content_type,
      "ID:",
      submission_id
    );

    const rejectQuery =
      content_type === "word"
        ? "UPDATE pending_words_submissions SET status = 'rejected' WHERE submission_id = ?"
        : "UPDATE pending_verbs_submissions SET status = 'rejected' WHERE submission_id = ?";

    await connection.execute(rejectQuery, [submission_id]);

    if (content_type === "word") {
      await archiveWord(
        connection,
        submission[0],
        "rejected",
        admin_id,
        reason
      );
    } else if (content_type === "verb") {
      await archiveVerb(
        connection,
        submission[0],
        "rejected",
        admin_id,
        reason
      );
    }

    await connection.end();
    return { message: "Soumission rejetée." };
  } else if (action === "update") {
    const updateResult = await updateSubmission(
      connection,
      submission_id,
      body,
      content_type
    );
    await connection.end();
    return updateResult;
  } else {
    return {
      error: "Action non reconnue. Utilisez 'approve', 'reject' ou 'update'.",
    };
  }
}

// Fonction pour approuver un mot (word)
async function approveWord(
  connection,
  wordSubmission,
  admin_id,
  submission_id
) {
  const [existingWord] = await connection.execute(
    `SELECT word_id FROM words WHERE singular = ? AND class_id = ? AND phonetic = ?`,
    [wordSubmission.singular, wordSubmission.class_id, wordSubmission.phonetic]
  );

  if (existingWord.length > 0) {
    console.log(
      "Le mot existe déjà avec la même phonétique et classe nominale, aucun ajout effectué."
    );
    return { message: "Le mot existe déjà dans la base de données." };
  }

  const slug = await generateUniqueSlug(connection, wordSubmission.singular);

  const [result] = await connection.execute(
    `INSERT INTO words (singular, plural, phonetic, class_id, user_id, is_approved)
     VALUES (?, ?, ?, ?, ?, 1)`,
    [
      wordSubmission.singular,
      wordSubmission.plural,
      wordSubmission.phonetic,
      wordSubmission.class_id,
      wordSubmission.user_id,
    ]
  );

  const approvedWordId = result.insertId;

  await connection.execute(`INSERT INTO slugs (slug, word_id) VALUES (?, ?)`, [
    slug,
    approvedWordId,
  ]);

  await connection.execute(
    `INSERT INTO word_meanings (word_id, language_code, meaning)
     SELECT ?, language_code, meaning FROM pending_words_translations WHERE submission_id = ?`,
    [approvedWordId, submission_id]
  );

  await archiveWord(
    connection,
    wordSubmission,
    "approved",
    admin_id,
    approvedWordId
  );

  await connection.execute(
    `DELETE FROM pending_words_submissions WHERE submission_id = ?`,
    [submission_id]
  );
  await connection.execute(
    `DELETE FROM pending_words_translations WHERE submission_id = ?`,
    [submission_id]
  );
  await connection.execute(
    `DELETE FROM pending_words_nominal_classes WHERE submission_id = ?`,
    [submission_id]
  );
}

// Fonction pour approuver un verbe (verb)
async function approveVerb(
  connection,
  verbSubmission,
  admin_id,
  submission_id
) {
  const {
    name,
    root,
    suffix = null,
    phonetic = null,
    active_verb = 1,
    derived_verb = 0,
    derived_from = null,
    user_id,
    derived_verb_type_id = null,
  } = verbSubmission;

  const slug = await generateUniqueSlug(connection, name);

  const [result] = await connection.execute(
    `INSERT INTO verbs 
        (name, root, suffix, phonetic, active_verb, derived_verb, derived_from, is_approved, user_id, derived_verb_type_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?)`,
    [
      name,
      root,
      suffix,
      phonetic,
      active_verb,
      derived_verb,
      derived_from,
      user_id,
      derived_verb_type_id,
    ]
  );

  const approvedVerbId = result.insertId;

  await connection.execute(`INSERT INTO slugs (slug, verb_id) VALUES (?, ?)`, [
    slug,
    approvedVerbId,
  ]);

  await connection.execute(
    `INSERT INTO verb_meanings (verb_id, language_code, meaning)
     SELECT ?, language_code, meaning FROM pending_verbs_translations WHERE submission_id = ?`,
    [approvedVerbId, submission_id]
  );

  await archiveVerb(
    connection,
    verbSubmission,
    "approved",
    admin_id,
    approvedVerbId
  );

  await connection.execute(
    `DELETE FROM pending_verbs_slugs WHERE submission_id = ?`,
    [submission_id]
  );
  await connection.execute(
    `DELETE FROM pending_verbs_submissions WHERE submission_id = ?`,
    [submission_id]
  );
  await connection.execute(
    `DELETE FROM pending_verbs_translations WHERE submission_id = ?`,
    [submission_id]
  );
}

// Fonction pour mettre à jour une soumission en attente
async function updateSubmission(connection, submission_id, data, content_type) {
  const table =
    content_type === "word"
      ? "pending_words_submissions"
      : "pending_verbs_submissions";

  const baseName = content_type === "word" ? data.singular : data.name;
  const slug = await generatePendingSubmissionSlug(connection, baseName);

  const updateQuery = `
    UPDATE ${table}
    SET ${
      content_type === "word"
        ? "singular = ?, plural = ?, phonetic = ?, class_id = ?, slug = ?"
        : "name = ?, root = ?, suffix = ?, phonetic = ?, slug = ?"
    }
    WHERE submission_id = ?
  `;

  const updateData =
    content_type === "word"
      ? [
          data.singular,
          data.plural,
          data.phonetic,
          data.class_id,
          slug,
          submission_id,
        ]
      : [data.name, data.root, data.suffix, data.phonetic, slug, submission_id];

  await connection.execute(updateQuery, updateData);

  return { message: "Soumission mise à jour avec succès." };
}
*/
