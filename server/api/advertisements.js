import { getConnection } from "./db.config";

export default defineEventHandler(async (event) => {
  try {
    const connection = await getConnection();
    const [ads] = await connection.execute(`
      SELECT id, title, description, image_url, link_url, partner_name, priority
      FROM advertisements
      WHERE is_active = 1
        AND (start_date IS NULL OR start_date <= NOW())
        AND (end_date IS NULL OR end_date >= NOW())
      ORDER BY priority DESC, start_date ASC
    `);

    await connection.end();

    return ads;
  } catch (error) {
    console.error("Erreur lors de la récupération des publicités :", error);
    return { error: "Erreur lors de la récupération des publicités." };
  }
});
