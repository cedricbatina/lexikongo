<template>
  <div class="container mt-4">
    <!-- Texte explicatif au-dessus de la table des expressions -->
    <div class="row justify-content-center mb-3">
      <LogoSlogan />

      <div class="col-lg-10 col-md-12 col-sm-12">
        <p class="text-center lead m-3">
          Cette section présente une liste complète des expressions en Kikongo,
          regroupant des substantifs et verbes essentiels pour une meilleure
          compréhension de la langue. Explorez ces expressions avec leurs
          traductions et enrichissez votre vocabulaire et votre compréhension
          culturelle du Kikongo.
        </p>
      </div>
      <SearchButtons />
    </div>

    <!-- Section du tableau des expressions -->
    <section class="row justify-content-center">
      <div class="col-lg-10 col-md-12 col-sm-12">
        <div class="card shadow-sm p-4">
          <h4 class="card-title text-center text-primary mb-4">
            Toutes les expressions
          </h4>
          <ExpressionsTable :paginatedAllWordsVerbs="paginatedAllWordsVerbs" />
          <Pagination
            :currentPage="currentPageAllWordsVerbs"
            :totalPages="totalPagesAllWordsVerbs"
            @pageChange="changePageAllWordsVerbs"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useHead } from "#app";

// Variables de pagination et de données pour `ExpressionsTable`
const allWordsVerbs = ref([]);
const currentPageAllWordsVerbs = ref(1);
const pageSizeAllWordsVerbs = 30;

// Fonction de récupération des données d'expressions
const fetchAllWordsVerbs = async () => {
  try {
    const response = await fetch(`/api/all-words-verbs?language=kikongo`);
    if (!response.ok) throw new Error(`Erreur HTTP: ${response.statusText}`);
    const result = await response.json();
    allWordsVerbs.value = Array.isArray(result) ? result : [];
  } catch (error) {
    console.error("Erreur lors de la récupération des mots et verbes :", error);
    allWordsVerbs.value = [];
  }
};

// Pagination dynamique
const paginatedAllWordsVerbs = computed(() => {
  const start = (currentPageAllWordsVerbs.value - 1) * pageSizeAllWordsVerbs;
  return allWordsVerbs.value.slice(start, start + pageSizeAllWordsVerbs);
});

const totalPagesAllWordsVerbs = computed(() =>
  Math.ceil(allWordsVerbs.value.length / pageSizeAllWordsVerbs)
);

const changePageAllWordsVerbs = (page) => {
  currentPageAllWordsVerbs.value = page;
};

// Chargement initial des données
onMounted(fetchAllWordsVerbs);

// JSON-LD pour le SEO
const jsonLd = computed(() => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Toutes les expressions - Lexikongo",
  description:
    "Une liste complète des expressions en Kikongo avec traductions et significations.",
  url: "https://lexikongo.fr/expressions",
  inLanguage: "fr",
  image: "https://www.lexikongo.fr/images/lexikongo_logo@2x.png",
  publisher: {
    "@type": "Organization",
    name: "Lexikongo",
    url: "https://www.lexikongo.fr",
    logo: {
      "@type": "ImageObject",
      url: "https://www.lexikongo.fr/images/logo.webp",
      width: 200,
      height: 200,
    },
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: allWordsVerbs.value.map((word, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": word.type === "word" ? "DefinedTerm" : "CreativeWork",
        name: word.singular || word.name,
        inLanguage: "kg",
        translation: {
          fr: word.translation_fr || "Non défini",
          en: word.translation_en || "Non défini",
        },
      },
    })),
  },
}));

useHead({
  title: "Toutes les expressions - Lexikongo",
  meta: [
    {
      name: "description",
      content:
        "Découvrez toutes les expressions en Kikongo avec leurs traductions et significations dans Lexikongo.",
    },
    {
      name: "keywords",
      content:
        "Kikongo, expressions, dictionnaire en ligne, Lexikongo, traductions, multilingue, mots, verbes",
    },
    {
      name: "author",
      content: "Lexikongo",
    },
    // Balises Open Graph
    {
      property: "og:title",
      content: "Toutes les expressions - Lexikongo",
    },
    {
      property: "og:description",
      content:
        "Une liste complète des expressions en Kikongo avec traductions et significations.",
    },
    {
      property: "og:image",
      content: "https://www.lexikongo.fr/images/lexikongo_logo@2x.png",
    },
    {
      property: "og:image:alt",
      content:
        "Couverture montrant des expressions en Kikongo avec leurs traductions.",
    },
    {
      property: "og:url",
      content: "https://www.lexikongo.fr/expressions",
    },
    {
      property: "og:type",
      content: "website",
    },
    // Balises Twitter
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Toutes les expressions - Lexikongo",
    },
    {
      name: "twitter:description",
      content:
        "Découvrez toutes les expressions en Kikongo avec leurs traductions et significations.",
    },
    {
      name: "twitter:image",
      content: "https://www.lexikongo.fr/images/lexikongo_logo@2x.png",
    },
    {
      name: "twitter:image:alt",
      content:
        "Couverture montrant des expressions en Kikongo avec leurs traductions.",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify(jsonLd.value),
    },
  ],
});
</script>

<style scoped>
.container {
  max-width: 100%;
  padding: 0 15px;
}

.card {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.5rem;
  color: var(--primary-color);
}

/* Adaptation aux tablettes */
@media (max-width: 768px) {
  .card-title {
    font-size: 1.25rem;
  }
  h4 {
    font-size: 1.25rem;
  }
}

/* Adaptation aux mobiles */
@media (max-width: 576px) {
  .card-title {
    font-size: 1.15rem;
  }
  h4 {
    font-size: 1.15rem;
  }
  .lead {
    font-size: 0.875rem;
  }
}
</style>
