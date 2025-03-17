/*import bcrypt from "bcrypt";
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
});*/
/*
import { eventHandler, readBody, sendError } from "h3";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcrypt"; // Importer bcrypt pour le hachage des mots de passe
import { getConnection } from "./db.config"; // Adapter pour ta connexion à la base de données

export default eventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { username, email, password } = body;

    // Générer un token unique pour la vérification
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Hacher le mot de passe avant de l'insérer dans la base de données
    const hashedPassword = await bcrypt.hash(password, 10); // 10 correspond au nombre de "salts" (niveaux de complexité du hachage)

    // Insérer l'utilisateur dans la base de données avec le mot de passe haché et le token de vérification
    const connection = await getConnection();
    await connection.execute(
      `INSERT INTO users (username, email, password, verification_token) VALUES (?, ?, ?, ?)`,
      [username, email, hashedPassword, verificationToken] // Utilisation du mot de passe haché
    );
    await connection.end();

    // Configurer nodemailer avec Brevo
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER, // Utilisateur SMTP (Brevo)
        pass: process.env.SMTP_PASS, // Mot de passe SMTP (Brevo)
      },
      debug: true,
      logger: true,
    });

    // Lien de confirmation (assurez-vous que l'URL est correcte pour votre projet)
    const confirmationUrl = `http://localhost:3000/verify-email?token=${verificationToken}`;

    // Configuration de l'e-mail
    const mailOptions = {
      from: process.env.EMAIL_FROM, // Adresse de l'expéditeur (vérifiée sur Brevo)
      to: email, // Adresse de l'utilisateur à qui envoyer l'e-mail
      subject: "Confirmez votre inscription",
      text: `Bonjour ${username},\n\nVeuillez confirmer votre inscription en cliquant sur ce lien : ${confirmationUrl}`,
    };

    // Envoi de l'e-mail
    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Email de confirmation envoyé avec succès !",
    };
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    return sendError(event, {
      statusCode: 500,
      statusMessage: "Erreur lors de l'inscription.",
      message: error.message,
    });
  }
});
*/
import { eventHandler, readBody, sendError } from "h3";
import bcrypt from "bcrypt";
import { getConnection } from "./db.config";
import { generateVerificationToken } from "../utils/token";
import { sendEmail } from "../utils/mailer";

export default eventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { username, email, password } = body;

    const connection = await getConnection();

    // Vérifier si l'email ou le username existe déjà
    const [existingUser] = await connection.execute(
      `SELECT username, email FROM users WHERE username = ? OR email = ?`,
      [username, email]
    );
    if (existingUser.length > 0) {
      await connection.end();
      const duplicateField =
        existingUser[0].email === email ? "email" : "username";
      return sendError(event, {
        statusCode: 400,
        statusMessage: `Cet ${duplicateField} est déjà utilisé.`,
      });
    }

    // Générer un token et hacher le mot de passe
    const verificationToken = generateVerificationToken();
    const hashedPassword = await bcrypt.hash(password, 10);
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // Expire dans 24 heures

    // Insérer l'utilisateur dans la base de données
    await connection.execute(
      `INSERT INTO users (username, email, password, verification_token, token_expiry, email_verified) VALUES (?, ?, ?, ?, ?, ?)`,
      [username, email, hashedPassword, verificationToken, tokenExpiry, 0]
    );
    await connection.end();

    // URL de confirmation
    const confirmationUrl = `${process.env.APP_URL}/verify-email?token=${verificationToken}`;

    // Envoyer l'email de confirmation
    await sendEmail({
      to: email,
      subject: "Confirmez votre inscription",
      html: `
        <p>Bonjour ${username},</p>
        <p>Veuillez confirmer votre inscription en cliquant sur le lien ci-dessous :</p>
        <a href="${confirmationUrl}" target="_blank">Confirmer mon inscription</a>
      `,
    });

    return {
      success: true,
      message: "Email de confirmation envoyé avec succès !",
    };
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    if (!process.env.APP_URL) {
      throw new Error(
        "APP_URL n'est pas défini dans les variables d'environnement."
      );
    }

    return sendError(event, {
      statusCode: 500,
      statusMessage: "Erreur lors de l'inscription.",
      message: error.message,
    });
  }
});
