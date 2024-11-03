/*import { getConnection } from "./db.config";

export default defineEventHandler(async (event) => {
  try {
    const connection = await getConnection();

    // Exécuter une requête pour récupérer tous les utilisateurs
    const [users] = await connection.execute(`
      SELECT user_id, username, email, role, created_at, email_verified
      FROM users
    `);

    await connection.end();

    return users;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    return {
      error: "Erreur lors de la récupération des utilisateurs.",
    };
  }
});*/
import { getConnection } from "./db.config";

export default defineEventHandler(async (event) => {
  try {
    const connection = await getConnection();

    // Récupérer tous les utilisateurs
    const [users] = await connection.execute(`
      SELECT user_id, username, email, role, created_at, email_verified
      FROM users
    `);

    await connection.end();

    return users;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    return {
      error: "Erreur lors de la récupération des utilisateurs.",
    };
  }
});
