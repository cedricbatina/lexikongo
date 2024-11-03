import { getConnection } from "../db.config";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const connection = await getConnection();

  try {
    // Récupération des soumissions de mots en attente avec leurs traductions
    const [pendingWords] = await connection.execute(
      `SELECT pw.submission_id, pw.user_id, pw.singular, pw.plural, pw.phonetic, 
              nc.class_name AS nominal_class,
              GROUP_CONCAT(CASE WHEN wt.language_code = 'fr' THEN wt.meaning END SEPARATOR '; ') AS translation_fr,
              GROUP_CONCAT(CASE WHEN wt.language_code = 'en' THEN wt.meaning END SEPARATOR '; ') AS translation_en,
              pw.created_at
       FROM pending_words_submissions pw
       LEFT JOIN pending_words_nominal_classes pwc ON pw.class_id = pwc.class_id
       LEFT JOIN pending_words_translations wt ON pw.submission_id = wt.submission_id
       LEFT JOIN nominal_classes nc ON pw.class_id = nc.class_id
       WHERE pw.user_id = ?
       GROUP BY pw.submission_id, pw.user_id, pw.singular, pw.plural, pw.phonetic, nc.class_name, pw.created_at`,
      [id]
    );

    // Récupération des soumissions de mots archivés (approuvés et rejetés) avec leurs traductions
    const [archivedWords] = await connection.execute(
      `SELECT aw.word_id, aw.user_id, aw.singular, aw.plural, aw.phonetic, aw.status,
          nc.class_name AS nominal_class,
          GROUP_CONCAT(DISTINCT CASE WHEN wm.language_code = 'fr' THEN wm.meaning END SEPARATOR '; ') AS translation_fr,
          GROUP_CONCAT(DISTINCT CASE WHEN wm.language_code = 'en' THEN wm.meaning END SEPARATOR '; ') AS translation_en,
          aw.archived_at, ua.username AS admin_username, aw.reason
   FROM archived_submitted_words aw
   LEFT JOIN word_meanings wm ON aw.word_id = wm.word_id
   LEFT JOIN nominal_classes nc ON aw.class_id = nc.class_id
   LEFT JOIN users ua ON aw.admin_id = ua.user_id
   WHERE aw.user_id = ?
   GROUP BY aw.word_id, aw.user_id, aw.singular, aw.plural, aw.phonetic, nc.class_name, aw.status, aw.archived_at, ua.username, aw.reason`,
      [id]
    );

    // Récupération des soumissions de verbes en attente avec leurs traductions
    const [pendingVerbs] = await connection.execute(
      `SELECT pv.submission_id, pv.user_id, pv.name, pv.root, pv.suffix, pv.phonetic, 
              GROUP_CONCAT(CASE WHEN vt.language_code = 'fr' THEN vt.meaning END SEPARATOR '; ') AS translation_fr,
              GROUP_CONCAT(CASE WHEN vt.language_code = 'en' THEN vt.meaning END SEPARATOR '; ') AS translation_en,
              pv.created_at
       FROM pending_verbs_submissions pv
       LEFT JOIN pending_verbs_translations vt ON pv.submission_id = vt.submission_id
       WHERE pv.user_id = ?
       GROUP BY pv.submission_id, pv.user_id, pv.name, pv.root, pv.suffix, pv.phonetic, pv.created_at`,
      [id]
    );

    // Récupération des soumissions de verbes archivés (approuvés et rejetés) avec leurs traductions
    const [archivedVerbs] = await connection.execute(
      `SELECT av.verb_id, av.user_id, av.name, av.root, av.suffix, av.phonetic, av.status,
              GROUP_CONCAT(CASE WHEN vm.language_code = 'fr' THEN vm.meaning END SEPARATOR '; ') AS translation_fr,
              GROUP_CONCAT(CASE WHEN vm.language_code = 'en' THEN vm.meaning END SEPARATOR '; ') AS translation_en,
              av.archived_at, ua.username AS admin_username, av.reason
       FROM archived_submitted_verbs av
       LEFT JOIN verb_meanings vm ON av.verb_id = vm.verb_id
       LEFT JOIN users ua ON av.admin_id = ua.user_id
       WHERE av.user_id = ?
       GROUP BY av.verb_id, av.user_id, av.name, av.root, av.suffix, av.phonetic, av.status, av.archived_at, ua.username, av.reason`,
      [id]
    );

    return {
      pendingWords,
      archivedWords,
      pendingVerbs,
      archivedVerbs,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des soumissions :", error);
    return { error: "Erreur lors de la récupération des données." };
  } finally {
    await connection.end();
  }
});
