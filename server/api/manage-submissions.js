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
  }

  // Suppression de la soumission des tables temporaires
  const [deletedSubmission] = await connection.execute(
    `DELETE FROM pending_words_submissions WHERE submission_id = ?`,
    [submission_id]
  );
  if (deletedSubmission.affectedRows > 0) {
  }

  const [deletedTranslations] = await connection.execute(
    `DELETE FROM pending_words_translations WHERE submission_id = ?`,
    [submission_id]
  );
  if (deletedTranslations.affectedRows > 0) {
  }

  const [deletedNominalClasses] = await connection.execute(
    `DELETE FROM pending_words_nominal_classes WHERE submission_id = ?`,
    [submission_id]
  );
  if (deletedNominalClasses.affectedRows > 0) {
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
