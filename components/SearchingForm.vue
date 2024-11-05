<template>
  <form @submit.prevent="submitSearch">
    <div class="input-group">
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
      >
        <option value="kikongo">Kikongo</option>
        <option value="fr">Français</option>
        <option value="en">Anglais</option>
      </select>
      <button
        type="button"
        class="btn btn-orange btn-effacer"
        @click="clearForm"
      >
        Effacer
      </button>
    </div>
  </form>
</template>

<script setup>
const searchQuery = ref("");
const selectedLanguage = ref("kikongo"); // Langue par défaut

const emit = defineEmits(["search"]);

// Fonction pour soumettre la recherche automatiquement à chaque modification
const submitSearch = () => {
  emit("search", {
    query: searchQuery.value,
    language: selectedLanguage.value,
  });
};

// Fonction pour réinitialiser le formulaire
const clearForm = () => {
  searchQuery.value = ""; // Vide le champ de recherche
  selectedLanguage.value = "kikongo"; // Remet la langue par défaut
  submitSearch(); // Relance une recherche avec le formulaire vide
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

option {
  font-weight: 500;
}
</style>
