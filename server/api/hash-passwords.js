import bcrypt from "bcrypt";
import { getConnection } from "./db.config.js"; // ou ton fichier de configuration pour la base de données

async function hashPasswords() {
  const connection = await getConnection();

  const usersToUpdate = [
    { user_id: 4, password: "Elijahbatina@2008" },
    { user_id: 5, password: "Elijahbatina@2008" },
  ];

  for (const user of usersToUpdate) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await connection.execute(
      `UPDATE users SET password = ? WHERE user_id = ?`,
      [hashedPassword, user.user_id]
    );
  }

  console.log("Les mots de passe ont été mis à jour.");
  await connection.end();
}

hashPasswords().catch(console.error);
