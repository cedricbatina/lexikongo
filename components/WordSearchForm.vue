<template>
  <form role="search" aria-label="Formulaire de recherche">
    <div class="input-group">
      <!-- Champ de recherche -->
      <label for="search-input" class="visually-hidden">Recherche</label>
      <input
        id="search-input"
        type="text"
        v-model="searchQuery"
        class="form-control"
        :placeholder="`Rechercher en ${languageLabel}`"
        @input="emitSearch"
        aria-label="Champ de recherche"
      />

      <!-- Sélecteur de langue -->
      <label for="language-select" class="visually-hidden">Langue</label>
      <select
        id="language-select"
        v-model="selectedLanguage"
        class="form-select"
        @change="emitSearch"
        aria-label="Sélection de la langue"
      >
        <option value="kikongo">Kikongo</option>
        <option value="français">Français</option>
        <option value="anglais">Anglais</option>
      </select>

      <!-- Bouton Effacer -->
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
const selectedLanguage = ref("kikongo");

const emit = defineEmits(["search"]);

// Émettre la recherche
const emitSearch = () => {
  emit("search", {
    query: searchQuery.value,
    language: selectedLanguage.value,
  });
};

// Réinitialiser le formulaire
const clearForm = () => {
  searchQuery.value = "";
  selectedLanguage.value = "kikongo";
  emitSearch();
};

// Libellé dynamique pour le placeholder
const languageLabel = computed(() => {
  switch (selectedLanguage.value) {
    case "kikongo":
      return "Kikongo";
    case "français":
      return "Français";
    case "anglais":
      return "Anglais";
    default:
      return "";
  }
});
</script>

<style scoped>
/* Styles du bouton Effacer */
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

/* Style du groupe d'inputs */
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

/* Adaptabilité pour les petits écrans */
@media (max-width: 576px) {
  .input-group {
    flex-direction: column;
  }

  .form-control,
  .form-select,
  .btn-clear {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  clip: rect(0, 0, 0, 0);
  overflow: hidden;
}
</style>
