<template>
  <div class="container mt-5">
    <!-- Titre principal -->
    <div class="text-center mb-4">
      <h2 class="display-4 text-primary">Lexique Kikongo</h2>
      <p class="lead">
        Recherchez des mots et verbes en Kikongo et découvrez leurs
        significations.
      </p>
    </div>

    <!-- Section de recherche et résultats -->
    <div class="row justify-content-center mb-4">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <div class="card shadow-sm p-4 mb-4">
          <h4 class="card-title text-left text-primary">Recherche</h4>
          <SearchForm @search="handleSearch" />
        </div>

        <!-- Résultats de recherche -->
        <!-- Résultats de recherche -->
        <div v-if="paginatedWords.length" class="card shadow-sm p-4 mb-4">
          <h4 class="card-title text-center text-primary">
            Résultats de la recherche
          </h4>
          <SearchResults :paginatedWords="paginatedWords" />
          <Pagination
            :currentPage="currentPage"
            :totalPages="totalPages"
            @pageChange="changePage"
          />
        </div>

        <!-- Message si aucun résultat et une recherche a été effectuée -->
        <div
          v-else-if="query && !paginatedWords.length"
          class="alert alert-info mt-4 text-center"
        >
          Aucun mot trouvé.
        </div>
      </div>
    </div>
    <AdminButtons />
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const query = ref("");
const language = ref("kikongo");
const items = ref([]);
const currentPage = ref(1);
const pageSize = 15;

const handleSearch = async ({
  query: searchQuery,
  language: selectedLanguage,
}) => {
  query.value = searchQuery;
  language.value = selectedLanguage;
  await fetchWords();
};

const fetchWords = async () => {
  if (!query.value) {
    items.value = [];
    return;
  }

  try {
    // Effectuer une recherche à la fois sur les mots et les verbes
    const response = await fetch(
      `/api/all-words-verbs?query=${query.value}&language=${language.value}&type=all`
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.statusText}`);
    }

    const result = await response.json();

    if (!Array.isArray(result)) {
      throw new Error("Le format des données retournées n'est pas valide");
    }

    items.value = result;
  } catch (error) {
    console.error("Erreur lors de la récupération des mots et verbes :", error);
    items.value = []; // Réinitialiser en cas d'erreur
  }
};

const paginatedWords = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return items.value.slice(start, start + pageSize);
});

const totalPages = computed(() => Math.ceil(items.value.length / pageSize));

const changePage = (page) => {
  currentPage.value = page;
};

// Partie pour la 2e colonne (mots et verbes de la DB)
const allWordsVerbs = ref([]);
const currentPageAllWordsVerbs = ref(1);
const pageSizeAllWordsVerbs = 30;

const fetchAllWordsVerbs = async () => {
  try {
    // Assure-toi que le paramètre `type` est bien passé
    const response = await fetch(
      `/api/all-words-verbs?type=word&query=${query.value}&language=kikongo`
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Données reçues côté client :", result);

    if (!Array.isArray(result) || result.length === 0) {
      allWordsVerbs.value = [];
      return;
    }

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
/* Harmonisation des couleurs avec admin/index.vue */
.card-title {
  font-size: 1.25rem;
  color: #007bff; /* Couleur bleue similaire à text-primary */
}

/* Effet d'hover pour les boutons */
.btn-primary {
  background-color: #007bff;
  border: none;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}

/* Alertes et messages */
.alert {
  font-size: 1rem;
  text-align: center;
}

/* Espacement entre les cartes */
.card {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Responsivité */
@media (max-width: 768px) {
  .card-title {
    font-size: 1.15rem; /* Taille réduite des titres pour tablettes */
  }
  h2 {
    font-size: 2rem; /* Taille réduite du titre principal sur tablettes */
  }
  .lead {
    font-size: 1rem; /* Réduction du texte principal pour tablettes */
  }
}

@media (max-width: 576px) {
  .card-title {
    font-size: 1rem; /* Taille réduite des titres pour mobiles */
  }
  h2 {
    font-size: 1.75rem; /* Taille du titre principal pour mobiles */
  }
  .lead {
    font-size: 0.875rem; /* Réduction du texte principal pour mobiles */
  }
}
</style>
