/*import { getConnection } from "./db.config";
import { eventHandler, sendError } from "h3";

export default eventHandler(async (event) => {
  const { token } = event.query;

  try {
    const connection = await getConnection();

    // Vérifier et valider le token
    const [result] = await connection.execute(
      `UPDATE users SET verification_token = NULL WHERE verification_token = ?`,
      [token]
    );

    await connection.end();

    if (result.affectedRows > 0) {
      return { success: true, message: "Compte vérifié avec succès !" };
    } else {
      return sendError(event, {
        statusCode: 400,
        statusMessage: "Token invalide ou expiré.",
      });
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de l'email :", error);
    return sendError(event, {
      statusCode: 500,
      statusMessage: "Erreur lors de la vérification de l'email.",
      message: error.message,
    });
  }
});
*/

import { getConnection } from "./db.config";
import { eventHandler, sendError } from "h3";

export default eventHandler(async (event) => {
  // Utiliser 'getQuery' pour extraire correctement les paramètres de la requête
  const query = getQuery(event);
  const { token } = query; // Maintenant 'token' sera extrait correctement

  if (!token) {
    return sendError(event, {
      statusCode: 400,
      statusMessage: "Le token est manquant.",
    });
  }

  try {
    const connection = await getConnection();

    // Vérifier et valider le token
    const [result] = await connection.execute(
      `UPDATE users SET verification_token = NULL, email_verified = 1 WHERE verification_token = ?`,
      [token]
    );

    await connection.end();

    if (result.affectedRows > 0) {
      return { success: true, message: "Compte vérifié avec succès !" };
    } else {
      return sendError(event, {
        statusCode: 400,
        statusMessage: "Token invalide ou expiré.",
      });
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de l'email :", error);
    return sendError(event, {
      statusCode: 500,
      statusMessage: "Erreur lors de la vérification de l'email.",
      message: error.message,
    });
  }
});
