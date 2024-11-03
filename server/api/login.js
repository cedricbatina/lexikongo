/*import bcrypt from "bcrypt";
import { getConnection } from "./db.config";
import jwt from "jsonwebtoken";
import { setCookie } from "h3"; // Utilisation de setCookie pour Nuxt 3

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

    // Vérifier si l'email est vérifié
    if (user[0].email_verified === 0) {
      return {
        error:
          "Veuillez vérifier votre adresse e-mail avant de vous connecter.",
      };
    }

    const validPassword = await bcrypt.compare(password, user[0].password);

    if (!validPassword) {
      return { error: "Email ou mot de passe incorrect." };
    }

    // Générer le token JWT
    const token = jwt.sign(
      { userId: user[0].user_id, role: user[0].role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Définir le cookie avec le JWT
    setCookie(event, "authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Utiliser secure en production
      sameSite: "strict", // Pour éviter les CSRF
      maxAge: 60 * 60 * 24 * 7, // 1 semaine
      path: "/",
    });

    // Réponse après authentification
    return {
      message: "Connexion réussie",
      user: {
        id: user[0].user_id,
        email: user[0].email,
        role: user[0].role,
      },
    };
  } catch (error) {
    return { error: "Erreur lors de la connexion." };
  }
});
*/
import bcrypt from "bcrypt";
import { getConnection } from "./db.config";
import jwt from "jsonwebtoken";
import { setCookie } from "h3"; // Utilisation de setCookie pour Nuxt 3

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

    // Vérifier si l'email est vérifié
    if (user[0].email_verified === 0) {
      return {
        error:
          "Veuillez vérifier votre adresse e-mail avant de vous connecter.",
      };
    }

    const validPassword = await bcrypt.compare(password, user[0].password);

    if (!validPassword) {
      return { error: "Email ou mot de passe incorrect." };
    }

    // Générer le token JWT
    const token = jwt.sign(
      { userId: user[0].user_id, role: user[0].role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Définir le cookie avec le JWT
    setCookie(event, "authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Utiliser secure en production
      sameSite: "strict", // Pour éviter les CSRF
      maxAge: 60 * 60 * 24 * 7, // 1 semaine
      path: "/",
    });

    // Réponse après authentification
    return {
      message: "Connexion réussie",
      user: {
        id: user[0].user_id,
        email: user[0].email,
        role: user[0].role,
      },
      token, // Ajoutez le token pour l'afficher dans la console du client
    };
  } catch (error) {
    return { error: "Erreur lors de la connexion." };
  }
});
