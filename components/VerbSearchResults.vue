<template>
  <div>
    <!-- Affichage des résultats paginés -->
    <div v-if="paginatedVerbs.length" class="table-responsive">
      <table
        class="table table-hover"
        role="table"
        aria-label="Résultats de recherche pour les verbes"
      >
        <thead>
          <tr>
            <th>Infinitif</th>
            <th>Phonétique</th>
            <th>Français</th>
            <th>Anglais</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="verb in paginatedVerbs"
            :key="verb.slug"
            @click="goToDetails(verb.slug)"
            @keydown.enter="goToDetails(verb.slug)"
            @keydown.space.prevent="goToDetails(verb.slug)"
            tabindex="0"
            role="button"
            :aria-label="`Voir les détails du verbe ${verb.singular}`"
            class="link-row"
          >
            <td>
              <span class="searchedExpression">{{ verb.singular }}</span>
            </td>
            <td>
              <span class="phonetic-text">{{ verb.phonetic || " " }}</span>
            </td>
            <td>
              <span class="translation-text">{{
                verb.translation_fr || " "
              }}</span>
            </td>
            <td>
              <span class="translation-text">{{
                verb.translation_en || " "
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
      <div class="alert alert-info" role="alert">Aucun verbe trouvé.</div>
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
import { useRouter } from "vue-router";

const props = defineProps({
  searchQuery: {
    type: String,
    default: "",
  },
});

const verbs = ref([]);
const searchPerformed = ref(false);
const error = ref(null);

const currentPage = ref(1);
const pageSize = 15;

const router = useRouter();

// Fonction pour naviguer vers les détails d'un verbe
const goToDetails = (slug) => {
  if (!slug) {
    console.error("Slug est indéfini pour cet élément");
    return;
  }
  router.push(`/details/verb/${slug}`);
};

// Fonction pour changer de page
const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Calcul des verbes paginés
const paginatedVerbs = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return verbs.value.slice(start, start + pageSize);
});

// Calcul du nombre total de pages
const totalPages = computed(() => Math.ceil(verbs.value.length / pageSize));

// Fonction pour récupérer les verbes depuis l'API
const fetchVerbs = async () => {
  if (!props.searchQuery.trim()) {
    verbs.value = [];
    searchPerformed.value = false;
    error.value = null;
    return;
  }

  try {
    const response = await fetch(
      `/api/search-verbs?query=${encodeURIComponent(props.searchQuery)}`
    );
    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

    const result = await response.json();
    verbs.value = result;
    searchPerformed.value = true;
    error.value = null;
    currentPage.value = 1; // Réinitialiser à la première page
  } catch (err) {
    verbs.value = [];
    searchPerformed.value = true;
    error.value = "Erreur lors de la récupération des verbes.";
  }
};

// Watcher pour réagir aux changements de searchQuery
watch(
  () => props.searchQuery,
  () => {
    fetchVerbs();
  },
  { immediate: true }
);
</script>

<style scoped>
/* Aucun style redondant ici */
/* Tout repose sur les classes et variables globales de `global.css` */
</style>
