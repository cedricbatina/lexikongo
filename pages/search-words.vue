<template>
  <div class="container mt-5">
    <!-- Titre principal -->
    <div class="text-center mb-4">
      <h1 class="display-4 text-primary">Recherche de Mots en Kikongo</h1>
      <p class="lead">
        Recherchez des mots en Kikongo et découvrez leurs significations.
      </p>
    </div>

    <!-- Formulaire de recherche -->
    <WordSearchForm @search="handleSearch" />

    <!-- Résultats de la recherche -->
    <WordSearchResults :searchQuery="searchQuery" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useHead } from "#app"; // Importation de useHead pour Nuxt 3
import WordSearchForm from "@/components/WordSearchForm.vue";
import WordSearchResults from "@/components/WordSearchResults.vue";

const searchQuery = ref("");

const handleSearch = (query) => {
  searchQuery.value = query;
};

// Configuration des meta tags SEO
useHead({
  title: "Lexikongo - Recherche de Mots en Kikongo",
  meta: [
    {
      name: "description",
      content:
        "Recherchez des mots en Kikongo et découvrez leurs significations en français et en anglais.",
    },
    {
      name: "keywords",
      content:
        "Kikongo, recherche, mots, lexique, dictionnaire, langue, Congo, Lexikongo",
    },
    {
      name: "author",
      content: "Lexikongo",
    },
    // Meta tags Open Graph pour les réseaux sociaux
    {
      property: "og:title",
      content: "Lexikongo - Recherche de Mots en Kikongo",
    },
    {
      property: "og:description",
      content:
        "Recherchez des mots en Kikongo et découvrez leurs significations en français et en anglais.",
    },
    {
      property: "og:image",
      content: "/images/lexikongo-cover.jpg", // Remplacez par le chemin réel de votre image
    },
    {
      property: "og:url",
      content: "https://www.lexikongo.fr/search-words",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
  ],
});
</script>

<style scoped>
/* Variables CSS pour les couleurs */
:root {
  --primary-color: #007bff;
  --text-default: #03080d;
}

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
