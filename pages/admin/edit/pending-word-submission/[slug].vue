<template>
  <div class="container mt-5 form-container">
    <h2 class="text-center mb-4">Modifier la Soumission du Mot</h2>
    <form @submit.prevent="submitEdit" class="edit-form shadow-sm p-4 rounded">
      <div class="mb-3">
        <label for="singular" class="form-label">Singulier</label>
        <input
          v-model="formData.singular"
          type="text"
          class="form-control"
          id="singular"
          required
        />
      </div>
      <div class="mb-3">
        <label for="plural" class="form-label">Pluriel</label>
        <input
          v-model="formData.plural"
          type="text"
          class="form-control"
          id="plural"
        />
      </div>
      <div class="mb-3">
        <label for="class_id" class="form-label">Classe Nominale</label>
        <select v-model="formData.class_id" class="form-select" id="class_id">
          <option
            v-for="cls in nominalClasses"
            :key="cls.class_id"
            :value="cls.class_id"
          >
            {{ cls.class_name }}
          </option>
        </select>
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
        v-for="(translation, index) in formData.translations"
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

const route = useRoute();
const router = useRouter();
const formData = ref({
  singular: "",
  plural: "",
  class_id: null,
  phonetic: "",
  translations: [], // Gestion des traductions en attente
});
const nominalClasses = ref([]);
const message = ref("");
const messageClass = ref("");

// Fonction pour récupérer les données du mot via le slug
const fetchWordSubmission = async () => {
  try {
    const response = await fetch(
      `/api/pending-word-submission/${route.params.slug}`
    );
    if (!response.ok) throw new Error("Erreur de récupération du mot.");

    const data = await response.json();
    console.log("Données complètes reçues dans fetchWordSubmission:", data);

    formData.value = {
      singular: data.singular,
      plural: data.plural,
      class_id: data.class_id,
      phonetic: data.phonetic,
      translations: data.translations.map((translation) => ({
        id: translation.id, // Utilisation de 'id' pour les traductions en attente
        language_code: translation.language_code,
        meaning: translation.meaning,
        action: "update",
      })),
    };

    // Affectation des classes nominales
    nominalClasses.value = data.nominalClasses || (await fetchNominalClasses());
  } catch (error) {
    console.error("Erreur:", error);
  }
};

// Fonction séparée pour récupérer les classes nominales
const fetchNominalClasses = async () => {
  try {
    const response = await fetch("/api/nominal-classes");
    if (!response.ok)
      throw new Error("Erreur de récupération des classes nominales.");
    return await response.json();
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des classes nominales:",
      error
    );
  }
};

// Fonction pour envoyer la mise à jour
const submitEdit = async () => {
  if (!formData.value.class_id) {
    message.value = "Veuillez sélectionner une classe nominale.";
    messageClass.value = "alert alert-danger";
    return;
  }

  // Filtrage des traductions et ajout des actions correctes
  const translations = formData.value.translations.map((translation) => {
    if (!translation.id) translation.action = "add"; // Assigner `add` si l'ID est absent
    return translation;
  });

  console.log("Données envoyées pour la mise à jour :", {
    ...formData.value,
    translations,
  });

  try {
    const response = await fetch(
      `/api/pending-word-submission/${route.params.slug}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData.value,
          translations,
          content_type: "word",
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

// Fonction pour ajouter une nouvelle traduction
const addTranslation = () => {
  formData.value.translations.push({
    language_code: "",
    meaning: "",
    action: "add", // Définir l'action comme "add" pour les nouvelles traductions
  });
};

// Fonction pour marquer une traduction pour suppression
const removeTranslation = (index) => {
  const translation = formData.value.translations[index];
  if (translation.id) {
    translation.action = "delete"; // Marque comme "delete" si l'ID existe
  } else {
    formData.value.translations.splice(index, 1); // Supprime directement pour les nouvelles traductions
  }
};

onMounted(fetchWordSubmission);
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
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
  .edit-form {
    padding: 20px;
  }
}
</style>
