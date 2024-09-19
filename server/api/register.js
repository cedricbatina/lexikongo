import bcrypt from "bcrypt";
import { getConnection } from "./db.config";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const { username, email, password } = await readBody(event);

  if (!username || !email || !password) {
    return { error: "Tous les champs sont requis." };
  }

  try {
    const connection = await getConnection();

    // Vérifier si l'email existe déjà
    const [existingUser] = await connection.execute(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    if (existingUser.length > 0) {
      return { error: "Cet email est déjà utilisé." };
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insérer un nouvel utilisateur
    await connection.execute(
      `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'user')`,
      [username, email, hashedPassword]
    );

    await connection.end();

    return { message: "Inscription réussie, veuillez vous connecter." };
  } catch (error) {
    return { error: "Erreur lors de l'inscription." };
  }
});
