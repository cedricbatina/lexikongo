import { getConnection } from "./db.config";

export default defineEventHandler(async () => {
  const connection = await getConnection();

  try {
    // Récupérer la date de 7 jours avant aujourd'hui
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Query pour récupérer les mots ajoutés
    const [words] = await connection.execute(
      `SELECT singular, created_at 
       FROM words 
       WHERE created_at >= ? 
       ORDER BY created_at DESC`,
      [sevenDaysAgo]
    );

    // Query pour récupérer les verbes ajoutés
    const [verbs] = await connection.execute(
      `SELECT name, created_at 
       FROM verbs 
       WHERE created_at >= ? 
       ORDER BY created_at DESC`,
      [sevenDaysAgo]
    );

    await connection.end();

    return {
      words: words,
      verbs: verbs,
      wordCount: words.length,
      verbCount: verbs.length,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des expressions :", error);
    await connection.end();
    return { error: "Erreur lors de la récupération des expressions." };
  }
});
