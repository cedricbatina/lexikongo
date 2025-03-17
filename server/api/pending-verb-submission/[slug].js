import { getConnection } from "~/server/api/db.config";
import { archiveVerb } from "~/server/api/archive-submissions";
import {
  addTranslation,
  updateTranslation,
  deleteTranslation,
} from "~/server/api/add-translation";

export default defineEventHandler(async (event) => {
  const { slug } = event.context.params;
  const method = event.node.req.method;
  const connection = await getConnection();

  if (method === "GET") {
    const [rows] = await connection.execute(
      `SELECT vs.*, sl.slug, vt.id AS translation_id, vt.language_code, vt.meaning 
       FROM pending_verbs_submissions vs
       JOIN pending_verbs_slugs sl ON vs.submission_id = sl.submission_id 
       LEFT JOIN pending_verbs_translations vt ON vs.submission_id = vt.submission_id 
       WHERE sl.slug = ?`,
      [slug]
    );

    await connection.end();

    if (rows.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Verbe non trouvé",
      });
    }

    const verbSubmission = {
      ...rows[0],
      translations: rows
        .map((row) => ({
          id: row.translation_id,
          language_code: row.language_code,
          meaning: row.meaning,
        }))
        .filter((translation) => translation.language_code),
    };

    return verbSubmission;
  }

  if (method === "PUT") {
    const data = await readBody(event);
    const { name, root, suffix, phonetic, translations } = data;

    await connection.execute(
      `UPDATE pending_verbs_submissions 
         SET name = ?, root = ?, suffix = ?, phonetic = ?, updated_at = NOW() 
         WHERE submission_id = (SELECT submission_id FROM pending_verbs_slugs WHERE slug = ?)`,
      [name || null, root || null, suffix || null, phonetic || null, slug]
    );

    const [[{ submission_id }]] = await connection.execute(
      `SELECT submission_id FROM pending_verbs_slugs WHERE slug = ?`,
      [slug]
    );

    if (!submission_id) {
      console.error("Erreur : submission_id introuvable.");
      await connection.end();
      return { error: "Échec de la mise à jour : submission_id introuvable." };
    }

    const [existingTranslations] = await connection.execute(
      `SELECT id AS translation_id, language_code, meaning
         FROM pending_verbs_translations
         WHERE submission_id = ?`,
      [submission_id]
    );

    if (translations && Array.isArray(translations)) {
      const newTranslations = [];
      const updatedTranslations = [];
      const deletedTranslations = new Set();

      const existingTranslationsMap = new Map(
        existingTranslations.map((t) => [t.translation_id, t])
      );

      for (const translation of translations) {
        const { action, language_code, meaning, id } = translation;

        if (action === "add" && meaning) {
          console.log("Ajout de la traduction :", translation);
          newTranslations.push({ language_code, meaning });
        } else if (action === "update" && id) {
          console.log("Mise à jour de la traduction :", translation);

          const existing = existingTranslationsMap.get(id);
          if (
            existing &&
            (existing.language_code !== language_code ||
              existing.meaning !== meaning)
          ) {
            updatedTranslations.push({ id, language_code, meaning });
          }
        } else if (action === "delete" && id) {
          console.log("Suppression de la traduction :", translation);
          deletedTranslations.add(id);
        }
      }

      // Suppression des traductions
      for (const id of deletedTranslations) {
        await deleteTranslation(connection, {
          translationId: id,
        });
      }

      // Mise à jour des traductions
      for (const { id, language_code, meaning } of updatedTranslations) {
        await updateTranslation(connection, {
          translationId: id,
          languageCode: language_code,
          meaning: meaning,
        });
      }

      // Ajout des nouvelles traductions
      for (const { language_code, meaning } of newTranslations) {
        await addTranslation(connection, {
          pendingVerbId: submission_id,
          languageCode: language_code,
          meaning: meaning,
        });
      }
    }

    await connection.end();
    return { message: "Soumission de verbe mise à jour avec succès." };
  }

  if (method === "DELETE") {
    const { admin_id, reason } = await readBody(event);

    const [submission] = await connection.execute(
      `SELECT * FROM pending_verbs_submissions WHERE submission_id = (SELECT submission_id FROM pending_verbs_slugs WHERE slug = ?)`,
      [slug]
    );

    if (!submission.length) {
      await connection.end();
      throw createError({
        statusCode: 404,
        statusMessage: "Soumission non trouvée.",
      });
    }

    await archiveVerb(
      connection,
      submission[0],
      "rejected",
      admin_id,
      null,
      reason
    );

    await connection.execute(
      `DELETE FROM pending_verbs_slugs WHERE submission_id = ?`,
      [submission[0].submission_id]
    );
    await connection.execute(
      `DELETE FROM pending_verbs_submissions WHERE submission_id = ?`,
      [submission[0].submission_id]
    );
    await connection.execute(
      `DELETE FROM pending_verbs_translations WHERE submission_id = ?`,
      [submission[0].submission_id]
    );

    await connection.end();
    return { message: "Soumission de verbe rejetée et archivée avec succès." };
  }

  throw createError({
    statusCode: 405,
    statusMessage: "Méthode non supportée.",
  });
});

/*import { getConnection } from "~/server/api/db.config";
import { archiveVerb } from "~/server/api/archive-submissions";
import {
  addTranslation,
  updateTranslation,
  deleteTranslation,
} from "~/server/api/add-translation";

export default defineEventHandler(async (event) => {
  const { slug } = event.context.params; // Assurer que slug est défini ici
  const method = event.node.req.method;
  const connection = await getConnection();

  // Pré-récupération de submission_id à partir du slug
  const [submissionRow] = await connection.execute(
    `SELECT submission_id FROM pending_verbs_slugs WHERE slug = ?`,
    [slug]
  );

  if (!submissionRow.length) {
    await connection.end();
    throw createError({
      statusCode: 404,
      statusMessage: "Soumission non trouvée.",
    });
  }
  const submission_id = submissionRow[0].submission_id; // submission_id récupéré et utilisé dans toutes les requêtes

  if (method === "GET") {
    // Récupère les informations de la soumission de verbe par submission_id
    const [rows] = await connection.execute(
      `SELECT vs.*, sl.slug, vt.id AS translation_id, vt.language_code, vt.meaning 
   FROM pending_verbs_submissions vs
   JOIN pending_verbs_slugs sl ON vs.submission_id = sl.submission_id 
   LEFT JOIN pending_verbs_translations vt ON vs.submission_id = vt.submission_id 
   WHERE vs.submission_id = ?`,
      [submission_id]
    );

    await connection.end();

    if (rows.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Verbe non trouvé",
      });
    }

    const verbSubmission = {
      ...rows[0],
      translations: rows
        .map((row) => ({
          id: row.translation_id, // Inclure l'id de la traduction ici
          language_code: row.language_code,
          meaning: row.meaning,
        }))
        .filter((translation) => translation.language_code), // Filtre les traductions existantes
    };

    return verbSubmission;
  }

  if (method === "DELETE") {
    const { admin_id, reason } = await readBody(event);

    const [submission] = await connection.execute(
      `SELECT * FROM pending_verbs_submissions WHERE submission_id = ?`,
      [submission_id]
    );

    if (!submission.length) {
      await connection.end();
      throw createError({
        statusCode: 404,
        statusMessage: "Soumission non trouvée.",
      });
    }

    await archiveVerb(
      connection,
      submission[0],
      "rejected",
      admin_id,
      null,
      reason
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

    await connection.end();
    return { message: "Soumission de verbe rejetée et archivée avec succès." };
  }
  if (method === "PUT") {
    const data = await readBody(event);
    const { name, root, suffix, phonetic, reason, translations } = data;

    // Met à jour les champs principaux du verbe
    await connection.execute(
      `UPDATE pending_verbs_submissions 
         SET name = ?, root = ?, suffix = ?, phonetic = ?, reason = ?, updated_at = NOW() 
         WHERE submission_id = (SELECT submission_id FROM pending_verbs_slugs WHERE slug = ?)`,
      [
        name || null,
        root || null,
        suffix || null,
        phonetic || null,
        reason || null,
        slug, // Utilisation du slug pour obtenir submission_id
      ]
    );

    // Gestion des traductions
    if (translations && Array.isArray(translations)) {
      const [[{ submission_id }]] = await connection.execute(
        `SELECT submission_id FROM pending_verbs_slugs WHERE slug = ?`,
        [slug]
      );

      for (const translation of translations) {
        const { action, language_code, meaning, translation_id } = translation;

        console.log(
          `Action: ${action}, Langue: ${language_code}, Traduction: ${meaning}, ID: ${translation_id}`
        );

        if (action === "add") {
          await addTranslation(connection, {
            pendingVerbId: submission_id,
            languageCode: language_code,
            meaning: meaning,
          });
        } else if (action === "update" && translation_id) {
          await updateTranslation(connection, {
            translationId: translation_id,
            languageCode: language_code,
            meaning: meaning,
          });
        } else if (action === "delete" && translation_id) {
          await deleteTranslation(connection, {
            translationId: translation_id,
          });
        }
      }
    }

    await connection.end();
    return { message: "Soumission mise à jour avec succès." };
  }

  throw createError({
    statusCode: 405,
    statusMessage: "Méthode non supportée.",
  });
});
*/
