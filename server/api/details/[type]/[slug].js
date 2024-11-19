import { getConnection } from "../../db.config";

export default defineEventHandler(async (event) => {
  const { type, slug } = event.context.params;

  try {
    const connection = await getConnection();

    if (type === "word") {
      const [rows] = await connection.execute(
        `SELECT 
          w.singular, 
          w.plural, 
          w.phonetic, 
          w.root, 
          nc.class_name AS nominal_class,  
          w.derived_word, 
          w.derived_from_word, 
          w.derived_from_verb, 
          w.number_variability, 
          u.username AS author,  
          w.created_at,
          (SELECT GROUP_CONCAT(wm.meaning SEPARATOR ', ') 
           FROM word_meanings wm 
           WHERE wm.word_id = w.word_id AND wm.language_code = 'fr') AS translation_fr,
          (SELECT GROUP_CONCAT(wm.meaning SEPARATOR ', ') 
           FROM word_meanings wm 
           WHERE wm.word_id = w.word_id AND wm.language_code = 'en') AS translation_en,
          (SELECT GROUP_CONCAT(r.role_name SEPARATOR ', ')
           FROM roles r
           JOIN user_roles ur ON r.role_id = ur.role_id
           WHERE ur.user_id = u.user_id) AS roles -- Récupération des rôles de l'auteur
        FROM words w
        JOIN slugs s ON w.word_id = s.word_id -- Jointure avec la table slugs
        LEFT JOIN users u ON w.user_id = u.user_id  
        LEFT JOIN nominal_classes nc ON w.class_id = nc.class_id  
        WHERE s.slug = ?`, // Utilisation du slug depuis la table slugs
        [slug]
      );
      return rows.length ? rows[0] : {};
    }

    if (type === "verb") {
      const [rows] = await connection.execute(
        `SELECT 
          v.name, 
          v.phonetic, 
          v.root, 
          v.suffix,
          u.username AS author,  
          v.created_at,
          (SELECT GROUP_CONCAT(vm.meaning SEPARATOR ', ') 
           FROM verb_meanings vm 
           WHERE vm.verb_id = v.verb_id AND vm.language_code = 'fr') AS translation_fr,
          (SELECT GROUP_CONCAT(vm.meaning SEPARATOR ', ') 
           FROM verb_meanings vm 
           WHERE vm.verb_id = v.verb_id AND vm.language_code = 'en') AS translation_en,
          (SELECT GROUP_CONCAT(r.role_name SEPARATOR ', ')
           FROM roles r
           JOIN user_roles ur ON r.role_id = ur.role_id
           WHERE ur.user_id = u.user_id) AS roles -- Récupération des rôles de l'auteur
        FROM verbs v
        JOIN slugs s ON v.verb_id = s.verb_id -- Jointure avec la table slugs
        LEFT JOIN users u ON v.user_id = u.user_id  
        WHERE s.slug = ?`, // Utilisation du slug depuis la table slugs
        [slug]
      );
      return rows.length ? rows[0] : {};
    }

    await connection.end();
  } catch (error) {
    console.error("Erreur lors de la récupération des détails :", error);
    return { error: "Erreur lors de la récupération des détails." };
  }
});
