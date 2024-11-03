/*import slugify from "slugify";

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
*/
// scripts/generate-pending-slugs.js
import slugify from "slugify";

export async function generatePendingSubmissionSlug(connection, base) {
  let slug = slugify(base, { lower: true, strict: true });
  let suffix = 0;
  let uniqueSlug = slug;

  while (true) {
    const [wordRows] = await connection.execute(
      `SELECT COUNT(*) AS count FROM pending_words_slugs WHERE slug = ?`,
      [uniqueSlug]
    );

    const [verbRows] = await connection.execute(
      `SELECT COUNT(*) AS count FROM pending_verbs_slugs WHERE slug = ?`,
      [uniqueSlug]
    );

    if (wordRows[0].count === 0 && verbRows[0].count === 0) {
      break;
    }

    suffix += 1;
    uniqueSlug = `${slug}-${suffix}`;
  }

  return uniqueSlug;
}
