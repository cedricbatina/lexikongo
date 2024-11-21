<template>
  <div class="container mt-5">
    <!-- Titre principal -->
    <div class="text-center mb-4">
      <h2 class="display-4 text-orange">Lexique Kikongo</h2>
      <p class="lead">
        Explorez les mots et verbes en Kikongo et découvrez leurs
        significations.
      </p>
    </div>

    <!-- Colonne pour afficher les mots et verbes -->
    <div class="row justify-content-center">
      <div class="col-lg-10 col-md-12">
        <div class="card shadow-sm p-3">
          <h4 class="card-title text-left text-primary">
            Tous les Mots et Verbes
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
import Pagination from "@/components/Pagination.vue";
import ExpressionsTable from "@/components/ExpressionsTable.vue";

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

<style scoped>
.card {
  border: none;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.25rem;
  color: #007bff;
  text-align: center;
}

.display-4 {
  font-size: 2.5rem;
  color: #ff8a1d;
}

.lead {
  font-size: 1.25rem;
  color: #666;
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
