import { getConnection } from "./db.config";

export default defineEventHandler(async (event) => {
  const { verbId, wordId, languageCode, meaning } = await readBody(event);

  try {
    const connection = await getConnection();

    if (verbId) {
      // Vérifier si la traduction existe déjà pour ce verbe
      const [rows] = await connection.execute(
        `SELECT 1 FROM verb_meanings WHERE verb_id = ? AND language_code = ? AND meaning = ?`,
        [verbId, languageCode, meaning]
      );

      if (rows.length > 0) {
        return { error: "Cette traduction existe déjà pour ce verbe." };
      }

      // Si la traduction n'existe pas, l'ajouter
      await connection.execute(
        `
        INSERT INTO verb_meanings (verb_id, language_code, meaning)
        VALUES (?, ?, ?)`,
        [verbId, languageCode, meaning]
      );
    } else if (wordId) {
      // Vérifier si la traduction existe déjà pour ce mot
      const [rows] = await connection.execute(
        `SELECT 1 FROM word_meanings WHERE word_id = ? AND language_code = ? AND meaning = ?`,
        [wordId, languageCode, meaning]
      );

      if (rows.length > 0) {
        return { error: "Cette traduction existe déjà pour ce mot." };
      }

      // Si la traduction n'existe pas, l'ajouter
      await connection.execute(
        `
        INSERT INTO word_meanings (word_id, language_code, meaning)
        VALUES (?, ?, ?)`,
        [wordId, languageCode, meaning]
      );
    }

    return { message: "Traduction ajoutée avec succès" };
  } catch (error) {
    console.error("Erreur lors de l'ajout de la traduction :", error);
    return { error: "Erreur lors de l'ajout de la traduction." };
  }
});
