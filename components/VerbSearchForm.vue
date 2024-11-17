<template>
  <form
    @submit.prevent="submitSearch"
    role="search"
    aria-label="Formulaire de recherche de verbes"
  >
    <div class="input-group">
      <label for="search-input" class="visually-hidden"
        >Recherche de verbes</label
      >
      <input
        id="search-input"
        type="text"
        v-model="searchQuery"
        class="form-control"
        placeholder="Rechercher un verbe en Kikongo"
        @input="submitSearch"
        aria-label="Champ de recherche de verbes"
      />
      <button
        type="button"
        class="btn btn-outline btn-effacer"
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

const searchQuery = ref("");

const emit = defineEmits(["search"]);

const submitSearch = () => {
  emit("search", searchQuery.value);
};

const clearForm = () => {
  searchQuery.value = "";
  submitSearch();
};
</script>


<style scoped>
/* Utilisation des variables CSS pour les couleurs */
:root {
  --primary-color: #007bff;
  --hover-primary: #0056b3;
  --secondary-color: #a52a2a;
  --dark-color: #2a0600;
  --highlight-color: #28a745;
  --text-default: #03080d;
  --third-color: #ff4500;
}

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
