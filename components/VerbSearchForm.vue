<template>
  <form
    @submit.prevent="handleButtonSearch"
    role="search"
    aria-label="Formulaire de recherche de verbes"
  >
    <div class="input-group">
      <!-- Champ de recherche -->
      <label for="search-input" class="visually-hidden"
        >Recherche de verbes</label
      >
      <input
        id="search-input"
        type="text"
        v-model="searchQuery"
        class="form-control"
        :placeholder="`Rechercher un verbe en ${languageLabel}`"
        @input="submitSearch"
        aria-label="Champ de recherche de verbes"
      />

      <!-- Sélecteur de langue -->
      <label for="language-select" class="visually-hidden"
        >Langue de recherche</label
      >
      <select
        id="language-select"
        v-model="selectedLanguage"
        class="form-select"
        aria-label="Sélection de la langue"
        @change="submitSearch"
      >
        <option value="kikongo">Kikongo</option>
        <option value="fr">Français</option>
        <option value="en">Anglais</option>
      </select>

      <!-- Bouton "Rechercher" -->
      <button type="button" class="btn btn-primary" @click="handleButtonSearch">
        Rechercher
      </button>

      <!-- Bouton "Effacer" -->
      <button
        type="button"
        class="btn btn-clear"
        @click="clearForm"
        aria-label="Effacer la recherche"
      >
        Effacer
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from "vue";

const searchQuery = ref(""); // Champ de recherche
const selectedLanguage = ref("kikongo"); // Langue par défaut : Kikongo

const emit = defineEmits(["search"]);

// Fonction pour la recherche via le bouton "Rechercher"
const handleButtonSearch = () => {
  if (searchQuery.value.trim() !== "") {
    emit("search", {
      query: searchQuery.value,
      language: selectedLanguage.value,
      mode: "strict", // Mode strict pour le bouton Rechercher
    });
  }
};

// Fonction pour la recherche automatique
const submitSearch = () => {
  emit("search", {
    query: searchQuery.value,
    language: selectedLanguage.value,
    mode: "auto", // Mode automatique pour les saisies
  });
};

// Fonction pour réinitialiser le formulaire
const clearForm = () => {
  searchQuery.value = ""; // Vide le champ de recherche
  selectedLanguage.value = "kikongo"; // Remet la langue par défaut
  submitSearch(); // Relance une recherche avec le formulaire vide
};

// Libellé de la langue pour le placeholder
const languageLabel = computed(() => {
  switch (selectedLanguage.value) {
    case "kikongo":
      return "Kikongo";
    case "fr":
      return "Français";
    case "en":
      return "Anglais";
    default:
      return "";
  }
});
</script>

<style scoped>
/* Utilisation des variables CSS pour les couleurs */

/* Styles pour le bouton Effacer */
.btn-effacer {
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  background-color: transparent;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-effacer:hover {
  background-color: var(--primary-color);
  color: #fff;
  cursor: pointer;
}

/* Styles pour l'input group */
.input-group {
  display: flex;
  align-items: stretch;
}

.form-control,
.form-select {
  flex: 1;
}

.form-select {
  max-width: 150px;
}

@media (max-width: 576px) {
  .input-group {
    flex-direction: column;
  }

  .form-control,
  .form-select,
  .btn-effacer {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .btn-effacer {
    margin-bottom: 0;
  }
}

/* Visually hidden class for accessibility */
.visually-hidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
</style>
