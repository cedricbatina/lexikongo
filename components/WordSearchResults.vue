<template>
  <div>
    <!-- Affichage des résultats paginés -->
    <div v-if="paginatedWords.length">
      <table class="table table-hover">
        <thead>
          <tr>
            <th class="text-primary">Singulier</th>
            <th class="text-primary">Pluriel</th>
            <th class="text-primary">Phonétique</th>
            <th class="text-primary">Français</th>
            <th class="text-primary">Anglais</th>
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
            :aria-label="`Voir les détails de ${item.singular}`"
            class="link-row"
          >
            <td>{{ item.singular }}</td>
            <td>{{ item.plural || "-" }}</td>
            <td>{{ item.phonetic || "-" }}</td>
            <td>{{ item.translation_fr || "-" }}</td>
            <td>{{ item.translation_en || "-" }}</td>
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
import WordList from "@/components/WordList.vue";
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
  console.log("fetchWords called with query:", props.searchQuery);
  if (!props.searchQuery || props.searchQuery.trim() === "") {
    words.value = [];
    searchPerformed.value = false;
    error.value = null;
    console.log("Recherche vide, réinitialisation des mots.");
    return;
  }

  try {
    console.log(`Appel à l'API avec query: ${props.searchQuery}`);
    const response = await fetch(
      `/api/search-words?query=${encodeURIComponent(props.searchQuery)}`
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const result = await response.json();
    console.log("Données reçues de l'API :", result);

    words.value = result; // Assignation directe sans filtrage
    searchPerformed.value = true;
    error.value = null;
    console.log("Mots assignés:", words.value);
  } catch (err) {
    console.error("Erreur lors de la récupération des mots :", err);
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
