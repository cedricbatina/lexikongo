<!-- /components/VerbSearchResults.vue -->

<template>
  <div>
    <!-- Affichage des résultats paginés -->
    <div v-if="paginatedVerbs.length">
      <table class="table table-hover">
        <thead>
          <tr>
            <th class="text-primary">Singulier</th>
            <th class="text-primary">Phonétique</th>
            <th class="text-primary">Français</th>
            <th class="text-primary">Anglais</th>
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
            :aria-label="`Voir les détails de ${verb.singular}`"
            class="link-row"
          >
            <td>{{ verb.singular }}</td>
            <td>{{ verb.phonetic || "-" }}</td>
            <td>{{ verb.translation_fr || "-" }}</td>
            <td>{{ verb.translation_en || "-" }}</td>
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
    <div v-else-if="searchPerformed" class="mt-4">
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

const words = ref([]);
const searchPerformed = ref(false);
const error = ref(null);

const currentPage = ref(1);
const pageSize = 15;

const router = useRouter();

// Fonction pour troncature du texte (si nécessaire)
const truncateText = (text, limit) => {
  if (!text) return "-";
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};

// Fonction pour naviguer vers les détails d'un verbe
const goToDetails = (slug) => {
  console.log("Navigating to verb details:", `/details/verb/${slug}`);
  router.push(`/details/verb/${slug}`);
};

// Fonction pour changer de page
const changePage = (page) => {
  console.log(`Changement de page vers: ${page}`);
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Calcul des verbes paginés
const paginatedVerbs = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  console.log(
    `Page ${currentPage.value}:`,
    props.searchQuery,
    words.value.slice(start, end)
  );
  return words.value.slice(start, end);
});

// Calcul du nombre total de pages
const totalPages = computed(() => Math.ceil(words.value.length / pageSize));

// Fonction pour fetch les verbes depuis l'API
const fetchVerbs = async () => {
  console.log("fetchVerbs appelé avec la query:", props.searchQuery);
  if (!props.searchQuery || props.searchQuery.trim() === "") {
    words.value = [];
    searchPerformed.value = false;
    error.value = null;
    console.log("Recherche vide, réinitialisation des verbes.");
    return;
  }

  try {
    console.log(`Appel à l'API avec la query: ${props.searchQuery}`);
    const response = await fetch(
      `/api/search-verbs?query=${encodeURIComponent(props.searchQuery)}`
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const result = await response.json();
    console.log("Données reçues de l'API pour verbes :", result);

    words.value = result; // Assignation directe sans filtrage
    searchPerformed.value = true;
    error.value = null;
    console.log("Verbes assignés:", words.value);
    currentPage.value = 1; // Réinitialiser la pagination à la première page
  } catch (err) {
    console.error("Erreur lors de la récupération des verbes :", err);
    words.value = [];
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
/* Variables CSS */
:root {
  --primary-color: #007bff;
  --hover-primary: #0056b3;
  --secondary-color: #a52a2a;
  --dark-color: #2a0600;
  --highlight-color: #28a745;
  --text-default: #03080d;
  --third-color: #ff4500;
}

/* Styles généraux */
.list-group-item {
  border: none;
  padding: 0;
  background-color: transparent;
}

.list-group-button {
  width: 100%;
  text-align: left;
  border: 1px solid #e0e0e0;
  padding: 1rem;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: block;
}

.list-group-button:hover {
  background-color: #f9f9f9;
}

.searchedExpression {
  color: var(--secondary-color);
  font-weight: 500;
}

.translation_fr,
.translation_en {
  font-weight: 400;
  font-size: 0.9rem;
  color: var(--text-default);
}

.notice {
  font-size: 0.85rem;
  margin-right: 0.25rem;
}

.translations {
  margin-top: 0.5rem;
}

.alert {
  font-size: 1rem;
}

/* Responsivité */
@media (max-width: 576px) {
  .list-group-button {
    padding: 0.75rem;
  }

  .notice {
    font-size: 0.8rem;
  }

  .translation_fr,
  .translation_en {
    font-size: 1rem;
    color: var(--dark-color);
  }
}
</style>
