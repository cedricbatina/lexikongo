<template>
  <div class="container mt-5">
    <!-- Titre principal -->

    <header class="text-center mb-4">
      <h1 class="display-4 text-primary mb-4 mt-4">
        <i class="fas fa-book"></i> Liste des mots et verbes en Kikongo
      </h1>
      <p class="lead">
        Découvrez la liste des mots et des verbes en Kikongo, présents dans la
        base de données, et leurs significations.
      </p>
    </header>
    <section class="text-center mb-4 mt-4">
      <LogoSlogan />
      <SearchButtons />
      <ContributorButtons />
      <AdminButtons />
    </section>
    <!-- Colonne pour afficher les mots et verbes -->
    <div class="row justify-content-center">
      <div class="col-lg-10 col-md-12">
        <div class="card shadow-sm p-3">
          <h4 class="card-title text-left text-primary">
            <i class="fas fa-book"></i> Toutes les expressions
          </h4>
          <ExpressionsTable :paginatedAllWordsVerbs="paginatedAllWordsVerbs" />
          <Pagination
            :currentPage="currentPageAllWordsVerbs"
            :totalPages="totalPagesAllWordsVerbs"
            @pageChange="changePageAllWordsVerbs"
          />
        </div>
      </div>
    </div>
    <section class="text-center mb-4 mt-4">
      <SearchButtons />
      <ContributorButtons />
      <AdminButtons />
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Pagination from "@/components/Pagination.vue";
import ExpressionsTable from "@/components/ExpressionsTable.vue";

const allWordsVerbs = ref([]);
const currentPageAllWordsVerbs = ref(1);
const pageSizeAllWordsVerbs = 30;
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Liste des mots et verbes en Kikongo | Lexique Kikongo",
  description:
    "Découvrez la liste complète des mots et verbes en Kikongo avec leurs significations en français et en anglais.",
  url: "https://www.lexikongo.fr/expressions",
  image: "https://www.lexikongo.fr/images/lexikongo_logo@2x.png",
  inLanguage: "fr",
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
  title: "Lexikongo - Liste des mots et verbes en Kikongo",
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
        "Découvrez la liste complète des mots et verbes en Kikongo avec leurs significations en français et en anglais.",
    },
    {
      name: "keywords",
      content:
        "Kikongo, mots, verbes, expressions, lexique, dictionnaire, langue, Congo, Lexikongo, liste des mots, kikongo",
    },
    {
      name: "author",
      content: "Lexikongo",
    },
    // Meta tags Open Graph pour les réseaux sociaux
    {
      property: "og:title",
      content: "Lexikongo - Liste des mots et verbes en Kikongo",
    },
    {
      property: "og:description",
      content:
        "Découvrez la liste complète des mots et verbes en Kikongo avec leurs significations en français et en anglais.",
    },
    {
      property: "og:image",
      content: "https://www.lexikongo.fr/images/lexikongo_logo@2x.png",
    },
    {
      property: "og:url",
      content: "https://www.lexikongo.fr/expressions",
    },
    {
      property: "og:type",
      content: "website",
    },
    // Twitter meta tags
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Lexikongo - Liste des mots et des verbes en Kikongo",
    },
    {
      name: "twitter:description",
      content:
        "Découvrez la liste complète des mots et verbes en Kikongo avec leurs significations en français et en anglais.",
    },
    {
      name: "twitter:image",
      content: "https://www.lexikongo.fr/images/lexikongo_logo@2x.png",
    },
  ],
});

const fetchAllWordsVerbs = async () => {
  try {
    const response = await fetch(`/api/all-words-verbs`);
    const result = await response.json();
    allWordsVerbs.value = result;
  } catch (error) {
    console.error("Erreur lors de la récupération des mots et verbes :", error);
    allWordsVerbs.value = [];
  }
};

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

onMounted(async () => {
  await fetchAllWordsVerbs();
});
</script>

<style scoped>
.card {
  border: none;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.25rem;
  color: #ff8a1d;
  text-align: center;
}

.text-primary {
  color: #007bff !important;
}

.btn-primary {
  background-color: #007bff;
  border: none;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.alert {
  font-size: 1rem;
  text-align: center;
}
</style>
