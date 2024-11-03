<template>
  <div class="card shadow-sm contributor-card">
    <div class="card-body">
      <h5 class="card-title">
        <i class="fas fa-language me-2"></i> Soumettre un verbe
      </h5>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="name" class="form-label">Verbe (infinitif)</label>
          <input
            type="text"
            class="form-control"
            v-model="formData.name"
            required
          />
        </div>

        <div class="mb-3">
          <label for="phonetic" class="form-label">Phonétique</label>
          <input type="text" class="form-control" v-model="formData.phonetic" />
        </div>

        <div class="mb-3">
          <label for="root" class="form-label"
            >Racine du verbe (optionnel)</label
          >
          <input type="text" class="form-control" v-model="formData.root" />
        </div>

        <div class="mb-3">
          <label for="suffix" class="form-label">Suffixe (optionnel)</label>
          <input type="text" class="form-control" v-model="formData.suffix" />
        </div>

        <div class="mb-3">
          <label for="translation_fr" class="form-label"
            >Traduction en Français</label
          >
          <input
            type="text"
            class="form-control"
            v-model="formData.translation_fr"
            required
          />
        </div>

        <div class="mb-3">
          <label for="translation_en" class="form-label"
            >Traduction en Anglais</label
          >
          <input
            type="text"
            class="form-control"
            v-model="formData.translation_en"
          />
        </div>

        <button type="submit" class="btn btn-submit">
          <i class="fas fa-paper-plane"></i> Soumettre le verbe
        </button>
      </form>

      <!-- Message de retour -->
      <div v-if="message" class="alert mt-3" :class="messageClass">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "~/stores/authStore";

const authStore = useAuthStore();
const formData = ref({
  name: "",
  phonetic: "",
  root: "",
  suffix: "",
  translation_fr: "",
  translation_en: "",
});
const message = ref("");
const messageClass = ref("");

const submitForm = async () => {
  if (!formData.value.name || !formData.value.translation_fr) {
    message.value = "Le verbe et la traduction en français sont obligatoires.";
    messageClass.value = "alert-danger";
    return;
  }

  const userId = authStore.userId;
  if (!userId) {
    message.value = "Veuillez vous connecter pour soumettre un verbe.";
    messageClass.value = "alert-danger";
    return;
  }

  const dataToSubmit = {
    name: formData.value.name,
    phonetic: formData.value.phonetic,
    root: formData.value.root || null,
    suffix: formData.value.suffix || null,
    user_id: userId,
    translations: [
      { language_code: "fr", meaning: formData.value.translation_fr },
      { language_code: "en", meaning: formData.value.translation_en },
    ],
  };

  try {
    const response = await fetch("/api/words", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSubmit),
    });

    const result = await response.json();

    if (response.ok) {
      message.value = "Verbe soumis avec succès, en attente de validation.";
      messageClass.value = "alert-success";
      formData.value = {
        name: "",
        phonetic: "",
        root: "",
        suffix: "",
        translation_fr: "",
        translation_en: "",
      };
    } else {
      message.value = result.error || "Erreur lors de la soumission du verbe.";
      messageClass.value = "alert-danger";
    }
  } catch (error) {
    console.error("Erreur :", error);
    message.value = "Erreur lors de la soumission du verbe.";
    messageClass.value = "alert-danger";
  }
};
</script>




<style scoped>
.contributor-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 24px;
  color: #007bff;
}

.btn-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #28a745;
  background-color: transparent;
  color: #28a745;
  font-weight: bold;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
}

.btn-submit:hover {
  background-color: #28a745;
  color: #fff;
}

.btn-submit i {
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  .btn-submit {
    width: 100%;
  }
}
</style>
