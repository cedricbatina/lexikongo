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
        :placeholder="`Rechercher en ${languageLabel}`"
        @input="submitSearch"
        aria-label="Champ de recherche"
      />

      <!-- Sélecteur de langue -->
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

      <!-- Bouton "Rechercher" -->
      <button type="button" class="btn btn-primary" @click="handleButtonSearch">
        Rechercher
      </button>

      <!-- Bouton "Effacer" -->
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

const searchQuery = ref(""); // Champ de recherche
const selectedLanguage = ref("kikongo"); // Langue par défaut : Kikongo

const emit = defineEmits(["search"]);

// Fonction pour la recherche via le bouton "Rechercher" (mode strict)
const handleButtonSearch = () => {
  if (searchQuery.value.trim() !== "") {
    emit("search", {
      query: searchQuery.value,
      language: selectedLanguage.value,
      mode: "strict",
    });
  }
};

// Fonction pour la recherche automatique (mode auto)
const submitSearch = () => {
  emit("search", {
    query: searchQuery.value,
    language: selectedLanguage.value,
    mode: "auto",
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
