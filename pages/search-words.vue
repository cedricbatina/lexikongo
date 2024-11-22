<template>
  <div class="container mt-5">
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
      <LogoSlogan />
    </header>

    <!-- Formulaire de recherche avec sélection de langue -->
    <div class="row justify-content-center mb-4">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <div class="card shadow-sm p-4 mb-4">
          <h4 class="card-title text-left text-primary">Recherche</h4>
          <SearchingForm
            @search="handleSearch"
            :languages="['kg', 'fr', 'en']"
          />
        </div>
      </div>
    </div>

    <!-- Résultats de recherche -->
    <div v-if="paginatedWords.length" class="row justify-content-center mb-4">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <div class="card shadow-sm p-4">
          <h4 class="card-title text-center text-primary">
            Résultats de votre recherche
          </h4>
          <SearchingResults :paginatedWords="paginatedWords" />
          <Pagination
            :currentPage="currentPage"
            :totalPages="totalPages"
            @pageChange="changePage"
          />
        </div>
      </div>
    </div>

    <!-- Aucun résultat -->
    <div
      v-else-if="query && !paginatedWords.length"
      class="alert alert-info mt-4 text-center"
    >
      Aucun résultat trouvé pour votre recherche.
    </div>

    <!-- Appel à l'action -->
    <section class="text-center mt-4">
      <p class="text-default">
        Vous ne trouvez pas ce que vous cherchez ? <br />
        Contribuez à enrichir le lexique en ajoutant de nouveaux mots ou verbes.
      </p>
      <NuxtLink
        to="/for-contributors"
        class="btn btn-outline-success btn-lg me-3"
      >
        <i class="fas fa-hands-helping me-2"></i> Rejoignez les Contributeurs
      </NuxtLink>
      <NuxtLink to="/contact" class="btn btn-outline-primary btn-lg">
        <i class="fas fa-envelope me-2"></i> Contactez-nous
      </NuxtLink>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useHead } from "#app"; // SEO configuration for Nuxt 3
import LogoSlogan from "@/components/LogoSlogan.vue";
import SearchingForm from "@/components/SearchingForm.vue";
import SearchingResults from "@/components/SearchingResults.vue";
import Pagination from "@/components/Pagination.vue";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Lexikongo - Recherche de mots en Kikongo",
  description:
    "Découvrez des mots, verbes et expressions en Kikongo, Français ou Anglais. Recherchez des traductions, significations et détails phonétiques pour enrichir votre connaissance de cette langue fascinante.",
  url: "https://www.lexikongo.fr/search-words",
  image: "https://www.lexikongo.fr/images/text_logo@1x.webp",
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
      "https://www.lexikongo.fr/search-words?q={search_term_string}&lang={lang}",
    "query-input": ["required name=search_term_string", "optional name=lang"],
  },
  about: {
    "@type": "Thing",
    name: "Kikongo Language",
    sameAs: [
      "https://en.wikipedia.org/wiki/Kikongo",
      "https://fr.wikipedia.org/wiki/Kikongo",
    ],
  },
};

useHead({
  title: "Lexikongo - Recherche de mots et verbes en Kikongo",
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
        "Découvrez des mots, verbes et expressions en Kikongo, Français ou Anglais. Recherchez des traductions, significations et détails phonétiques pour enrichir votre connaissance de cette langue fascinante.",
    },
    {
      name: "keywords",
      content:
        "Kikongo, mots, verbes, recherche, lexique, dictionnaire, langue africaine, Congo, patrimoine culturel, traductions Kikongo",
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
      content: "Lexikongo - Recherche de mots en Kikongo",
    },
    {
      property: "og:description",
      content:
        "Explorez le lexique Kikongo pour rechercher des mots, verbes et expressions avec des traductions en français et anglais.",
    },
    {
      property: "og:image",
      content: "https://www.lexikongo.fr/images/text_logo@1x.webp",
    },
    {
      property: "og:url",
      content: "https://www.lexikongo.fr/search-words",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Lexikongo - Recherche de Mots et Verbes en Kikongo",
    },
    {
      name: "twitter:description",
      content:
        "Découvrez le lexique Kikongo pour rechercher des mots ou verbes avec des traductions en français et anglais.",
    },
    {
      name: "twitter:image",
      content: "https://www.lexikongo.fr/images/text_logo@1x.webp",
    },
  ],
});

const query = ref("");
const language = ref("kg"); // Langue par défaut
const items = ref([]);
const currentPage = ref(1);
const pageSize = 15;

const handleSearch = async ({
  query: searchQuery,
  language: selectedLanguage,
}) => {
  query.value = searchQuery;
  language.value = selectedLanguage;
  currentPage.value = 1; // Reset page on new search
  await fetchResults();
};

const fetchResults = async () => {
  if (!query.value) {
    items.value = [];
    return;
  }
  try {
    const response = await fetch(
      `/api/search?q=${encodeURIComponent(query.value)}&lang=${language.value}`
    );
    const results = await response.json();
    items.value = results;
  } catch (error) {
    console.error("Error fetching search results:", error);
    items.value = [];
  }
};
console.log("Requête API reçue :", query);
console.log("Résultats retournés :", results);

const paginatedWords = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return items.value.slice(start, start + pageSize);
});

const totalPages = computed(() => Math.ceil(items.value.length / pageSize));

const changePage = (page) => {
  currentPage.value = page;
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
