<template>
  <div class="container">
    <div class="row">
      <!-- Première colonne avec le formulaire de recherche -->
      <div class="col-md-4 col-sm-12 mt-4">
        <SearchForm @search="handleSearch" />
        <!-- Affichage des résultats de recherche -->
        <div v-if="paginatedWords.length">
          <ul class="list-group mt-4">
            <li
              v-for="item in paginatedWords"
              :key="item.id"
              class="list-group-item"
            >
              <span v-if="item.type === 'word'"
                ><small class="notice fw-bold">Subst. : </small>
                <span class="searched-word fw-bold">{{
                  item.singular + " - " + item.plural
                }}</span></span
              >
              <span v-else-if="item.type === 'verb'"
                ><small class="notice fw-bold">Verb : </small>
                <span class="searched-word">{{ item.singular }}</span></span
              >
              <br />
              <small class="notice text-primary">FR : </small>
              <span v-if="item.translation_fr">{{ item.translation_fr }}</span>
              <br />
              <small class="notice text-primary">EN : </small>
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
          <div class="alert alert-info">Aucun mot trouvé.</div>
        </div>
      </div>
      <div class="col-md-2">
        <nuxt-link to="/words">Voir les Mots</nuxt-link>
        <nuxt-link to="/verbs">Voir les Verbes</nuxt-link>
      </div>

      <!-- Deuxième colonne pour afficher les mots et verbes -->
      <div class="col-md-6 col-sm-12">
        <!-- Tableau pour afficher les mots et verbes -->
        <table class="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Sing.</th>
              <th>Plur.</th>
              <th>Phon.</th>
              <th>Fr.</th>
              <th>En.</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in paginatedAllWordsVerbs" :key="item.id">
              <td>
                <span class="searched-word notice">{{
                  item.type === "word" ? "Subst." : "Verb"
                }}</span>
              </td>
              <td>{{ item.singular }}</td>
              <td>{{ item.plural || "-" }}</td>
              <td>{{ item.phonetic }}</td>
              <td>{{ item.translation_fr || "-" }}</td>
              <td>{{ item.translation_en || "-" }}</td>
              <td>
                <router-link :to="`/details/${item.type}/${item.id}`">
                  <button class="btn btn-primary fw-bold details">+</button>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
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
const pageSizeAllWordsVerbs = 60;

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
.input-group {
  display: flex;
  align-items: stretch; /* Assure que l'input et le select sont de même hauteur */
}

.input-group .form-control {
  flex: 3; /* Input occupe 3 parts */
}

.input-group .form-select {
  flex: 1; /* Select occupe 1 part */
}

.input-group .btn-clear {
  flex: 1; /* Le bouton occupe 1 part */
}
th {
  color: #ff8a1d;
  font-weight: 400;
}
</style>