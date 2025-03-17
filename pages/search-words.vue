<template>
  <div class="mt-5">
    <!-- Titre principal -->
    <header class="text-center mb-4">
      <h1 class="display-4 text-primary">
        <i class="fas fa-search me-2"></i> Recherche de Mots et Verbes en
        Kikongo
      </h1>
      <p class="lead">
        Explorez le lexique Kikongo : recherchez des mots, verbes ou expressions
        en Kikongo, Français ou Anglais, et découvrez leurs traductions et
        significations détaillées.
      </p>
    </header>

    <!-- Formulaire de recherche avec sélection de langue -->
    <div class="row justify-content-center mb-4">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <div class="card shadow-sm p-4 mb-4">
          <h4 class="card-title text-left text-primary">
            <i class="fa-solid fa-magnifying-glass"></i> Recherche
          </h4>
          <!-- Formulaire de recherche -->
          <WordSearchForm @search="handleSearch" />
        </div>
      </div>
    </div>

    <!-- Résultats de recherche -->
    <div v-if="isLoading" class="text-center mt-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
      <p>Recherche en cours...</p>
    </div>

    <div v-else-if="results.length" class="row justify-content-center mb-4">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <section>
          <WordSearchResults :results="results" />
        </section>
      </div>
    </div>

    <!-- Aucun résultat -->
    <div
      v-else-if="searchQuery && !results.length && !isLoading"
      class="alert alert-info mt-4 text-center"
    >
      Aucun résultat trouvé pour votre recherche.
    </div>

    <!-- Message d'erreur -->
    <div v-if="errorMessage" class="alert alert-danger mt-4 text-center">
      {{ errorMessage }}
    </div>

    <!-- Appel à l'action -->
    <LastExpressionsCount />
    <ActionAppeal />
    <section class="text-center mb-5">
      <LogoSlogan />
      <SearchButtons />
      <ContributorButtons />
      <AdminButtons />
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import LogoSlogan from "@/components/LogoSlogan.vue"; // Assurez-vous que ce composant est utilisé
import WordSearchForm from "@/components/WordSearchForm.vue";
import WordSearchResults from "@/components/WordSearchResults.vue";

const searchQuery = ref("");
const selectedLanguage = ref("kikongo");
const results = ref([]);
const isLoading = ref(false); // Ajout d'un état de chargement
const errorMessage = ref(""); // Ajout pour capturer les erreurs
const handleButtonSearch = () => {
  if (searchQuery.value.trim() !== "") {
    fetchWords(searchQuery.value, selectedLanguage.value, "strict");
  }
};

// Fonction pour gérer la recherche
const handleSearch = async ({ query, language, mode = "partial" }) => {
  searchQuery.value = query;
  selectedLanguage.value = language;

  try {
    const response = await fetch(
      `/api/search-words?query=${encodeURIComponent(
        query
      )}&language=${encodeURIComponent(language)}&mode=${mode}`
    );
    const data = await response.json();
    results.value = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API :", error);
    results.value = [];
  }
};
</script>




<style scoped>
/* Variables CSS pour les couleurs */

/* Styles pour le titre et le texte principal */
.display-4 {
  font-size: 2.5rem;
  color: var(--primary-color);
}

.lead {
  font-size: 1.25rem;
  color: var(--text-default);
}

/* Responsivité */
@media (max-width: 768px) {
  .display-4 {
    font-size: 2rem;
  }
  .lead {
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .display-4 {
    font-size: 1.75rem;
  }
  .lead {
    font-size: 0.875rem;
  }
}
</style>
