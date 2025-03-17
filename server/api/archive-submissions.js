/*export async function archiveVerb(
  connection,
  submissionData,
  status,
  admin_id,
  verb_id,
  reason = null // Inclure la raison comme paramètre
) {
  // Insertion du verbe dans archived_submitted_verbs
  const query = `
      INSERT INTO archived_submitted_verbs (
        submission_id, user_id, admin_id, name, root, suffix, phonetic, 
        status, archived_at, verb_id, reason
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?)
  `;

  const values = [
    submissionData.submission_id,
    submissionData.user_id,
    admin_id,
    submissionData.name,
    submissionData.root,
    submissionData.suffix,
    submissionData.phonetic,
    status,
    verb_id,
    reason,
  ];


  await connection.execute(query, values);

  // Transfert des traductions du verbe dans archived_verbs_translations
  const translationQuery = `
    INSERT INTO archived_verbs_translations (archived_id, language_code, meaning)
    SELECT ?, language_code, meaning FROM pending_verbs_translations 
    WHERE submission_id = ?
  `;

  // Récupération de l'ID de l'entrée archivée pour les traductions
  const [archivedEntry] = await connection.execute(
    `SELECT archived_id FROM archived_submitted_verbs WHERE submission_id = ? ORDER BY archived_at DESC LIMIT 1`,
    [submissionData.submission_id]
  );

  if (archivedEntry.length > 0) {
    const archivedId = archivedEntry[0].archived_verb_id;
    await connection.execute(translationQuery, [
      archivedId,
      submissionData.submission_id,
    ]);
  }
}*/

export async function archiveVerb(
  connection,
  submissionData,
  status,
  admin_id,
  verb_id,
  reason = null // Inclure la raison comme paramètre
) {
  // Insertion du verbe dans archived_submitted_verbs
  const query = `
      INSERT INTO archived_submitted_verbs (
        submission_id, user_id, admin_id, name, root, suffix, phonetic, 
        status, archived_at, verb_id, reason
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?)
  `;

  const values = [
    submissionData.submission_id || null,
    submissionData.user_id || null,
    admin_id || null,
    submissionData.name || null,
    submissionData.root || null,
    submissionData.suffix || null,
    submissionData.phonetic || null,
    status,
    verb_id || null,
    reason || null,
  ];

  await connection.execute(query, values);

  // Transfert des traductions du verbe dans archived_verbs_translations
  const translationQuery = `
    INSERT INTO archived_verbs_translations (archived_verb_id, language_code, meaning)
    SELECT ?, language_code, meaning FROM pending_verbs_translations 
    WHERE submission_id = ?
  `;

  // Récupération de l'ID de l'entrée archivée pour les traductions
  const [archivedEntry] = await connection.execute(
    `SELECT archived_id FROM archived_submitted_verbs WHERE submission_id = ? ORDER BY archived_at DESC LIMIT 1`,
    [submissionData.submission_id]
  );

  if (archivedEntry.length > 0) {
    const archivedId = archivedEntry[0].archived_id; // Vérification du champ d'ID correct
    await connection.execute(translationQuery, [
      archivedId,
      submissionData.submission_id,
    ]);
  }
}

// Fonction pour archiver une soumission de mot
export async function archiveWord(
  connection,
  submissionData,
  status,
  admin_id,
  word_id,
  reason = null // Inclure la raison comme paramètre optionnel
) {
  // Insertion du mot dans archived_submitted_words
  const query = `
      INSERT INTO archived_submitted_words (
        submission_id, user_id, admin_id, singular, plural, class_id, phonetic,
        status, archived_at, word_id, reason, derived_word, derived_from_word, derived_from_verb, number_variability
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    submissionData.submission_id || null,
    submissionData.user_id || null,
    admin_id || null,
    submissionData.singular || null,
    submissionData.plural || null,
    submissionData.class_id || null,
    submissionData.phonetic || null,
    status || "approved",
    word_id || null,
    reason || null, // Ajouter la raison de rejet si présente
    submissionData.derived_word || 0,
    submissionData.derived_from_word || null,
    submissionData.derived_from_verb || null,
    submissionData.number_variability || "variable",
  ];

  await connection.execute(query, values);

  // Transfert des traductions du mot vers archived_words_translations
  const translationQuery = `
    INSERT INTO archived_words_translations (archived_word_id, language_code, meaning)
    SELECT ?, language_code, meaning FROM pending_words_translations
    WHERE submission_id = ?
  `;

  // Récupération de l'ID archivé pour les traductions
  const [archivedEntry] = await connection.execute(
    `SELECT archived_id FROM archived_submitted_words WHERE submission_id = ? ORDER BY archived_at DESC LIMIT 1`,
    [submissionData.submission_id]
  );

  if (archivedEntry.length > 0) {
    const archivedId = archivedEntry[0].archived_id;
    await connection.execute(translationQuery, [
      archivedId,
      submissionData.submission_id,
    ]);
  }
}
