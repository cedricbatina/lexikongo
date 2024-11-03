import { getConnection } from "./db.config";

export default defineEventHandler(async (event) => {
  const userId = event.context.params.id; // Récupérer l'ID de l'utilisateur à partir de l'URL

  try {
    const connection = await getConnection();

    // Supprimer l'utilisateur de la base de données
    await connection.execute(`DELETE FROM users WHERE user_id = ?`, [userId]);

    await connection.end();
    return { success: true, message: "Utilisateur supprimé avec succès" };
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    return { error: "Erreur lors de la suppression de l'utilisateur." };
  }
});
