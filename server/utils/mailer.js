import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Envoie un email.
 * @param {Object} options - Les options de l'email.
 * @param {string} options.to - L'adresse email du destinataire.
 * @param {string} options.subject - Le sujet de l'email.
 * @param {string} options.html - Le contenu HTML de l'email.
 * @param {string} [options.text] - Le contenu texte brut (optionnel).
 * @returns {Promise<void>} - Une promesse qui se résout si l'email est envoyé avec succès.
 */
export const sendEmail = async ({ to, subject, html, text }) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email envoyé à ${to}`);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    throw new Error("Impossible d'envoyer l'email.");
  }
};
