<template>
  <div class="container">
    <div class="row">
      <!-- Première colonne avec le formulaire de recherche -->
      <div class="col-md-4 col-sm-12 mt-2">
        <SearchForm @search="handleSearch" />
        <SearchResults :paginatedWords="paginatedWords" />
        <Pagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          @pageChange="changePage"
        />
      </div>

      <!-- Deuxième colonne pour afficher les mots et verbes -->
      <div class="col-md-5 col-sm-12 p-2">
        <ExpressionsTable :paginatedAllWordsVerbs="paginatedAllWordsVerbs" />
        <Pagination
          :currentPage="currentPageAllWordsVerbs"
          :totalPages="totalPagesAllWordsVerbs"
          @pageChange="changePageAllWordsVerbs"
        />
      </div>

      <div class="col-md-1">
        <MenuSecondaire />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
/*import Pagination from "@/components/Pagination.vue";
import SearchForm from "@/components/SearchForm.vue";
import SearchResults from "@/components/SearchResults.vue";
import ExpressionsTable from "@/components/ExpressionsTable.vue";*/

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
    const response = await fetch(
      `/api/words?query=${query.value}&language=${language.value}`
    );
    const result = await response.json();
    items.value = result;
  } catch (error) {
    console.error("Erreur lors de la récupération des mots et verbes :", error);
    items.value = [];
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
