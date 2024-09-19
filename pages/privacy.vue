<template>
  <div class="container">
    <div class="row">
      <!-- Première colonne avec le formulaire de recherche -->
      <div class="col-md-6">
        <SearchForm @search="handleSearch" />
        <!-- Affichage des résultats de recherche -->
        <div v-if="paginatedWords.length">
          <ul class="list-group mt-4">
            <li
              v-for="item in paginatedWords"
              :key="item.id"
              class="list-group-item"
            >
              <span v-if="item.type === 'word'" class="searched-word"
                >Mot: {{ item.singular || item.plural }}</span
              >
              <span v-else-if="item.type === 'verb'" class="searched-word"
                >Verbe: {{ item.singular }}</span
              >
              <br />
              <small class="fw-bold notice">FR : </small>
              <span v-if="item.translation_fr">{{ item.translation_fr }}</span>
              <br />
              <small class="fw-bold notice">EN : </small>
              <span v-if="item.translation_en">{{ item.translation_en }}</span>
            </li>
          </ul>
          <Pagination
            :currentPage="currentPage"
            :totalPages="totalPages"
            @pageChange="changePage"
          />
        </div>

        <!-- Message si aucun mot n'est trouvé -->
        <div v-else class="mt-4">
          <div class="alert alert-info">Aucune expression trouvée.</div>
        </div>
      </div>

      <!-- Deuxième colonne pour afficher les mots et verbes -->
      <div class="col-md-6">
        <h3>Mots et Verbes</h3>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Singulier</th>
              <th>Pluriel</th>
              <th>Phonétique</th>
              <th>Traduction FR</th>
              <th>Traduction EN</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in paginatedAllWordsVerbs" :key="item.id">
              <td>{{ item.singular }}</td>
              <td>{{ item.plural }}</td>
              <td>{{ item.phonetic }}</td>
              <td>{{ item.translation_fr || "N/A" }}</td>
              <td>{{ item.translation_en || "N/A" }}</td>
            </tr>
          </tbody>
        </table>
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
import Pagination from "@/components/Pagination.vue";
import SearchForm from "@/components/SearchForm.vue";

const query = ref("");
const language = ref("kikongo"); // Langue par défaut
const items = ref([]); // Fusion des mots et des verbes dans un tableau unique
const currentPage = ref(1);
const pageSize = 15; // Nombre d'éléments par page

const handleSearch = async ({
  query: searchQuery,
  language: selectedLanguage,
}) => {
  query.value = searchQuery;
  language.value = selectedLanguage;
  await fetchWords(); // Lancer la recherche avec la nouvelle requête
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
    items.value = result; // Charger à la fois les mots et les verbes
  } catch (error) {
    console.error("Erreur lors de la récupération des mots et verbes :", error);
    items.value = [];
  }
};

// Pagination des résultats de recherche
const paginatedWords = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return items.value.slice(start, start + pageSize);
});

const totalPages = computed(() => Math.ceil(items.value.length / pageSize));

const changePage = (page) => {
  currentPage.value = page;
};

// Chargement initial des mots
onMounted(async () => {
  await fetchWords(); // Charger initialement les mots
});

// Partie pour la 2e colonne (mots et verbes de la DB)
const allWordsVerbs = ref([]);
const currentPageAllWordsVerbs = ref(1);
const pageSizeAllWordsVerbs = 15;

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

// Chargement initial des mots et verbes
onMounted(async () => {
  await fetchAllWordsVerbs();
});
</script>
<style scoped>
.searched-word {
  color: #ff8a1d;
}
.notice {
  font-size: xx-small;
}
</style>