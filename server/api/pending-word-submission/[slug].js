import { getConnection } from "~/server/api/db.config";
import { archiveWord } from "~/server/api/archive-submissions";
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
    // Récupération de la soumission de mot par slug
    const [rows] = await connection.execute(
      `SELECT ws.*, sl.slug, wt.id AS translation_id, wt.language_code, wt.meaning 
       FROM pending_words_submissions ws
       JOIN pending_words_slugs sl ON ws.submission_id = sl.submission_id 
       LEFT JOIN pending_words_translations wt ON ws.submission_id = wt.submission_id 
       WHERE sl.slug = ?`,
      [slug]
    );

    await connection.end();

    if (rows.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Mot non trouvé",
      });
    }

    const wordSubmission = {
      ...rows[0],
      translations: rows
        .map((row) => ({
          id: row.translation_id, // Inclure l'id de la traduction ici
          language_code: row.language_code,
          meaning: row.meaning,
        }))
        .filter((translation) => translation.language_code), // Regroupe les traductions existantes
    };

    return wordSubmission;
  }

  if (method === "PUT") {
    const data = await readBody(event);
    const { singular, plural, phonetic, class_id, translations } = data;

    // Préparer les valeurs pour éviter les valeurs undefined
    const singularValue = singular || null;
    const pluralValue = plural || null;
    const phoneticValue = phonetic || null;
    const classIdValue = class_id || null;

    // Mise à jour des champs principaux du mot
    await connection.execute(
      `UPDATE pending_words_submissions 
         SET singular = ?, plural = ?, phonetic = ?, class_id = ?, updated_at = NOW() 
         WHERE submission_id = (SELECT submission_id FROM pending_words_slugs WHERE slug = ?)`,
      [singularValue, pluralValue, phoneticValue, classIdValue, slug]
    );

    // Récupérer le `submission_id`
    const [[{ submission_id }]] = await connection.execute(
      `SELECT ws.submission_id
         FROM pending_words_submissions ws
         LEFT JOIN pending_words_slugs wsl ON ws.submission_id = wsl.submission_id
         WHERE wsl.slug = ?`,
      [slug]
    );

    if (!submission_id) {
      console.error("Erreur : submission_id introuvable.");
      await connection.end();
      return { error: "Échec de la mise à jour : submission_id introuvable." };
    }

    // Récupérer les traductions existantes pour le `submission_id`
    const [existingTranslations] = await connection.execute(
      `SELECT id AS translation_id, language_code, meaning
         FROM pending_words_translations
         WHERE submission_id = ?`,
      [submission_id]
    );

    // Gestion des traductions
    if (translations && Array.isArray(translations)) {
      // Initialiser les ensembles pour les ajouts, mises à jour, et suppressions
      const newTranslations = [];
      const updatedTranslations = [];
      const deletedTranslations = new Set();

      // Créer une map des traductions existantes pour un accès rapide
      const existingTranslationsMap = new Map(
        existingTranslations.map((t) => [t.translation_id, t])
      );

      // Parcourir les traductions envoyées par le client
      for (const translation of translations) {
        const { action, language_code, meaning, id } = translation;

        if (action === "add" && meaning) {
          console.log("Ajout de la traduction :", translation);
          // Ajouter aux nouvelles traductions si l'action est 'add'
          newTranslations.push({ language_code, meaning });
        } else if (action === "update" && id) {
          console.log("Mise à jour de la traduction :", translation);

          // Si l'action est 'update', vérifier si les données ont changé
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
          // Ajouter à la liste des suppressions
          deletedTranslations.add(id);
        }
      }

      // Exécuter les ajouts
      for (const { language_code, meaning } of newTranslations) {
        await addTranslation(connection, {
          pendingWordId: submission_id,
          languageCode: language_code,
          meaning: meaning,
        });
      }

      // Exécuter les mises à jour
      for (const { id, language_code, meaning } of updatedTranslations) {
        await updateTranslation(connection, {
          translationId: id,
          languageCode: language_code,
          meaning: meaning,
        });
      }

      // Exécuter les suppressions
      for (const id of deletedTranslations) {
        await deleteTranslation(connection, {
          translationId: id,
        });
      }
    }

    await connection.end();
    return { message: "Soumission de mot mise à jour avec succès." };
  }

  if (method === "DELETE") {
    const { admin_id, reason } = await readBody(event);

    const [submission] = await connection.execute(
      `SELECT * FROM pending_words_submissions WHERE submission_id = (SELECT submission_id FROM pending_words_slugs WHERE slug = ?)`,
      [slug]
    );

    if (!submission.length) {
      await connection.end();
      throw createError({
        statusCode: 404,
        statusMessage: "Soumission non trouvée.",
      });
    }

    await archiveWord(
      connection,
      submission[0],
      "rejected",
      admin_id,
      null,
      reason
    );

    // Suppression des entrées dans les tables temporaires
    await connection.execute(
      `DELETE FROM pending_words_slugs WHERE submission_id = ?`,
      [submission[0].submission_id]
    );
    await connection.execute(
      `DELETE FROM pending_words_submissions WHERE submission_id = ?`,
      [submission[0].submission_id]
    );
    await connection.execute(
      `DELETE FROM pending_words_translations WHERE submission_id = ?`,
      [submission[0].submission_id]
    );

    await connection.end();
    return { message: "Soumission de mot rejetée et archivée avec succès." };
  }

  throw createError({
    statusCode: 405,
    statusMessage: "Méthode non supportée.",
  });
});

/*import { getConnection } from "~/server/api/db.config";
import { archiveWord } from "~/server/api/archive-submissions";
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
    // Récupère les informations de la soumission de mot par slug
    const [rows] = await connection.execute(
      `SELECT ws.*, sl.slug, wt.language_code, wt.meaning 
       FROM pending_words_submissions ws
       JOIN pending_words_slugs sl ON ws.submission_id = sl.submission_id 
       LEFT JOIN pending_words_translations wt ON ws.submission_id = wt.submission_id 
       WHERE sl.slug = ?`,
      [slug]
    );

    await connection.end();

    if (rows.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Mot non trouvé",
      });
    }

    // Regrouper les traductions dans un tableau de traductions
    const wordSubmission = {
      ...rows[0],
      translations: rows
        .map((row) => ({
          language_code: row.language_code,
          meaning: row.meaning,
        }))
        .filter((translation) => translation.language_code),
    };

    return wordSubmission;
  }

  if (method === "PUT") {
    const data = await readBody(event);
    const { singular, plural, phonetic, class_id } = data;

    // Met à jour les champs de base pour la soumission de mot
    await connection.execute(
      `UPDATE pending_words_submissions 
       SET singular = ?, plural = ?, phonetic = ?, class_id = ? 
       WHERE submission_id = (SELECT submission_id FROM pending_words_slugs WHERE slug = ?)`,
      [singular, plural, phonetic, class_id, slug]
    );

    // Gestion des traductions
    if (data.translations && Array.isArray(data.translations)) {
      for (const translation of data.translations) {
        if (translation.action === "add") {
          await addTranslation(connection, {
            pendingWordId: data.submission_id,
            languageCode: translation.language_code,
            meaning: translation.meaning,
          });
        } else if (translation.action === "update") {
          await updateTranslation(connection, {
            translationId: translation.translation_id,
            languageCode: translation.language_code,
            meaning: translation.meaning,
          });
        } else if (translation.action === "delete") {
          await deleteTranslation(connection, {
            translationId: translation.translation_id,
          });
        }
      }
    }

    await connection.end();
    return { message: "Soumission de mot mise à jour avec succès." };
  }

  if (method === "DELETE") {
    const { admin_id, reason } = await readBody(event);

    const [submission] = await connection.execute(
      `SELECT * FROM pending_words_submissions WHERE submission_id = (SELECT submission_id FROM pending_words_slugs WHERE slug = ?)`,
      [slug]
    );

    if (!submission.length) {
      await connection.end();
      throw createError({
        statusCode: 404,
        statusMessage: "Soumission non trouvée.",
      });
    }

    await archiveWord(
      connection,
      submission[0],
      "rejected",
      admin_id,
      null,
      reason
    );

    // Suppression des entrées dans les tables temporaires
    await connection.execute(
      `DELETE FROM pending_words_slugs WHERE submission_id = (SELECT submission_id FROM pending_words_slugs WHERE slug = ?)`,
      [slug]
    );
    await connection.execute(
      `DELETE FROM pending_words_submissions WHERE submission_id = (SELECT submission_id FROM pending_words_slugs WHERE slug = ?)`,
      [slug]
    );
    await connection.execute(
      `DELETE FROM pending_words_translations WHERE submission_id = (SELECT submission_id FROM pending_words_slugs WHERE slug = ?)`,
      [slug]
    );

    await connection.end();
    return { message: "Soumission de mot rejetée et archivée avec succès." };
  }

  throw createError({
    statusCode: 405,
    statusMessage: "Méthode non supportée.",
  });
});
*/
