import { getConnection } from "./db.config";

export default defineEventHandler(async (event) => {
  try {
    const connection = await getConnection();

    // Récupérer tous les utilisateurs avec leurs rôles
    const [users] = await connection.execute(`
      SELECT 
        u.user_id, 
        u.username, 
        u.email, 
        r.role_name AS role, 
        u.created_at, 
        u.email_verified
      FROM users u
      LEFT JOIN user_roles ur ON u.user_id = ur.user_id
      LEFT JOIN roles r ON ur.role_id = r.role_id
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
