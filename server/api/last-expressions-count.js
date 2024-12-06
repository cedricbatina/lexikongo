import { getConnection } from "./db.config";

export default defineEventHandler(async () => {
  const connection = await getConnection();

  try {
    // Date de 7 jours avant aujourd'hui
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Comptage des mots
    const [wordCount] = await connection.execute(
      `SELECT COUNT(*) AS count FROM words WHERE created_at >= ?`,
      [sevenDaysAgo]
    );

    // Comptage des verbes
    const [verbCount] = await connection.execute(
      `SELECT COUNT(*) AS count FROM verbs WHERE created_at >= ?`,
      [sevenDaysAgo]
    );

    await connection.end();

    return {
      wordCount: wordCount[0]?.count || 0,
      verbCount: verbCount[0]?.count || 0,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des expressions :", error);
    await connection.end();
    return { error: "Erreur lors de la récupération des expressions." };
  }
});
