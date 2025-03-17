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
import { getQuery, sendError } from "h3";
import { getConnection } from "./db.config";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { token } = query;

  if (!token) {
    return sendError(event, {
      statusCode: 400,
      statusMessage: "Le token est manquant.",
      message: "Vous devez fournir un token de vérification.",
    });
  }

  console.log("Token reçu :", token);

  let connection;

  try {
    connection = await getConnection();

    // Vérifier et valider le token
    const [result] = await connection.execute(
      `UPDATE users 
       SET verification_token = NULL, email_verified = 1 
       WHERE verification_token = ? AND email_verified = 0`,
      [token]
    );

    console.log("Résultat de la mise à jour :", result);

    if (result.affectedRows === 0) {
      return sendError(event, {
        statusCode: 400,
        statusMessage: "Token invalide ou déjà utilisé.",
        message: "Le token est invalide ou l'email est déjà vérifié.",
      });
    }

    return {
      success: true,
      message: "Votre email a été vérifié avec succès !",
    };
  } catch (error) {
    console.error("Erreur lors de la vérification :", error);
    return sendError(event, {
      statusCode: 500,
      statusMessage: "Erreur interne.",
      message: error.message,
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});
