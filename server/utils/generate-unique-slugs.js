import slugify from "slugify";

export async function generateUniqueSlug(connection, base) {
  let slug = slugify(base, { lower: true, strict: true });
  let suffix = 0;
  let uniqueSlug = slug;

  while (true) {
    const [rows] = await connection.execute(
      `SELECT COUNT(*) AS count FROM slugs WHERE slug = ?`,
      [uniqueSlug]
    );

    if (rows[0].count === 0) break;

    suffix += 1;
    uniqueSlug = `${slug}-${suffix}`;
  }

  return uniqueSlug;
}
