import { getConnection } from "./db.config";

export default defineEventHandler(async (event) => {
  try {
    const { token } = parseCookies(event);
    const decoded = jwt.verify(token, "YOUR_SECRET_KEY"); // Verify JWT token

    const userId = decoded.userId;

    const connection = await getConnection();

    // Get user info
    const [userResult] = await connection.execute(
      "SELECT username, email, created_at FROM users WHERE user_id = ?",
      [userId]
    );

    if (userResult.length === 0) {
      return { error: "Utilisateur non trouvé." };
    }

    // Get the count of words and verbs created by the user
    const [wordsResult] = await connection.execute(
      "SELECT COUNT(*) as wordsCreated FROM words WHERE user_id = ?",
      [userId]
    );

    const [verbsResult] = await connection.execute(
      "SELECT COUNT(*) as verbsCreated FROM verbs WHERE user_id = ?",
      [userId]
    );

    await connection.end();

    return {
      user: userResult[0],
      wordsCreated: wordsResult[0].wordsCreated,
      verbsCreated: verbsResult[0].verbsCreated,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du profil utilisateur :",
      error
    );
    return { error: "Erreur lors de la récupération du profil utilisateur." };
  }
});
