<template>
  <form
    @submit.prevent="handleButtonSearch"
    role="search"
    aria-label="Formulaire de recherche"
  >
    <div class="input-group">
      <label for="search-input" class="visually-hidden">Recherche</label>
      <input
        id="search-input"
        type="text"
        v-model="searchQuery"
        class="form-control"
        :placeholder="`Rechercher en ${languageLabel}`"
        @input="submitSearch"
        aria-label="Champ de recherche"
      />

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

      <button
        type="button"
        class="btn btn-primary"
        @click="handleButtonSearch"
        aria-label="Rechercher"
      >
        Rechercher
      </button>

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

const searchQuery = ref("");
const selectedLanguage = ref("kikongo"); // Langue par défaut

const emit = defineEmits(["search"]);

// Fonction pour gérer la recherche stricte avec le bouton "Rechercher"
const handleButtonSearch = () => {
  if (searchQuery.value.trim() !== "") {
    emit("search", {
      query: searchQuery.value,
      language: selectedLanguage.value,
      mode: "strict", // Recherche stricte
    });
  }
};

// Fonction pour soumettre la recherche automatiquement
const submitSearch = () => {
  emit("search", {
    query: searchQuery.value,
    language: selectedLanguage.value,
    mode: "auto", // Recherche automatique
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
/* Styles pour le bouton Effacer */
.btn-clear {
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  background-color: transparent;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-clear:hover {
  background-color: var(--primary-color);
  color: #fff;
  cursor: pointer;
}

/* Styles pour le bouton Rechercher */
.btn-primary {
  margin-left: 0.5rem;
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-primary:hover {
  background-color: var(--hover-primary);
  color: #fff;
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
  .btn-clear,
  .btn-primary {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .btn-clear,
  .btn-primary {
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
