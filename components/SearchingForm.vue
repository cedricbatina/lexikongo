<template>
  <form
    @submit.prevent="handleButtonSearch"
    role="search"
    aria-label="Formulaire de recherche"
  >
    <div class="input-group">
      <!-- Champ de recherche -->
      <label for="search-input" class="visually-hidden">Recherche</label>
      <input
        id="search-input"
        type="text"
        v-model="searchQuery"
        class="form-control"
        placeholder="Rechercher en Kikongo, Français ou Anglais"
        aria-label="Champ de recherche"
        @input="handleAutoSearch"
      />

      <!-- Sélection de langue -->
      <label for="language-select" class="visually-hidden">Langue</label>
      <select
        id="language-select"
        v-model="selectedLanguage"
        class="form-select"
        aria-label="Langue de recherche"
      >
        <option value="kikongo">Kikongo</option>
        <option value="fr">Français</option>
        <option value="en">Anglais</option>
      </select>

      <!-- Boutons -->
      <button
        type="button"
        class="btn btn-primary"
        @click="handleButtonSearch"
        aria-label="Lancer la recherche"
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
import { ref } from "vue";

// Champs de recherche
const searchQuery = ref("");
const selectedLanguage = ref("kikongo");

// Événements à transmettre au parent
const emit = defineEmits(["search"]);

// Recherche stricte
const handleButtonSearch = () => {
  if (searchQuery.value.trim() !== "") {
    emit("search", {
      query: searchQuery.value,
      language: selectedLanguage.value,
      mode: "strict",
    });
  }
};

// Recherche automatique
const handleAutoSearch = () => {
  if (searchQuery.value.trim() !== "") {
    emit("search", {
      query: searchQuery.value,
      language: selectedLanguage.value,
      mode: "auto",
    });
  }
};

// Effacer les champs
const clearForm = () => {
  searchQuery.value = "";
  selectedLanguage.value = "kikongo";
  emit("search", { query: "", language: "kikongo", mode: "auto" });
};
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
  .btn-clear {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .btn-clear {
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
