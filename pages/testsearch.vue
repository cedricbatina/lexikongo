<template>
  <div class="container mt-5">
    <header class="text-center mb-4">
      <h1 class="display-4 text-primary">Test de recherche</h1>
    </header>

    <ChercherExpression @search="handleSearch" />

    <div class="mt-4">
      <ResultatExpression :results="results" />
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";
import ChercherExpression from "@/components/ChercherExpression.vue";
import ResultatExpression from "@/components/ResultatExpression.vue";

const results = ref([]);

const handleSearch = async ({ query, language, mode }) => {
  try {
    console.log("Recherche déclenchée :", { query, language, mode });
    const response = await fetch(
      `/api/search-words-verbs?query=${encodeURIComponent(
        query
      )}&language=${language}&mode=${mode}`
    );
    const data = await response.json();
    console.log("Données reçues de l'API :", data);
    results.value = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Erreur lors de la recherche :", error);
    results.value = [];
  }
};
</script>

