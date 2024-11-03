<template>
  <div class="container mt-5 form-container">
    <h2 class="text-center mb-4">Modifier la Soumission du Verbe</h2>
    <form @submit.prevent="submitEdit" class="edit-form shadow-sm p-4 rounded">
      <div class="mb-3">
        <label for="name" class="form-label">Nom (Verbe)</label>
        <input
          v-model="formData.name"
          type="text"
          class="form-control"
          id="name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="root" class="form-label">Racine</label>
        <input
          v-model="formData.root"
          type="text"
          class="form-control"
          id="root"
        />
      </div>
      <div class="mb-3">
        <label for="suffix" class="form-label">Suffixe</label>
        <input
          v-model="formData.suffix"
          type="text"
          class="form-control"
          id="suffix"
        />
      </div>
      <div class="mb-3">
        <label for="phonetic" class="form-label">Phonétique</label>
        <input
          v-model="formData.phonetic"
          type="text"
          class="form-control"
          id="phonetic"
        />
      </div>

      <!-- Champs de traduction dynamiques avec sélection de langue -->
      <div
        v-for="(translation, index) in formData.translations.filter(
          (t) => t.action !== 'delete'
        )"
        :key="index"
        class="mb-3"
      >
        <label :for="'translation-' + index" class="form-label">
          Traduction ({{ translation.language_code.toUpperCase() }})
        </label>
        <div class="input-group">
          <select
            v-model="translation.language_code"
            class="form-select"
            style="max-width: 80px"
          >
            <option disabled value="">Langue</option>
            <option value="fr">FR</option>
            <option value="en">EN</option>
          </select>
          <input
            v-model="translation.meaning"
            type="text"
            :id="'translation-' + index"
            class="form-control"
            placeholder="Traduction"
          />
          <button
            type="button"
            class="btn btn-danger"
            @click="removeTranslation(index)"
          >
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>

      <!-- Bouton pour ajouter une nouvelle traduction -->
      <div class="d-flex justify-content-between align-items-center mt-3">
        <button type="button" class="btn btn-secondary" @click="addTranslation">
          <i class="fas fa-plus-circle"></i> Ajouter une Traduction
        </button>
      </div>

      <button type="submit" class="btn btn-primary mt-4 w-100">
        Enregistrer les Modifications
      </button>
    </form>
    <p v-if="message" class="mt-3 text-center" :class="messageClass">
      {{ message }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

// Initialisations
const route = useRoute();
const router = useRouter();
const formData = ref({
  name: "",
  root: "",
  suffix: "",
  phonetic: "",
  translations: [],
});
const message = ref("");
const messageClass = ref("");

// Récupération des données du verbe via le slug
const fetchVerbSubmission = async () => {
  try {
    const response = await fetch(
      `/api/pending-verb-submission/${route.params.slug}`
    );
    if (!response.ok) throw new Error("Erreur de récupération du verbe.");
    const data = await response.json();

    formData.value = {
      name: data.name,
      root: data.root,
      suffix: data.suffix,
      phonetic: data.phonetic,
      translations: data.translations.map((translation) => ({
        id: translation.id, // Utilisation de 'id' pour les traductions en attente
        language_code: translation.language_code,
        meaning: translation.meaning,
        action: "update", // Action par défaut "update" pour les traductions existantes
      })),
    };
    console.log(
      "Traductions après modification :",
      formData.value.translations
    );
  } catch (error) {
    console.error("Erreur:", error);
  }
};
const submitEdit = async () => {
  try {
    // Séparez les actions pour plus de clarté
    const translationsToSubmit = formData.value.translations.map(
      (translation) => {
        return {
          id: translation.id,
          language_code: translation.language_code,
          meaning: translation.meaning,
          action: translation.action,
        };
      }
    );

    console.log("Traductions prêtes à l'envoi:", translationsToSubmit);

    const response = await fetch(
      `/api/pending-verb-submission/${route.params.slug}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData.value,
          translations: translationsToSubmit,
          content_type: "verb",
        }),
      }
    );

    const result = await response.json();
    if (response.ok) {
      message.value = "Modifications enregistrées avec succès.";
      messageClass.value = "alert alert-success";
      setTimeout(() => router.push("/admin/manage-submissions"), 2000);
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    message.value = error.message || "Une erreur est survenue.";
    messageClass.value = "alert alert-danger";
  }
};

/*
const submitEdit = async () => {
  try {
    // Inclure uniquement les traductions ayant une action "add", "update" ou "delete"
    const translationsToSubmit = formData.value.translations.filter(
      (translation) =>
        translation.action === "add" ||
        translation.action === "update" ||
        (translation.action === "delete" && translation.id) // garder les ID pour les suppressions
    );

    console.log("Traductions prêtes à l'envoi:", translationsToSubmit); // Debugging log

    // Effectuer la requête PUT
    const response = await fetch(
      `/api/pending-verb-submission/${route.params.slug}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData.value,
          translations: translationsToSubmit,
          content_type: "verb",
        }),
      }
    );

    const result = await response.json();
    if (response.ok) {
      message.value = "Modifications enregistrées avec succès.";
      messageClass.value = "alert alert-success";
      setTimeout(() => router.push("/admin/manage-submissions"), 2000);
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    message.value = error.message || "Une erreur est survenue.";
    messageClass.value = "alert alert-danger";
  }
};
*/
// Soumission des modifications
/*const submitEdit = async () => {
  try {
    // Prépare les traductions pour l'envoi au backend, en incluant les actions (add, update, delete)
    const translationsToSubmit = formData.value.translations.filter(
      (translation) =>
        translation.action !== "delete" || translation.translation_id
    );

    // Effectue la requête PUT pour envoyer les modifications
    const response = await fetch(
      `/api/pending-verb-submission/${route.params.slug}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData.value,
          translations: translationsToSubmit,
          content_type: "verb",
        }),
      }
    );

    const result = await response.json();
    if (response.ok) {
      message.value = "Modifications enregistrées avec succès.";
      messageClass.value = "alert alert-success";
      setTimeout(() => router.push("/admin/manage-submissions"), 2000);
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    message.value = error.message || "Une erreur est survenue.";
    messageClass.value = "alert alert-danger";
  }
};*/

/*const submitEdit = async () => {
  try {
    // Filtre les traductions pour inclure uniquement celles à ajouter, mettre à jour ou supprimer
    const translationsToSubmit = formData.value.translations.map(
      (translation) => ({
        ...translation,
        translation_id: translation.id, // Si le backend attend `translation_id`
      })
    );

    const response = await fetch(
      `/api/pending-verb-submission/${route.params.slug}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData.value,
          translations: translationsToSubmit,
          content_type: "verb",
        }),
      }
    );
    console.log("Données envoyées au backend :", {
      ...formData.value,
      translations: formData.value.translations.filter(
        (t) => t.action !== "delete" || t.id
      ),
    });

    const result = await response.json();
    if (response.ok) {
      message.value = "Modifications enregistrées avec succès.";
      messageClass.value = "alert alert-success";
      setTimeout(() => router.push("/admin/manage-submissions"), 2000);
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    message.value = error.message || "Une erreur est survenue.";
    messageClass.value = "alert alert-danger";
  }
};
*/
// Fonction pour ajouter une nouvelle traduction
const addTranslation = () => {
  formData.value.translations.push({
    language_code: "",
    meaning: "",
    action: "add", // Marque comme "add" pour les nouvelles traductions
  });
};

// Fonction pour supprimer ou marquer une traduction pour suppression
const removeTranslation = (index) => {
  console.log(`Suppression de la traduction à l'index ${index}`); // Vérification du déclenchement
  const translation = formData.value.translations[index];

  if (translation.id) {
    // Marque comme "delete" pour les traductions existantes
    translation.action = "delete";
  } else {
    // Supprime directement pour les nouvelles traductions
    formData.value.translations.splice(index, 1);
  }

  // Forcer la réactivité en recréant le tableau
  formData.value.translations = [...formData.value.translations];
  console.log(
    "Liste des traductions après suppression :",
    formData.value.translations
  );
};

onMounted(fetchVerbSubmission);
</script>


<style scoped>
.container {
  max-width: 600px;
}
.form-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}
.edit-form {
  background-color: #ffffff;
}
.form-control {
  border-radius: 5px;
}
.btn-primary {
  background-color: #007bff;
  border: none;
  font-weight: bold;
}
.alert {
  text-align: center;
}
.input-group-text {
  border-radius: 5px;
}
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
  .edit-form {
    padding: 20px;
  }
}
</style>
