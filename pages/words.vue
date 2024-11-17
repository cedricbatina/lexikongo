<template>
  <div class="container mt-5">
    <!-- Titre principal -->
    <div class="text-center mb-4">
      <h1 class="display-4 text-primary">Liste des Mots en Kikongo</h1>
      <p class="lead">
        Découvrez la liste complète des mots en Kikongo et leurs significations.
      </p>
    </div>

    <!-- Boutons vers les pages de recherche -->
    <div class="text-center mb-5 mt-5">
      <nuxt-link to="/search-words" class="btn btn-outline-primary m-2">
        Rechercher des mots
      </nuxt-link>
      <nuxt-link to="/search-verbs" class="btn btn-outline-success m-2">
        Rechercher des verbes
      </nuxt-link>
      <nuxt-link to="/verbs" class="btn btn-outline-secondary m-2">
        Liste des verbes
      </nuxt-link>
      <nuxt-link to="/verbs" class="btn btn-outline-secondary m-2">
        Liste de mots & verbes
      </nuxt-link>
    </div>

    <!-- Affichage de la liste des mots -->
    <WordList />
  </div>
</template>

<script setup>
import { useHead } from "#app";
import WordList from "@/components/WordList.vue";

useHead({
  title: "Lexikongo - Liste des Mots en Kikongo",
  meta: [
    {
      name: "description",
      content:
        "Découvrez la liste complète des mots en Kikongo avec leurs significations en français et en anglais.",
    },
    {
      name: "keywords",
      content:
        "Kikongo, mots, lexique, dictionnaire, langue, Congo, Lexikongo, liste des mots",
    },
    {
      name: "author",
      content: "Lexikongo",
    },
    // Meta tags Open Graph pour les réseaux sociaux
    {
      property: "og:title",
      content: "Lexikongo - Liste des Mots en Kikongo",
    },
    {
      property: "og:description",
      content:
        "Découvrez la liste complète des mots en Kikongo avec leurs significations en français et en anglais.",
    },
    {
      property: "og:image",
      content: "/images/lexikongo-cover.jpg", // Remplacez par le chemin réel de votre image
    },
    {
      property: "og:url",
      content: "https://www.lexikongo.fr/words",
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
  --secondary-color: #6c757d;
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

/* Styles pour les boutons */
.btn {
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  border-radius: 0.25rem;
}

.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: #fff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.btn-secondary {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
  color: #fff;
}

.btn-secondary:hover {
  background-color: #545b62;
  border-color: #545b62;
}

/* Responsivité */
@media (max-width: 768px) {
  .display-4 {
    font-size: 2rem;
  }
  .lead {
    font-size: 1rem;
  }
  .btn {
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
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
