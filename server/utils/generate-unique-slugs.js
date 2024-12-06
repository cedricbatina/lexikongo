// Importation de slugify
import slugify from "slugify";

/**
 * Génère un slug unique pour une base donnée.
 *
 * @param {Object} connection - Connexion à la base de données MySQL.
 * @param {string} base - Texte de base pour générer le slug.
 * @returns {Promise<string>} - Slug unique généré.
 */
export async function generateUniqueSlug(connection, base) {
  try {
    if (!slugify) {
      throw new Error("La bibliothèque slugify n'est pas définie.");
    }

    // Normalisation et génération initiale du slug
    let slug = slugify(base, { lower: true, strict: true });
    let suffix = 0;
    let uniqueSlug = slug;

    console.log("Slug initial généré :", slug); // Debugging

    while (true) {
      // Vérifie si le slug existe déjà dans la base de données
      const [rows] = await connection.execute(
        `SELECT COUNT(*) AS count FROM slugs WHERE slug = ?`,
        [uniqueSlug]
      );

      console.log("Vérification du slug :", uniqueSlug, rows[0].count); // Debugging

      if (rows[0].count === 0) break;

      // Ajoute un suffixe si le slug existe déjà
      suffix += 1;
      uniqueSlug = `${slug}-${suffix}`;
    }

    return uniqueSlug;
  } catch (error) {
    console.error("Erreur dans generateUniqueSlug :", error.message || error);
    throw new Error("Erreur lors de la génération d'un slug unique.");
  }
}
