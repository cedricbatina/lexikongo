import { getConnection } from "./db.config";

export default defineEventHandler(async (event) => {
  try {
    const connection = await getConnection();
    const [partners] = await connection.execute(`
      SELECT id, name, description, logo_url, website_url, priority, partner_name
      FROM partners
      WHERE is_active = 1
      ORDER BY priority DESC, name ASC
    `);

    await connection.end();

    return partners;
  } catch (error) {
    console.error("Erreur lors de la récupération des partenaires :", error);
    return { error: "Erreur lors de la récupération des partenaires." };
  }
});
