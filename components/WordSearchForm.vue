<template>
  <form
    @submit.prevent="submitSearch"
    role="search"
    aria-label="Formulaire de recherche de mots"
  >
    <div class="input-group">
      <label for="search-input" class="visually-hidden"
        >Recherche de mots</label
      >
      <input
        id="search-input"
        type="text"
        v-model="searchQuery"
        class="form-control"
        placeholder="Rechercher un mot en Kikongo"
        @input="submitSearch"
        aria-label="Champ de recherche de mots"
      />
      <select
        id="language-select"
        v-model="selectedLanguage"
        class="form-select"
        aria-label="Choix de la langue"
      >
        <option value="kikongo">Kikongo</option>
        <option value="français">Français</option>
        <option value="anglais">Anglais</option>
      </select>
      <button
        type="button"
        class="btn btn-outline-secondary btn-effacer"
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
const selectedLanguage = ref("kikongo");

const emit = defineEmits(["search"]);

const submitSearch = () => {
  emit("search", {
    query: searchQuery.value,
    language: selectedLanguage.value,
  });
};

const clearForm = () => {
  searchQuery.value = "";
  submitSearch();
};
</script>

<style scoped>
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
}
</style>
