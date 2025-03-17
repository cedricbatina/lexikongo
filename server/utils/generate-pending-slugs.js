import slugify from "slugify";

async function generatePendingSubmissionSlug(connection, base) {
  let slug = slugify(base, { lower: true, strict: true });
  let uniqueSlug = slug;
  let suffix = 0;

  while (true) {
    const [pendingWords] = await connection.execute(
      `SELECT COUNT(*) AS count FROM pending_words_slugs WHERE slug = ?`,
      [uniqueSlug]
    );

    const [pendingVerbs] = await connection.execute(
      `SELECT COUNT(*) AS count FROM pending_verbs_slugs WHERE slug = ?`,
      [uniqueSlug]
    );

    if (pendingWords[0].count === 0 && pendingVerbs[0].count === 0) {
      break; // Slug unique trouvé
    }

    suffix += 1;
    uniqueSlug = `${slug}-${suffix}`;
  }

  return uniqueSlug;
}

export { generatePendingSubmissionSlug };
/*
// scripts/generate-pending-slugs.jsimport slugify from "slugify";
import slugify from "slugify"; // Import slugify at the top

export async function generatePendingSubmissionSlug(connection, base) {
  let slug = slugify(base, { lower: true, strict: true });
  let suffix = 0;
  let uniqueSlug = slug;

  while (true) {
    // Vérifier si le slug existe dans plusieurs tables de soumissions en attente
    const [pendingCoursesRows] = await connection.execute(
      `SELECT COUNT(*) AS count FROM pending_courses_slugs WHERE slug = ?`,
      [uniqueSlug]
    );

    const [pendingArticlesRows] = await connection.execute(
      `SELECT COUNT(*) AS count FROM pending_articles_slugs WHERE slug = ?`,
      [uniqueSlug]
    );

    const [pendingProductsRows] = await connection.execute(
      `SELECT COUNT(*) AS count FROM pending_products_slugs WHERE slug = ?`,
      [uniqueSlug]
    );

    if (
      pendingCoursesRows[0].count === 0 &&
      pendingArticlesRows[0].count === 0 &&
      pendingProductsRows[0].count === 0
    ) {
      break;
    }

    suffix += 1;
    uniqueSlug = `${slug}-${suffix}`;
  }

  return uniqueSlug;
}
*/
