<template>
  <form @submit.prevent="onSearch">
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        v-model="searchQuery"
        placeholder="Entrez votre recherche"
      />
      <select v-model="selectedLanguage" class="form-select">
        <option value="kikongo">Kikongo</option>
        <option value="fr">Français</option>
        <option value="en">Anglais</option>
      </select>
      <button class="btn btn-primary" type="submit">Rechercher</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";

const searchQuery = ref("");
const selectedLanguage = ref("kikongo"); // Par défaut en Kikongo

const emit = defineEmits(["search"]);

function onSearch() {
  emit("search", {
    query: searchQuery.value,
    language: selectedLanguage.value,
  });
}
</script>
