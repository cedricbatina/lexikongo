<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h5 class="card-title">Ajouter un verbe</h5>
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

        <button type="submit" class="btn btn-primary">Ajouter le verbe</button>
      </form>

      <!-- Feedback message -->
      <div v-if="message" class="alert mt-3" :class="messageClass">
        {{ message }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useAuthStore } from "~/stores/authStore"; // Import the auth store to get user info

const authStore = useAuthStore(); // Access the auth store

const formData = ref({
  name: "",
  phonetic: "",
  root: "", // Optional
  suffix: "", // Optional
  translation_fr: "",
  translation_en: "",
});

const message = ref(""); // Feedback message for the user
const messageClass = ref(""); // CSS class for feedback message

const submitForm = async () => {
  if (!formData.value.name || !formData.value.translation_fr) {
    message.value = "Le verbe et la traduction en français sont obligatoires.";
    messageClass.value = "alert-danger";
    return;
  }

  // Check if the user is logged in
  const userId = authStore.userId; // Get the user ID from the store
  if (!userId) {
    message.value = "Veuillez vous connecter pour ajouter un verbe.";
    messageClass.value = "alert-danger";
    return;
  }

  // Structure the data for the API
  const dataToSubmit = {
    name: formData.value.name,
    phonetic: formData.value.phonetic,
    root: formData.value.root || null,
    suffix: formData.value.suffix || null,
    user_id: userId, // Include the user ID in the API call
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

    const result = await response.json(); // Parse response

    if (response.ok && result.success) {
      message.value = "Verbe ajouté avec succès !";
      messageClass.value = "alert-success";
      // Reset form data after success
      formData.value = {
        name: "",
        phonetic: "",
        root: "",
        suffix: "",
        translation_fr: "",
        translation_en: "",
      };
    } else {
      // Handle error response from API
      message.value = result.error || "Erreur lors de l'ajout du verbe.";
      messageClass.value = "alert-danger";
    }
  } catch (error) {
    console.error("Erreur :", error);
    message.value = "Erreur lors de l'ajout du verbe.";
    messageClass.value = "alert-danger";
  }
};
</script>

<style scoped>
/* Style for the card layout */
.card {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Style the form */
.form-label {
  font-weight: bold;
}

/* Button styles */
.btn-primary {
  background-color: #007bff;
  border: none;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}

/* Responsive design for tablets and below */
@media (max-width: 768px) {
  .card {
    max-width: 100%;
    padding: 15px;
    margin: 10px;
  }

  .form-control {
    font-size: 1rem;
  }

  .btn-primary {
    font-size: 1rem;
    padding: 10px 15px;
  }
}

/* Responsive design for smaller mobile screens */
@media (max-width: 576px) {
  .card {
    padding: 10px;
    margin: 5px;
  }

  .form-control {
    font-size: 0.875rem;
  }

  .btn-primary {
    font-size: 0.875rem;
    padding: 8px 10px;
  }
}
</style>
