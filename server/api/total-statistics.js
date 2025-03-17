import { getConnection } from "./db.config";

export default defineEventHandler(async (event) => {
  try {
    const connection = await getConnection();

    // Requête pour compter le nombre d'utilisateurs, de mots et de verbes
    const [usersCount] = await connection.execute(
      `SELECT COUNT(*) as totalUsers FROM users;`
    );
    const [wordsCount] = await connection.execute(
      `SELECT COUNT(*) as totalWords FROM words;`
    );
    const [verbsCount] = await connection.execute(
      `SELECT COUNT(*) as totalVerbs FROM verbs;`
    );

    await connection.end();

    return {
      totalUsers: usersCount[0].totalUsers,
      totalWords: wordsCount[0].totalWords,
      totalVerbs: verbsCount[0].totalVerbs,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques :", error);
    return { error: "Erreur lors de la récupération des statistiques." };
  }
});
