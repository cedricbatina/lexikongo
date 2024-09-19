import bcrypt from "bcrypt";
import { getConnection } from "./db.config";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  if (!email || !password) {
    return { error: "Email et mot de passe sont requis." };
  }

  try {
    const connection = await getConnection();

    // Vérifier si l'utilisateur existe
    const [user] = await connection.execute(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );

    if (user.length === 0) {
      return { error: "Email ou mot de passe incorrect." };
    }

    const validPassword = await bcrypt.compare(password, user[0].password);

    if (!validPassword) {
      return { error: "Email ou mot de passe incorrect." };
    }

    // Générer le token JWT
    const token = jwt.sign(
      { userId: user[0].user_id, role: user[0].role },
      "secret_key",
      { expiresIn: "1h" }
    );

    return { token, message: "Connexion réussie" };
  } catch (error) {
    return { error: "Erreur lors de la connexion." };
  }
});
