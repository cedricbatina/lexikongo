import { getConnection } from "../../db.config";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  try {
    const connection = await getConnection();

    // Requête pour récupérer les détails de l'utilisateur
    const [rows] = await connection.execute(
      `SELECT 
        user_id, 
        username, 
        email, 
        role, 
        created_at, 
        email_verified
      FROM users
      WHERE user_id = ?`,
      [id]
    );

    await connection.end();

    // Retourner les détails de l'utilisateur
    return rows.length ? rows[0] : { error: "Utilisateur non trouvé" };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails de l'utilisateur :",
      error
    );
    return {
      error: "Erreur lors de la récupération des détails de l'utilisateur.",
    };
  }
});
