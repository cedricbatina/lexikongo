import { getConnection } from "./db.config";

export default defineEventHandler(async (event) => {
  const connection = await getConnection();

  // Retrieve pending words submissions with nominal class, translations, username, and slug
  const [wordSubmissionsRaw] = await connection.execute(`
    SELECT ws.submission_id, ws.singular, ws.plural, ws.phonetic, u.username, nc.class_name AS nominal_class,
           ws.created_at, wt.language_code, wt.meaning, pws.slug
    FROM pending_words_submissions ws
    LEFT JOIN users u ON ws.user_id = u.user_id
    LEFT JOIN pending_words_nominal_classes pwc ON ws.submission_id = pwc.submission_id
    LEFT JOIN nominal_classes nc ON pwc.class_id = nc.class_id
    LEFT JOIN pending_words_translations wt ON ws.submission_id = wt.submission_id
    LEFT JOIN pending_words_slugs pws ON ws.submission_id = pws.submission_id
    WHERE ws.status = 'pending'
  `);

  // Group translations by submission for words
  /*const wordSubmissions = wordSubmissionsRaw.reduce((acc, row) => {
    const { submission_id, language_code, meaning, ...wordData } = row;

    // Recherche d'une soumission existante dans acc
    let existingSubmission = acc.find(
      (sub) => sub.submission_id === submission_id
    );

    // Si aucune soumission existante n'est trouvée, on en crée une
    if (!existingSubmission) {
      existingSubmission = { ...wordData, submission_id, translations: [] };
      acc.push(existingSubmission);
    }

    // Ajout de la traduction à la soumission existante
    if (language_code && meaning) {
      existingSubmission.translations.push({ language_code, meaning });
    }

    return asc;
  }, []);*/

  // Group translations by submission for words
  const wordSubmissions = wordSubmissionsRaw.reduce((acc, row) => {
    const { submission_id, language_code, meaning, ...wordData } = row;

    // Recherche d'une soumission existante dans acc
    let existingSubmission = acc.find(
      (sub) => sub.submission_id === submission_id
    );

    // Si aucune soumission existante n'est trouvée, on en crée une
    if (!existingSubmission) {
      existingSubmission = { ...wordData, submission_id, translations: [] };
      acc.push(existingSubmission);
    }

    // Ajout de la traduction à la soumission existante
    if (language_code && meaning) {
      existingSubmission.translations.push({ language_code, meaning });
    }

    return acc;
  }, []);

  // Retrieve pending verbs submissions with translations, username, and slug
  const [verbSubmissionsRaw] = await connection.execute(`
    SELECT vs.submission_id, vs.name, vs.root, vs.suffix, vs.phonetic, u.username,
           vs.created_at, vt.language_code, vt.meaning, pvs.slug
    FROM pending_verbs_submissions vs
    LEFT JOIN users u ON vs.user_id = u.user_id
    LEFT JOIN pending_verbs_translations vt ON vs.submission_id = vt.submission_id
    LEFT JOIN pending_verbs_slugs pvs ON vs.submission_id = pvs.submission_id
    WHERE vs.status = 'pending'
  `);

  // Group translations by submission for verbs
  const verbSubmissions = verbSubmissionsRaw.reduce((acc, row) => {
    const { submission_id, language_code, meaning, ...verbData } = row;
    let existingSubmission = acc.find(
      (sub) => sub.submission_id === submission_id
    );

    if (!existingSubmission) {
      existingSubmission = { ...verbData, submission_id, translations: [] };
      acc.push(existingSubmission);
    }

    if (language_code) {
      existingSubmission.translations.push({ language_code, meaning });
    }

    return acc;
  }, []);

  await connection.end();

  return {
    wordSubmissions,
    verbSubmissions,
  };
});
