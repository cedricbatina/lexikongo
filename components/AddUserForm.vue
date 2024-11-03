<template>
  <div class="card shadow-sm p-4">
    <div class="card-body">
      <h5 class="card-title text-center mb-4">Ajouter un utilisateur</h5>

      <!-- Message de confirmation ou d'erreur -->
      <transition name="fade">
        <div v-if="message.text" :class="['alert', message.class]">
          {{ message.text }}
        </div>
      </transition>

      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="username" class="form-label">Nom d'utilisateur</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="fas fa-user"></i>
            </span>
            <input
              type="text"
              class="form-control"
              v-model="formData.username"
              required
            />
          </div>
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="fas fa-envelope"></i>
            </span>
            <input
              type="email"
              class="form-control"
              v-model="formData.email"
              required
            />
          </div>
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Mot de passe</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="fas fa-lock"></i>
            </span>
            <input
              type="password"
              class="form-control"
              v-model="formData.password"
              required
            />
          </div>
        </div>

        <div class="mb-3">
          <label for="role" class="form-label">Rôle</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="fas fa-user-tag"></i>
            </span>
            <select v-model="formData.role" class="form-select" required>
              <option value="user">Utilisateur</option>
              <option value="admin">Administrateur</option>
              <option value="contributor">Contributeur</option>
            </select>
          </div>
        </div>

        <div class="text-center">
          <button
            type="submit"
            class="btn btn-primary w-100"
            :disabled="isSubmitting"
          >
            Ajouter l'utilisateur
          </button>
        </div>

        <!-- Spinner de chargement -->
        <div class="text-center mt-2">
          <span
            v-if="isSubmitting"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const formData = ref({
  username: "",
  email: "",
  password: "",
  role: "user",
});

const message = ref({
  text: "",
  class: "",
});

const isSubmitting = ref(false);

const submitForm = async () => {
  if (!formData.value.class_id) {
    alert("Veuillez sélectionner une classe nominale.");
    return;
  }

  console.log("Données envoyées :", formData.value);

  try {
    const newWord = {
      singular: formData.value.singular,
      plural: formData.value.plural,
      phonetic: formData.value.phonetic,
      class_id: formData.value.class_id,
      translations: [
        {
          language_code: "fr",
          meaning: formData.value.translation_fr,
        },
        {
          language_code: "en",
          meaning: formData.value.translation_en,
        },
      ],
    };

    const response = await fetch("/api/words", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWord),
    });

    if (response.ok) {
      alert("Mot ajouté avec succès !");
      formData.value = {
        singular: "",
        plural: "",
        phonetic: "",
        class_id: "",
        translation_fr: "",
        translation_en: "",
      };
    } else {
      const errorData = await response.json();
      alert("Erreur lors de l'ajout du mot : " + errorData.error);
    }
  } catch (error) {
    console.error("Erreur :", error);
    alert("Une erreur est survenue.");
  }
};
</script>

<style scoped>
.card {
  max-width: 600px;
  margin: auto;
  border-radius: 10px;
}

.alert {
  margin-top: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.btn-primary {
  background-color: #ff8a1d;
  border: none;
  padding: 10px;
  color: white;
}

.input-group-text {
  background-color: #007bff;
  color: white;
}
.fas {
  color: white;
}
</style>
