<template>
  <form
    @submit.prevent="submitSearch"
    role="search"
    aria-label="Formulaire de recherche"
  >
    <div class="input-group">
      <span class="input-group-text" aria-hidden="true">
        <i class="fas fa-search"></i>
      </span>
      <input
        type="text"
        v-model="searchQuery"
        class="form-control"
        :placeholder="`Rechercher en ${getLanguageName(selectedLanguage)}`"
        aria-label="Rechercher un terme"
        @input="submitSearch"
      />
      <select
        v-model="selectedLanguage"
        class="form-select"
        aria-label="Sélectionnez une langue"
        @change="submitSearch"
      >
        <option value="kikongo">Kikongo</option>
        <option value="fr">Français</option>
        <option value="en">Anglais</option>
      </select>
      <button
        type="button"
        class="btn btn-clear"
        aria-label="Effacer le formulaire"
        @click="clearForm"
      >
        <i class="fas fa-times"></i>
        Effacer
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";

const searchQuery = ref("");
const selectedLanguage = ref("kikongo");
const emit = defineEmits(["search"]);

// Soumettre la recherche
const submitSearch = () => {
  emit("search", {
    query: searchQuery.value,
    language: selectedLanguage.value,
  });
};

// Réinitialiser le formulaire
const clearForm = () => {
  searchQuery.value = "";
  selectedLanguage.value = "kikongo";
  submitSearch();
};

// Retourner le nom de la langue pour le placeholder
const getLanguageName = (language) => {
  switch (language) {
    case "kikongo":
      return "Kikongo";
    case "fr":
      return "Français";
    case "en":
      return "Anglais";
    default:
      return "Langue";
  }
};
</script>

<style scoped>
/* Bouton Effacer */
.btn-clear {
  background-color: var(--third-color);
  color: #fff;
  border: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-clear:hover {
  background-color: #d65a1d;
  transform: scale(1.05);
  cursor: pointer;
}

/* Icône de loupe */
.input-group-text {
  background-color: #fff;
  border-right: 0;
}

.input-group .form-control {
  border-left: 0;
}

/* Responsive design */
@media (max-width: 768px) {
  .input-group {
    flex-direction: column;
  }
  .input-group .form-control,
  .input-group .form-select,
  .input-group .btn-clear {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
