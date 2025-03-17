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
    </section>

    <!-- Contenu principal et barre latérale -->
    <div class="row">
      <!-- Contenu principal -->
      <div class="col-lg-9">
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

        <LastExpressionsCount />

        <!-- Section Appel à l'action -->
        <section class="text-center mt-4" aria-labelledby="contribute-section">
          <p id="contribute-section" class="text-default">
            Vous ne trouvez pas l'expression que vous cherchez ? <br />
            Contribuez à enrichir le lexique en ajoutant de nouveaux mots ou verbes.
          </p>
          <div class="d-flex flex-column flex-md-row justify-content-center gap-3">
            <NuxtLink
              to="/documentation/for-contributors"
              class="btn btn-outline-success btn-lg"
              aria-label="Rejoignez les contributeurs pour enrichir le lexique"
            >
              <i class="fas fa-hands-helping me-2" aria-hidden="true"></i>
              Rejoignez les Contributeurs
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="btn btn-outline-primary btn-lg"
              aria-label="Contactez-nous pour toute assistance ou suggestion"
            >
              <i class="fas fa-envelope me-2" aria-hidden="true"></i>
              Contactez-nous
            </NuxtLink>
          </div>
        </section>
      </div>

      <!-- Barre latérale pour boutons (droite sur écran large, en bas sur tablette/mobile) -->
      <aside class="col-lg-3 order-lg-2 order-md-last mt-4 mt-lg-0">
        <div class="card shadow-sm p-4 sidebar-buttons">
          <SearchButtons />
          <ContributorButtons />
          <AdminButtons />
        </div>
      </aside>
    </div>
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
