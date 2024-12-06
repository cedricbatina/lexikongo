import { getConnection } from "../../db.config";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  try {
    const connection = await getConnection();

    // Requête pour récupérer les détails de l'utilisateur
    const [rows] = await connection.execute(
      `SELECT 
  u.user_id, 
  u.username, 
  u.email, 
  u.created_at, 
  u.email_verified,
  GROUP_CONCAT(r.role_name) AS roles
FROM 
  users u
LEFT JOIN 
  user_roles ur ON u.user_id = ur.user_id
LEFT JOIN 
  roles r ON ur.role_id = r.role_id
WHERE 
  u.user_id = ?
GROUP BY 
  u.user_id;
`,
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
