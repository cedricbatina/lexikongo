<template>
  <form
    @submit.prevent="handleSearch"
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
        @input="handleAutoSearch"
        :placeholder="`Rechercher en ${languageLabel}`"
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
      >
        <option value="kikongo">Kikongo</option>
        <option value="fr">Français</option>
        <option value="en">Anglais</option>
      </select>
      <button type="button" class="btn btn-primary" @click="handleButtonSearch">
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
const selectedLanguage = ref("kikongo");

const emit = defineEmits(["search"]);

// Déclenche la recherche stricte
const handleButtonSearch = () => {
  if (searchQuery.value.trim() !== "") {
    emit("search", {
      query: searchQuery.value,
      language: selectedLanguage.value,
      mode: "strict",
    });
  }
};

// Déclenche la recherche automatique
const handleAutoSearch = () => {
  emit("search", {
    query: searchQuery.value,
    language: selectedLanguage.value,
    mode: "auto",
  });
};
/*
const submitSearch = () => {
  emit("search", {
    query: searchQuery.value,
    language: selectedLanguage.value,
    mode: "strict",
  });
};*/

const clearForm = () => {
  searchQuery.value = "";
  selectedLanguage.value = "kikongo";
  emit("search", { query: "", language: "kikongo", mode: "auto" });
};

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
