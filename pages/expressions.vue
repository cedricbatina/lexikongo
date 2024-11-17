<template>
  <!-- Texte explicatif au-dessus de la table des expressions -->
  <div class="row justify-content-center mb-3">
    <LogoSlogan />

    <div class="col-lg-10 col-md-12 col-sm-12">
      <p class="text-center lead m-3">
        Cette section présente une liste complète des expressions en Kikongo,
        présentes actuellement dans la base de données, regroupant des
        substantifs et verbes essentiels pour une meilleure compréhension de la
        langue. Les utilisateurs peuvent explorer les expressions et leurs
        traductions pour enrichir leur vocabulaire et leur compréhension
        culturelle du Kikongo.
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
      <nuxt-link to="/expressions" class="btn btn-outline-secondary m-2">
        Liste de mots & verbes
      </nuxt-link>
    </div>
  </div>

  <!-- Section du tableau des expressions -->
  <div class="row justify-content-center">
    <div class="col-lg-10 col-md-12 col-sm-12">
      <div class="card shadow-sm p-4">
        <h4 class="card-title text-center text-primary">
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
  </div>
</template>







<script setup>
import { ref, computed, onMounted } from "vue";
import { useHead } from "#app";

// Variables de pagination et de données pour `ExpressionsTable`
const allWordsVerbs = ref([]); // Tableau contenant toutes les expressions
const currentPageAllWordsVerbs = ref(1); // Page actuelle pour la pagination
const pageSizeAllWordsVerbs = 30; // Taille de page pour la pagination

// Fonction de récupération des données d'expressions
const fetchAllWordsVerbs = async () => {
  try {
    // Requête pour obtenir toutes les expressions de l'API
    const response = await fetch(
      `/api/all-words-verbs?type=word&language=kikongo`
    );
    if (!response.ok) throw new Error(`Erreur HTTP: ${response.statusText}`);
    const result = await response.json();

    // Vérifie si le résultat est un tableau avant de l'assigner
    allWordsVerbs.value = Array.isArray(result) ? result : [];
  } catch (error) {
    console.error("Erreur lors de la récupération des mots et verbes :", error);
    allWordsVerbs.value = [];
  }
};

// Calcul des données paginées pour `ExpressionsTable`
const paginatedAllWordsVerbs = computed(() => {
  const start = (currentPageAllWordsVerbs.value - 1) * pageSizeAllWordsVerbs;
  return allWordsVerbs.value.slice(start, start + pageSizeAllWordsVerbs);
});

// Calcul du nombre total de pages pour `ExpressionsTable`
const totalPagesAllWordsVerbs = computed(() =>
  Math.ceil(allWordsVerbs.value.length / pageSizeAllWordsVerbs)
);

// Fonction pour changer la page actuelle
const changePageAllWordsVerbs = (page) => {
  currentPageAllWordsVerbs.value = page;
};

// Appel initial pour charger les données lors du montage du composant
onMounted(fetchAllWordsVerbs);

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
        "Kikongo, expressions, dictionnaire en ligne, Lexikongo, traductions, multilingue",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      json: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Toutes les expressions - Lexikongo",
        description:
          "Une liste complète des expressions en Kikongo avec traductions et significations.",
        url: "https://lexikongo.fr/expressions",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: allWordsVerbs.value.map((word, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "CreativeWork",
              name: word.expression,
              inLanguage: "kg",
              translation: word.translation,
            },
          })),
        },
      },
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
  font-size: 1.25rem;
  color: var(--primary-color);
}

/* Adaptation aux tablettes */
@media (max-width: 768px) {
  .card-title {
    font-size: 1.15rem;
  }
  h4 {
    font-size: 1.5rem;
  }
}

/* Adaptation aux mobiles */
@media (max-width: 576px) {
  .card-title {
    font-size: 1rem;
  }
  h4 {
    font-size: 1.25rem;
  }
  .lead {
    font-size: 0.875rem;
  }
}
</style>