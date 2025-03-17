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
*/ /*
import bcrypt from "bcrypt";
import { getConnection } from "./db.config";
import jwt from "jsonwebtoken";
import { setCookie, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  if (!email || !password) {
    return { error: "Email et mot de passe sont requis." };
  }

  let connection;

  try {
    connection = await getConnection();

    // Vérifier si l'utilisateur existe
    const [user] = await connection.execute(
      `SELECT user_id, username, email, password, role, email_verified FROM users WHERE email = ?`,
      [email]
    );

    if (user.length === 0) {
      return { error: "Email ou mot de passe incorrect." };
    }

    // Vérifier si l'email est vérifié
    if (user[0].email_verified !== 1) {
      return {
        error: "Veuillez vérifier votre adresse e-mail avant de vous connecter.",
      };
    }

    // Vérifier le mot de passe
    const validPassword = await bcrypt.compare(password, user[0].password);

    if (!validPassword) {
      return { error: "Email ou mot de passe incorrect." };
    }

    // Générer le token JWT avec les informations de base
    const token = jwt.sign(
      {
        userId: user[0].user_id,
        role: user[0].role,
        username: user[0].username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Définir le cookie avec le JWT
    setCookie(event, "authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
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
        username: user[0].username,
      },
      token, // Ajouté uniquement pour le débogage, à supprimer en production si non nécessaire
    };
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    return { error: "Erreur lors de la connexion." };
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});
*/
/*import bcrypt from "bcrypt";
import { getConnection } from "./db.config";
import jwt from "jsonwebtoken";
import { setCookie, readBody } from "h3"; // Utilisation de setCookie pour Nuxt 3

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  if (!email || !password) {
    return { error: "Email et mot de passe sont requis." };
  }

  let connection;

  try {
    connection = await getConnection();

    // Vérifier si l'utilisateur existe
    const [user] = await connection.execute(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );

    if (user.length === 0) {
      return { error: "Email ou mot de passe incorrect." };
    }

    // Vérifier si l'email est vérifié
    if (user[0].email_verified !== 1) {
      return {
        error:
          "Veuillez vérifier votre adresse e-mail avant de vous connecter.",
      };
    }

    // Vérifier le mot de passe
    const validPassword = await bcrypt.compare(password, user[0].password);

    if (!validPassword) {
      return { error: "Email ou mot de passe incorrect." };
    }

    // Récupérer les rôles de l'utilisateur
    const [roles] = await connection.execute(
      `SELECT r.role_name FROM roles r 
       INNER JOIN user_roles ur ON ur.role_id = r.role_id
       WHERE ur.user_id = ?`,
      [user[0].user_id]
    );

    const userRoles = roles.map((role) => role.role_name);

    // Générer le token JWT avec les informations nécessaires
    const token = jwt.sign(
      {
        userId: user[0].user_id,
        roles: userRoles,
        username: user[0].username,
      },
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

    // Réponse après authentification avec les informations utilisateur nécessaires
    return {
      message: "Connexion réussie",
      user: {
        id: user[0].user_id,
        email: user[0].email,
        roles: userRoles,
        username: user[0].username,
      },
    };
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    return { error: "Erreur lors de la connexion." };
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});
*/

import bcrypt from "bcrypt";
import { getConnection } from "./db.config";
import jwt from "jsonwebtoken";
import { setCookie, readBody } from "h3"; // Utilisation de setCookie pour Nuxt 3

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  if (!email || !password) {
    return { error: "Email et mot de passe sont requis." };
  }

  let connection;

  try {
    connection = await getConnection();

    // Vérifier si l'utilisateur existe
    const [user] = await connection.execute(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );

    if (user.length === 0) {
      return { error: "Email ou mot de passe incorrect." };
    }

    // Vérifier si l'email est vérifié
    if (user[0].email_verified !== 1) {
      return {
        error:
          "Veuillez vérifier votre adresse e-mail avant de vous connecter.",
      };
    }

    // Vérifier le mot de passe
    const validPassword = await bcrypt.compare(password, user[0].password);

    if (!validPassword) {
      return { error: "Email ou mot de passe incorrect." };
    }

    // Récupérer les rôles de l'utilisateur
    const [roles] = await connection.execute(
      `SELECT r.role_name FROM roles r 
       INNER JOIN user_roles ur ON ur.role_id = r.role_id
       WHERE ur.user_id = ?`,
      [user[0].user_id]
    );

    const userRoles = roles.map((role) => role.role_name);

    // Générer le token JWT avec les informations nécessaires
    const token = jwt.sign(
      {
        userId: user[0].user_id,
        roles: userRoles,
        username: user[0].username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Définir le cookie avec le JWT
    setCookie(event, "authToken", token, {
      httpOnly: true, // Changez à false temporairement pour tester
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 semaine
      path: "/",
    });

    // Réponse après authentification avec les informations utilisateur nécessaires
    return {
      message: "Connexion réussie",
      token, // Ajout explicite du token dans la réponse
      user: {
        id: user[0].user_id,
        email: user[0].email,
        roles: userRoles,
        username: user[0].username,
      },
    };
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    return { error: "Erreur lors de la connexion." };
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});
