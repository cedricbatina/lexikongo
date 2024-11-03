import { getConnection } from "./db.config";

// Gestion de la requête PUT pour mettre à jour un mot ou un verbe
export async function handlePutRequest(type, id, body) {
  const { singular, plural, phonetic, translations } = body;

  if (!singular || !translations) {
    return {
      error: "Les champs 'singulier' et 'traductions' sont requis.",
    };
  }

  try {
    const connection = await getConnection();

    if (type === "word") {
      // Mise à jour pour un mot
      await connection.execute(
        `UPDATE words SET singular = ?, plural = ?, phonetic = ? WHERE word_id = ?`,
        [singular, plural, phonetic, id]
      );
    } else if (type === "verb") {
      // Mise à jour pour un verbe
      await connection.execute(
        `UPDATE verbs SET name = ?, phonetic = ? WHERE verb_id = ?`,
        [singular, phonetic, id]
      );
    }

    // Mise à jour des traductions
    for (const { language_code, meaning } of translations) {
      if (type === "word") {
        await connection.execute(
          `UPDATE word_meanings SET meaning = ? WHERE word_id = ? AND language_code = ?`,
          [meaning, id, language_code]
        );
      } else if (type === "verb") {
        await connection.execute(
          `UPDATE verb_meanings SET meaning = ? WHERE verb_id = ? AND language_code = ?`,
          [meaning, id, language_code]
        );
      }
    }

    await connection.end();
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    return { error: "Erreur lors de la mise à jour." };
  }
}

// Exemples supplémentaires pour POST, DELETE, GET
export async function handlePostRequest(body) {
  // Gérer l'ajout d'un mot ou verbe...
}

export async function handleDeleteRequest(id, type) {
  // Gérer la suppression d'un mot ou verbe...
}
