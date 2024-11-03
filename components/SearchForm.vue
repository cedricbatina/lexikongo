<template>
  <form @submit.prevent="submitSearch">
    <div class="input-group">
      <span class="input-group-text">
        <i class="fas fa-search"></i>
      </span>
      <input
        type="text"
        v-model="searchQuery"
        class="form-control"
        placeholder="Rechercher en ..."
        @input="submitSearch"
      />
      <select
        v-model="selectedLanguage"
        class="form-select"
        style="font-weight: 500"
        @change="submitSearch"
      >
        <option value="kikongo">Kikongo</option>
        <option value="fr">Français</option>
        <option value="en">Anglais</option>
      </select>
      <button
        type="button"
        class="btn btn-secondary btn-effacer"
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

// Émettre l'événement dès qu'une lettre est tapée ou que la langue change
const submitSearch = () => {
  emit("search", {
    query: searchQuery.value,
    language: selectedLanguage.value,
  });
};

const clearForm = () => {
  searchQuery.value = "";
  selectedLanguage.value = "kikongo";
  submitSearch();
};
</script>


<style scoped>
.btn-effacer {
  background-color: #ff8a1d;
  color: white;
  border: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-effacer:hover {
  background-color: #e57a1a;
  transform: scale(1.05);
  cursor: pointer;
}

.option {
  font-weight: 500;
}

/* Styles pour l'icône de loupe */
.input-group-text {
  background-color: #fff;
  border-right: 0;
}

.input-group .form-control {
  border-left: 0;
}

/* Styles responsifs */
@media (max-width: 768px) {
  .input-group {
    flex-direction: column;
  }
  .input-group .form-control,
  .input-group .form-select,
  .input-group .btn-effacer {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
