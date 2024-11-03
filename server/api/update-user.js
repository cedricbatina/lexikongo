import { getConnection } from "./db.config";

export default defineEventHandler(async (event) => {
  const userId = event.context.params.id;
  const body = await readBody(event);

  console.log("Données reçues pour mise à jour :", body); // Vérifier ce qui est reçu

  try {
    const connection = await getConnection();

    // Mettre à jour les informations de l'utilisateur
    const [result] = await connection.execute(
      `UPDATE users SET username = ?, email = ?, role = ? WHERE user_id = ?`,
      [body.username, body.email, body.role, userId]
    );

    console.log("Résultat de la mise à jour :", result); // Vérifier si la mise à jour a fonctionné

    await connection.end();
    return { success: true, message: "Utilisateur mis à jour avec succès" };
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    return { error: "Erreur lors de la mise à jour de l'utilisateur." };
  }
});
