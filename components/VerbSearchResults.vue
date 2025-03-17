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
            <th scope="col">Infinitif</th>
            <th scope="col">Phonétique</th>
            <th scope="col">Français</th>
            <th scope="col">Anglais</th>
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
            :aria-label="`Voir les détails du verbe ${
              verb.singular || 'verbe inconnu'
            }`"
            class="link-row"
          >
            <td>
              <span class="searchedExpression">{{ verb.singular || "-" }}</span>
            </td>
            <td>
              <span class="phonetic-text">{{ verb.phonetic || "-" }}</span>
            </td>
            <td>
              <span class="translation-text">{{
                verb.translation_fr || "-"
              }}</span>
            </td>
            <td>
              <span class="translation-text">{{
                verb.translation_en || "-"
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
    <div
      v-else-if="searchPerformed && !paginatedVerbs.length"
      class="mt-4 text-center"
    >
      <div class="alert alert-info" role="alert">
        Aucun verbe trouvé pour votre recherche.
      </div>
    </div>

    <!-- Message d'erreur -->
    <div v-if="errorMessage" class="alert alert-danger mt-4" role="alert">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import Pagination from "@/components/Pagination.vue";
import { useRouter } from "vue-router";

const props = defineProps({
  results: {
    type: Array,
    default: () => [], // Par défaut, un tableau vide
  },
});

const verbs = ref([]); // Liste des verbes
const searchPerformed = ref(false); // Indique si une recherche a été effectuée
const errorMessage = ref(null); // Message d'erreur

const currentPage = ref(1); // Page actuelle
const pageSize = 15; // Nombre d'éléments par page

const router = useRouter();

// Naviguer vers les détails d'un verbe
const goToDetails = (slug) => {
  if (!slug) {
    errorMessage.value = "Une erreur s'est produite : identifiant introuvable.";
    return;
  }
  router.push(`/details/verb/${slug}`);
};

// Changer de page
const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
  } else {
    errorMessage.value = "Numéro de page invalide.";
  }
};

// Calcul des verbes paginés
const paginatedVerbs = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return verbs.value.slice(start, start + pageSize);
});

// Calcul du nombre total de pages
const totalPages = computed(() => Math.ceil(verbs.value.length / pageSize));

// Watcher pour surveiller les changements de props.results
watch(
  () => props.results,
  (newResults) => {
    console.log("Nouveaux résultats reçus :", newResults);
    if (Array.isArray(newResults)) {
      verbs.value = newResults;
      searchPerformed.value = true;
      errorMessage.value = null; // Réinitialise le message d'erreur
      currentPage.value = 1; // Réinitialiser à la première page
    } else {
      errorMessage.value = "Format de données inattendu. Veuillez réessayer.";
    }
  },
  { immediate: true }
);
</script>


<style scoped>
/* Aucun style redondant ici */
/* Tout repose sur les classes et variables globales de `global.css` */
</style>
