import { getConnection } from "~/server/api/db.config";
import { readBody } from "h3"; // Import de readBody pour lire les données envoyées

export default defineEventHandler(async (event) => {
  const userId = event.context.params.id; // Récupère l'ID de l'utilisateur depuis l'URL
  const body = await readBody(event); // Récupère le body envoyé dans la requête

  try {
    // Extraire les données de body
    const { username, email, role } = body;

    // Vérification des champs requis
    if (!username || !email || !role) {
      return { error: "Tous les champs sont requis." };
    }

    // Connexion à la base de données
    const connection = await getConnection();
    const [result] = await connection.execute(
      `UPDATE users SET username = ?, email = ?, role = ? WHERE user_id = ?`,
      [username, email, role, userId]
    );

    // Fermer la connexion
    await connection.end();

    // Vérifie si un utilisateur a été mis à jour
    if (result.affectedRows === 0) {
      return { error: "Utilisateur non trouvé ou non mis à jour." };
    }

    return { success: true }; // Retourne un succès si l'utilisateur est mis à jour
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    return { error: "Erreur lors de la mise à jour de l'utilisateur." };
  }
});
