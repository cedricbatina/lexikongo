<template>
  <div class="container mt-5">
    <!-- Titre principal -->
    <header class="text-center mb-4">
      <h1 class="display-4 text-primary mb-4 mt-4">
        <i class="fa-solid fa-search me-2"></i> Recherche de Verbes en Kikongo
      </h1>
      <p class="lead text-muted">
        Recherchez des verbes en Kikongo et découvrez leurs conjugaisons, leurs
        significations en français et en anglais. Explorez la richesse des
        verbes de cette langue fascinante.
      </p>
    </header>

    <!-- Section de recherche -->
    <div class="row justify-content-center mb-4">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <div class="card shadow-sm p-4">
          <h4 class="card-title text-primary mb-4">
            <i class="fa-solid fa-magnifying-glass"></i> Recherche
          </h4>
          <VerbSearchForm @search="handleSearch" />
        </div>
      </div>
    </div>

    <!-- Spinner pendant le chargement -->
    <div v-if="isLoading" class="text-center mt-4">
      <span
        class="spinner-border text-primary"
        role="status"
        aria-hidden="true"
      ></span>
      <p class="mt-2">Recherche en cours...</p>
    </div>

    <!-- Résultats de la recherche -->
    <section v-if="results.length && !isLoading" class="mt-5">
      <VerbSearchResults :results="results" />
    </section>

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
      <SearchButtons />
      <ContributorButtons />
      <AdminButtons />
    </section>
  </div>
</template>


<script setup>
import { ref } from "vue";
import { useHead } from "#app";
import LogoSlogan from "@/components/LogoSlogan.vue";
import SearchButtons from "@/components/SearchButtons.vue";
import ContributorButtons from "@/components/ContributorButtons.vue";
import AdminButtons from "@/components/AdminButtons.vue";
import VerbSearchForm from "@/components/VerbSearchForm.vue";
import VerbSearchResults from "@/components/VerbSearchResults.vue";

// États de la recherche
const searchQuery = ref("");
const selectedLanguage = ref("kikongo");
const results = ref([]);
const isLoading = ref(false); // Indicateur de chargement
const errorMessage = ref(null); // Message d'erreur

// Gérer les recherches
const handleSearch = async ({ query, language, mode }) => {
  searchQuery.value = query;
  selectedLanguage.value = language;

  // Initialisation des états
  isLoading.value = true;
  errorMessage.value = null;

  try {
    const response = await fetch(
      `/api/search-verbs?query=${encodeURIComponent(
        query
      )}&language=${encodeURIComponent(language)}&mode=${encodeURIComponent(
        mode
      )}`
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data = await response.json();
    results.value = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Erreur lors de la recherche :", error);
    errorMessage.value = "Une erreur s'est produite lors de la recherche.";
    results.value = [];
  } finally {
    isLoading.value = false;
  }
};
// SEO Configuration
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Recherche de Verbes en Kikongo | Lexikongo",
  description:
    "Recherchez des verbes en Kikongo et découvrez leurs conjugaisons ainsi que leurs significations en français et anglais. Explorez notre base enrichie de verbes Kikongo.",
  url: "https://www.lexikongo.fr/search-verbs",
  image: "https://www.lexikongo.fr/images/text_logo@1x.webp",
  inLanguage: "fr",
  publisher: {
    "@type": "Organization",
    name: "Lexikongo",
    url: "https://www.lexikongo.fr",
    logo: {
      "@type": "ImageObject",
      url: "https://www.lexikongo.fr/images/text_logo@1x.webp",
      width: 200,
      height: 200,
    },
  },
  potentialAction: {
    "@type": "SearchAction",
    target:
      "https://www.lexikongo.fr/search-verbs?q={search_term_string}&lang={lang}",
    "query-input": ["required name=search_term_string", "optional name=lang"],
  },
  about: {
    "@type": "Thing",
    name: "Kikongo Verbs",
    sameAs: [
      "https://en.wikipedia.org/wiki/Kikongo",
      "https://fr.wikipedia.org/wiki/Kikongo",
    ],
  },
};

useHead({
  title: "Recherche de Verbes en Kikongo | Lexikongo",
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify(jsonLd),
    },
  ],
  meta: [
    {
      name: "description",
      content:
        "Recherchez des verbes en Kikongo et découvrez leurs conjugaisons, ainsi que leurs significations en français et en anglais. Une ressource pour explorer la richesse des verbes Kikongo.",
    },
    {
      name: "keywords",
      content:
        "Kikongo, verbes, conjugaison, recherche, langue africaine, traduction, français, anglais, linguistique, patrimoine culturel, expressions Kikongo, Kikongo, mots, verbes, linguistique, traduction, français, anglais, culture africaine, patrimoine linguistique, Dictionnaire Kikongo - Français, Dictionnaire - Anglais, Dictionnaire Kikongo - Français - Anglais, Dictionnaire africain, Mbanza Kongo, Congo, Congo-Brazzaville, RDC, Angola, Gabon, Cameroun, RCA, Centrafrique, Langues, Langues Bantoues",
    },
    {
      name: "author",
      content: "Lexikongo",
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      property: "og:title",
      content: "Recherche de Verbes en Kikongo | Lexikongo",
    },
    {
      property: "og:description",
      content:
        "Explorez un dictionnaire complet des verbes en Kikongo avec leurs conjugaisons et significations en français et en anglais.",
    },
    {
      property: "og:image",
      content: "https://www.lexikongo.fr/images/text_logo@1x.webp",
    },
    {
      property: "og:url",
      content: "https://www.lexikongo.fr/search-verbs",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Recherche de Verbes en Kikongo | Lexikongo",
    },
    {
      name: "twitter:description",
      content:
        "Découvrez les conjugaisons et significations des verbes en Kikongo grâce à notre base de données enrichie.",
    },
    {
      name: "twitter:image",
      content: "https://www.lexikongo.fr/images/text_logo@1x.webp",
    },
  ],
});
</script>




<style scoped>
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
