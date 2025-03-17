import { getQuery, readBody } from "h3";
import { getConnection } from "./db.config";

// Gestion des différentes méthodes (GET, POST, PUT, DELETE)
export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const body = await readBody(event);

  // Database connection
  const connection = await getConnection();

  try {
    switch (method) {
      case "POST":
        return await addTranslation(connection, body);

      case "PUT":
        return await updateTranslation(connection, body);

      case "DELETE":
        return await deleteTranslation(connection, body);

      default:
        return { error: "Méthode non supportée" };
    }
  } catch (error) {
    console.error("Error in translation handling:", error);
    return { error: "Erreur lors de la gestion de la traduction." };
  } finally {
    connection.end();
  }
});

// Ajout d'une traduction
export async function addTranslation(
  connection,
  { verbId, wordId, pendingVerbId, pendingWordId, languageCode, meaning }
) {
  if (!languageCode || !meaning) {
    return { error: "Paramètres 'languageCode' et 'meaning' requis." };
  }

  let table, idField, idValue;
  if (verbId) {
    table = "verb_meanings";
    idField = "verb_id";
    idValue = verbId;
  } else if (wordId) {
    table = "word_meanings";
    idField = "word_id";
    idValue = wordId;
  } else if (pendingVerbId) {
    table = "pending_verbs_translations";
    idField = "submission_id";
    idValue = pendingVerbId;
  } else if (pendingWordId) {
    table = "pending_words_translations";
    idField = "submission_id";
    idValue = pendingWordId;
  } else {
    return { error: "Aucun ID de référence trouvé pour l'ajout." };
  }

  await connection.execute(
    `INSERT INTO ${table} (${idField}, language_code, meaning) VALUES (?, ?, ?)`,
    [idValue, languageCode, meaning]
  );
  return { message: "Traduction ajoutée avec succès." };
}

// Mise à jour d'une traduction
export async function updateTranslation(
  connection,
  {
    translationId,
    verbId,
    wordId,
    pendingVerbId,
    pendingWordId,
    languageCode,
    meaning,
  }
) {
  if (!translationId || !languageCode || !meaning) {
    return {
      error: "Paramètres 'translationId', 'languageCode' et 'meaning' requis.",
    };
  }

  let table, idColumn;
  if (verbId) {
    table = "verb_meanings";
    idColumn = "meaning_id";
  } else if (wordId) {
    table = "word_meanings";
    idColumn = "meaning_id";
  } else if (pendingVerbId) {
    table = "pending_verbs_translations";
    idColumn = "id";
  } else if (pendingWordId) {
    table = "pending_words_translations";
    idColumn = "id";
  } else {
    return { error: "Aucun ID de référence trouvé pour la mise à jour." };
  }

  const [rows] = await connection.execute(
    `UPDATE ${table} SET language_code = ?, meaning = ? WHERE ${idColumn} = ?`,
    [languageCode, meaning, translationId]
  );

  if (rows.affectedRows === 0) {
    return { error: "Traduction non trouvée ou non modifiée." };
  }
  return { message: "Traduction mise à jour avec succès." };
}

// Suppression d'une traduction
export async function deleteTranslation(
  connection,
  { translationId, verbId, wordId, pendingVerbId, pendingWordId }
) {
  if (!translationId) {
    return { error: "Paramètre 'translationId' manquant." };
  }

  let table, idColumn;
  if (verbId) {
    table = "verb_meanings";
    idColumn = "meaning_id";
  } else if (wordId) {
    table = "word_meanings";
    idColumn = "meaning_id";
  } else if (pendingVerbId) {
    table = "pending_verbs_translations";
    idColumn = "id";
  } else if (pendingWordId) {
    table = "pending_words_translations";
    idColumn = "id";
  } else {
    return { error: "Aucun ID de référence trouvé pour la suppression." };
  }

  const [rows] = await connection.execute(
    `DELETE FROM ${table} WHERE ${idColumn} = ?`,
    [translationId]
  );

  if (rows.affectedRows === 0) {
    console.log(
      "Suppression échouée : Traduction non trouvée ou déjà supprimée."
    );
    return { error: "Traduction non trouvée ou déjà supprimée." };
  } else {
    console.log(`Traduction supprimée avec succès : ID ${translationId}`);
    return { message: "Traduction supprimée avec succès." };
  }
}

/*import { getConnection } from "./db.config";

// Route for managing translations
export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const body = await readBody(event);

  // Database connection
  const connection = await getConnection();

  try {
    switch (method) {
      case "POST":
        return await addTranslation(connection, body);

      case "PUT":
        return await updateTranslation(connection, body);

      case "DELETE":
        return await deleteTranslation(connection, body);

      default:
        return { error: "Méthode non supportée" };
    }
  } catch (error) {
    console.error("Error in translation handling:", error);
    return { error: "Erreur lors de la gestion de la traduction." };
  } finally {
    connection.end();
  }
});
// Correction des fonctions

// Ajout d'une traduction
export async function addTranslation(
  connection,
  { verbId, wordId, pendingVerbId, pendingWordId, languageCode, meaning }
) {
  if (!languageCode || !meaning) {
    return { error: "Paramètres 'languageCode' et 'meaning' requis." };
  }

  let table, idField, idValue;
  if (verbId) {
    table = "verb_meanings";
    idField = "verb_id";
    idValue = verbId;
  } else if (wordId) {
    table = "word_meanings";
    idField = "word_id";
    idValue = wordId;
  } else if (pendingVerbId) {
    table = "pending_verbs_translations";
    idField = "submission_id";
    idValue = pendingVerbId;
  } else if (pendingWordId) {
    table = "pending_words_translations";
    idField = "submission_id";
    idValue = pendingWordId;
  } else {
    return { error: "Aucun ID de référence trouvé pour l'ajout." };
  }

  await connection.execute(
    `INSERT INTO ${table} (${idField}, language_code, meaning) VALUES (?, ?, ?)`,
    [idValue, languageCode, meaning]
  );
  return { message: "Traduction ajoutée avec succès." };
}

// Mise à jour d'une traduction
export async function updateTranslation(
  connection,
  {
    translationId,
    verbId,
    wordId,
    pendingVerbId,
    pendingWordId,
    languageCode,
    meaning,
  }
) {
  if (!translationId || !languageCode || !meaning) {
    return {
      error: "Paramètres 'translationId', 'languageCode' et 'meaning' requis.",
    };
  }

  let table, idColumn;
  if (verbId) {
    table = "verb_meanings";
    idColumn = "meaning_id";
  } else if (wordId) {
    table = "word_meanings";
    idColumn = "meaning_id";
  } else if (pendingVerbId) {
    table = "pending_verbs_translations";
    idColumn = "id";
  } else if (pendingWordId) {
    table = "pending_words_translations";
    idColumn = "id";
  } else {
    return { error: "Aucun ID de référence trouvé pour la mise à jour." };
  }

  const [rows] = await connection.execute(
    `UPDATE ${table} SET language_code = ?, meaning = ? WHERE ${idColumn} = ?`,
    [languageCode, meaning, translationId]
  );

  if (rows.affectedRows === 0) {
    return { error: "Traduction non trouvée ou non modifiée." };
  }
  return { message: "Traduction mise à jour avec succès." };
}

// Suppression d'une traduction
export async function deleteTranslation(
  connection,
  { translationId, verbId, wordId, pendingVerbId, pendingWordId }
) {
  if (!translationId) {
    return { error: "Paramètre 'translationId' manquant." };
  }

  let table, idColumn;
  if (verbId) {
    table = "verb_meanings";
    idColumn = "meaning_id";
  } else if (wordId) {
    table = "word_meanings";
    idColumn = "meaning_id";
  } else if (pendingVerbId) {
    table = "pending_verbs_translations";
    idColumn = "id";
  } else if (pendingWordId) {
    table = "pending_words_translations";
    idColumn = "id";
  } else {
    return { error: "Aucun ID de référence trouvé pour la suppression." };
  }

  const [rows] = await connection.execute(
    `DELETE FROM ${table} WHERE ${idColumn} = ?`,
    [translationId]
  );

  if (rows.affectedRows === 0) {
    console.log(
      "Suppression échouée : Traduction non trouvée ou déjà supprimée."
    );
    return { error: "Traduction non trouvée ou déjà supprimée." };
  } else {
    console.log(`Traduction supprimée avec succès : ID ${translationId}`);
    return { message: "Traduction supprimée avec succès." };
  }
}
*/
/*
// Add translation function
export async function addTranslation(
  connection,
  { verbId, wordId, pendingVerbId, pendingWordId, languageCode, meaning }
) {
  if (!languageCode || !meaning) {
    return { error: "Paramètres manquants." };
  }

  if (verbId || wordId) {
    const table = verbId ? "verb_meanings" : "word_meanings";
    const idField = verbId ? "verb_id" : "word_id";
    const idValue = verbId || wordId;

    const [rows] = await connection.execute(
      `SELECT 1 FROM ${table} WHERE ${idField} = ? AND language_code = ? AND meaning = ?`,
      [idValue, languageCode, meaning]
    );
    if (rows.length > 0) {
      return { error: "Cette traduction existe déjà pour cet élément." };
    }
    await connection.execute(
      `INSERT INTO ${table} (${idField}, language_code, meaning) VALUES (?, ?, ?)`,
      [idValue, languageCode, meaning]
    );
  } else if (pendingVerbId || pendingWordId) {
    const table = pendingVerbId
      ? "pending_verbs_translations"
      : "pending_words_translations";
    const idField = "submission_id";

    const idValue = pendingVerbId || pendingWordId;

    await connection.execute(
      `INSERT INTO ${table} (${idField}, language_code, meaning) VALUES (?, ?, ?)`,
      [idValue, languageCode, meaning]
    );
  }
  return { message: "Traduction ajoutée avec succès." };
}
*/

// Update translation function
/*export async function updateTranslation(
  connection,
  {
    translationId,
    verbId,
    wordId,
    pendingVerbId,
    
    languageCode,
    meaning,
  }
) {
  if (!translationId || !languageCode || !meaning) {
    return { error: "Paramètres manquants." };
  }

  const table = verbId
    ? "verb_meanings"
    : wordId
    ? "word_meanings"
    : pendingVerbId
    ? "pending_verbs_translations"
    : "pending_words_translations";

  const [rows] = await connection.execute(
    `UPDATE ${table} SET language_code = ?, meaning = ? WHERE meaning_id = ?`,
    [languageCode, meaning, translationId]
  );

  if (rows.affectedRows === 0) {
    return { error: "Traduction non trouvée ou non modifiée." };
  }

  return { message: "Traduction mise à jour avec succès." };
}
*/
// Delete translation function
/*
export async function deleteTranslation(
  connection,
  { translationId, verbId, wordId, pendingVerbId, pendingWordId }
) {
  if (!translationId) {
    return { error: "Paramètre translationId manquant." };
  }

  const table = verbId
    ? "verb_meanings"
    : wordId
    ? "word_meanings"
    : pendingVerbId
    ? "pending_verbs_translations"
    : "pending_words_translations";

  const [rows] = await connection.execute(
    `DELETE FROM ${table} WHERE meaning_id = ?`,
    [translationId]
  );

  if (rows.affectedRows === 0) {
    return { error: "Traduction non trouvée ou déjà supprimée." };
  }

  return { message: "Traduction supprimée avec succès." };
}
*/
