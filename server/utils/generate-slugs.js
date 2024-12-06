// scripts/generate-slugs.js
import { getConnection } from "./db.config";

import mysql from "mysql2/promise";
import slugify from "slugify";

// Informations de connexion à la base de données
const dbConfig = {
  host: "localhost", // Remplacez par votre hôte si différent
  user: "cedricbatina", // Votre nom d'utilisateur MySQL
  password: "Elijahbatina2008", // Votre mot de passe MySQL
  database: "lexikongo", // Remplacez par le nom réel de votre base de données
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Fonction pour générer des slugs pour les verbes
const generateSlugsForVerbs = async () => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log("Connexion à la base de données réussie.");

    // Récupérer tous les verbes sans slug
    const [verbs] = await connection.execute(
      "SELECT verb_id, name FROM verbs WHERE slug IS NULL OR slug = ''"
    );

    console.log(`Nombre de verbes sans slug trouvés : ${verbs.length}`);

    for (const verb of verbs) {
      // Générer le slug à partir du nom
      let baseSlug = slugify(verb.name, { lower: true, strict: true });
      let slug = baseSlug;
      let count = 1;

      // Vérifier l'unicité du slug
      while (true) {
        const [existing] = await connection.execute(
          "SELECT verb_id FROM verbs WHERE slug = ?",
          [slug]
        );
        if (existing.length === 0) break;
        slug = `${baseSlug}-${count}`;
        count++;
      }

      // Mettre à jour le verbe avec le slug unique
      await connection.execute("UPDATE verbs SET slug = ? WHERE verb_id = ?", [
        slug,
        verb.verb_id,
      ]);

      console.log(`Slug généré pour le verbe ID ${verb.verb_id} : ${slug}`);
    }

    console.log("Génération des slugs pour les verbes terminée.");
  } catch (error) {
    console.error("Erreur lors de la génération des slugs :", error);
  } finally {
    if (connection) {
      await connection.end();
      console.log("Connexion à la base de données fermée.");
    }
  }
};

// Fonction pour générer des slugs pour les mots
const generateSlugsForWords = async () => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log("Connexion à la base de données réussie.");

    // Récupérer tous les mots sans slug
    const [words] = await connection.execute(
      "SELECT word_id, singular FROM words WHERE slug IS NULL OR slug = ''"
    );

    console.log(`Nombre de mots sans slug trouvés : ${words.length}`);

    for (const word of words) {
      // Générer le slug à partir du singulier
      let baseSlug = slugify(word.singular, { lower: true, strict: true });
      let slug = baseSlug;
      let count = 1;

      // Vérifier l'unicité du slug
      while (true) {
        const [existing] = await connection.execute(
          "SELECT word_id FROM words WHERE slug = ?",
          [slug]
        );
        if (existing.length === 0) break;
        slug = `${baseSlug}-${count}`;
        count++;
      }

      // Mettre à jour le mot avec le slug unique
      await connection.execute("UPDATE words SET slug = ? WHERE word_id = ?", [
        slug,
        word.word_id,
      ]);

      console.log(`Slug généré pour le mot ID ${word.word_id} : ${slug}`);
    }

    console.log("Génération des slugs pour les mots terminée.");
  } catch (error) {
    console.error("Erreur lors de la génération des slugs :", error);
  } finally {
    if (connection) {
      await connection.end();
      console.log("Connexion à la base de données fermée.");
    }
  }
};

// Exécuter les deux fonctions
(async () => {
  await generateSlugsForVerbs();
  await generateSlugsForWords();
})();
