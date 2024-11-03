import { getConnection } from "./db.config";

export default defineEventHandler(async (event) => {
  try {
    const connection = await getConnection();

    const [results] = await connection.execute(
      `SELECT nc.class_id, nc.class_name, 
              GROUP_CONCAT(s.slug ORDER BY w.singular SEPARATOR ', ') AS words 
        FROM nominal_classes nc
        LEFT JOIN words w ON nc.class_id = w.class_id
        LEFT JOIN slugs s ON w.word_id = s.word_id -- Jointure avec la table slugs
        GROUP BY nc.class_id, nc.class_name
        ORDER BY nc.class_name;`
    );

    await connection.end();
    return results;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des classes nominales:",
      error
    );
    return { error: "Erreur lors de la récupération des classes nominales." };
  }
});
