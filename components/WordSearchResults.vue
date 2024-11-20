<template>
  <div>
    <!-- Affichage des résultats paginés -->
    <div v-if="paginatedWords.length" class="table-responsive">
      <table
        class="table table-hover"
        role="table"
        aria-label="Résultats de recherche pour les mots"
      >
        <thead>
          <tr>
            <th>Sing.</th>
            <th>Plur.</th>
            <th>Phon.</th>
            <th>Fr.</th>
            <th>En.</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in paginatedWords"
            :key="item.slug"
            @click="goToDetails(item.slug)"
            @keydown.enter="goToDetails(item.slug)"
            @keydown.space.prevent="goToDetails(item.slug)"
            tabindex="0"
            role="button"
            :aria-label="`Voir les détails du mot ${item.singular}`"
            class="link-row"
          >
            <td>
              <span class="searchedExpression">{{ item.singular }}</span>
            </td>
            <td>
              <span class="searchedExpression">{{ item.plural || "-" }}</span>
            </td>
            <td>
              <span class="phonetic-text">{{ item.phonetic || "-" }}</span>
            </td>
            <td>
              <span class="translation-text">{{
                item.translation_fr || "-"
              }}</span>
            </td>
            <td>
              <span class="translation-text">{{
                item.translation_en || "-"
              }}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @pageChange="changePage"
      />
    </div>

    <!-- Message si aucun résultat trouvé -->
    <div v-else-if="searchPerformed" class="mt-4 text-center">
      <div class="alert alert-info" role="alert">Aucun mot trouvé.</div>
    </div>

    <!-- Message d'erreur -->
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import Pagination from "@/components/Pagination.vue";

const props = defineProps({
  searchQuery: {
    type: String,
    default: "",
  },
});

const words = ref([]);
const currentPage = ref(1);
const pageSize = 15;
const searchPerformed = ref(false);
const error = ref(null);

// Fonction pour récupérer les mots depuis l'API
const fetchWords = async () => {
  if (!props.searchQuery.trim()) {
    words.value = [];
    searchPerformed.value = false;
    error.value = null;
    return;
  }

  try {
    const response = await fetch(
      `/api/search-words?query=${encodeURIComponent(props.searchQuery)}`
    );
    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

    const result = await response.json();
    words.value = result;
    searchPerformed.value = true;
    error.value = null;
  } catch (err) {
    words.value = [];
    searchPerformed.value = true;
    error.value = "Erreur lors de la récupération des mots.";
  }
};

// Watcher pour surveiller les changements de searchQuery
watch(
  () => props.searchQuery,
  () => {
    currentPage.value = 1;
    fetchWords();
  },
  { immediate: true }
);

// Calcul des mots paginés
const paginatedWords = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return words.value.slice(start, start + pageSize);
});

// Calcul du nombre total de pages
const totalPages = computed(() => Math.ceil(words.value.length / pageSize));

// Fonction pour changer de page
const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Fonction pour rediriger vers les détails
const goToDetails = (slug) => {
  if (!slug) {
    console.error("Slug est indéfini pour cet élément");
    return;
  }
  window.location.href = `/details/word/${slug}`;
};
</script>

<style scoped>
/* Aucun style redondant ici */
/* Tout repose sur les classes et variables de `global.css` pour les couleurs et la responsivité */
</style>
