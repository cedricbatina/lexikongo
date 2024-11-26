<template>
  <div>
    <!-- Résultats paginés -->
    <div v-if="paginatedWords.length" class="table-responsive">
      <table
        class="table table-hover"
        role="table"
        aria-label="Résultats de recherche pour les mots en Kikongo"
      >
        <thead>
          <tr>
            <th scope="col">Singulier</th>
            <th scope="col">Pluriel</th>
            <th scope="col">Phonétique</th>
            <th scope="col">Français</th>
            <th scope="col">Anglais</th>
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
            :aria-label="`Voir les détails du mot ${
              item.singular || 'mot inconnu'
            }`"
            class="link-row"
          >
            <td>
              <span class="searchedExpression">{{ item.singular || "-" }}</span>
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
    <div
      v-else-if="searchPerformed && !paginatedWords.length"
      class="mt-4 text-center"
    >
      <div class="alert alert-info" role="alert">
        Aucun mot trouvé pour votre recherche.
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
    default: () => [], // Données de recherche
  },
  mode: {
    type: String,
    default: "auto", // Par défaut, mode de recherche automatique
  },
});

const words = ref([]); // Données affichées
const searchPerformed = ref(false); // Indique si une recherche a été effectuée
const errorMessage = ref(null); // Message d'erreur

const currentPage = ref(1); // Page actuelle
const pageSize = 15; // Nombre d'éléments par page

const router = useRouter();

// Naviguer vers les détails
/*/const goToDetails = (slug) => {
  if (!slug) {
    errorMessage.value = "Une erreur s'est produite : identifiant introuvable.";
    return;
  }
  router.push(`/details/word/${slug}`);
};*/
const goToDetails = (slug) => {
  router.push(`/details/word/${slug}`);
};

// Changer de page
const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
  } else {
    errorMessage.value = "Numéro de page invalide.";
  }
};

// Calculer les mots paginés
const paginatedWords = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return words.value.slice(start, start + pageSize);
});

// Calculer le nombre total de pages
const totalPages = computed(() => Math.ceil(words.value.length / pageSize));

// Watcher pour surveiller les changements de `props.results`
watch(
  () => props.results,
  (newResults) => {
    if (Array.isArray(newResults)) {
      words.value = newResults;
      searchPerformed.value = true;
      errorMessage.value = null;
      currentPage.value = 1; // Réinitialiser à la première page
    } else {
      errorMessage.value = "Format de données inattendu. Veuillez réessayer.";
    }
  },
  { immediate: true }
);

// Watcher pour détecter le mode de recherche
watch(
  () => props.mode,
  (newMode) => {
    if (newMode === "strict") {
      // Logique pour prendre en charge la recherche stricte
      searchPerformed.value = true;
    }
  }
);
</script>




<style scoped>
/* Style cohérent avec VerbSearchResults */

.link-row {
  cursor: pointer;
}

.link-row:hover {
  background-color: var(--hover-primary);
}
</style>
