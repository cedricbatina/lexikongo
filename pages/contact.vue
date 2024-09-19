<template>
  <div class="container">
    <div class="row">
      <!-- Formulaire de recherche et ses résultats dans la première colonne -->
      <div class="col-md-6">
        <SearchForm @search="handleSearch" />

        <!-- Affichage des résultats paginés -->
        <div v-if="paginatedWords.length">
          <ul class="list-group">
            <li
              v-for="item in paginatedWords"
              :key="item.id"
              class="list-group-item"
            >
              <span v-if="item.type === 'word'">
                Mot: {{ item.singular || item.plural }}
              </span>
              <span v-else-if="item.type === 'verb'">
                Verbe: {{ item.singular }}
              </span>
              <br />
              <strong>Traduction:</strong> {{ item.translation }}
            </li>
          </ul>
          <Pagination
            :currentPage="currentPage"
            :totalPages="totalPages"
            @pageChange="changePage"
          />
        </div>

        <div v-else>
          <div class="alert alert-info" role="alert">
            Aucune expression trouvée.
          </div>
        </div>
      </div>

      <!-- Deuxième colonne pour afficher les mots et verbes avec pagination -->
      <div class="col-md-6">
        <h3>Mots et Verbes (limite 30)</h3>
        <table class="table table-hover">
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
            <tr v-for="item in paginatedWordsVerbs" :key="item.id">
              <td>{{ item.singular }}</td>
              <td>{{ item.plural || "-" }}</td>
              <td>{{ item.phonetic || "-" }}</td>
              <td>{{ item.translation_fr || "-" }}</td>
              <td>{{ item.translation_en || "-" }}</td>
            </tr>
          </tbody>
        </table>
        <Pagination
          :currentPage="currentAllPage"
          :totalPages="totalAllPages"
          @pageChange="changeAllPage"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const query = ref("");
const language = ref("kikongo"); // Langue par défaut
const items = ref([]); // Fusion des mots et des verbes dans un tableau unique
const currentPage = ref(1);
const pageSize = ref(15); // Nombre d'éléments par page
const allWordsVerbs = ref([]); // Données de la deuxième section
const currentAllPage = ref(1);
const allPageSize = ref(30);

// Fonction pour récupérer les résultats de la recherche
const handleSearch = async ({
  query: searchQuery,
  language: selectedLanguage,
}) => {
  query.value = searchQuery;
  language.value = selectedLanguage;
  await fetchWords(); // Lancer la recherche avec la nouvelle requête
};

// Fonction pour récupérer les mots et verbes selon la recherche
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

// Fonction pour récupérer tous les mots et verbes avec pagination
const fetchAllWordsVerbs = async () => {
  try {
    const response = await fetch(
      `/api/all-words-verbs?page=${currentAllPage.value}&pageSize=${allPageSize.value}`
    );
    const result = await response.json();
    allWordsVerbs.value = result;
  } catch (error) {
    console.error("Erreur lors de la récupération des mots et verbes :", error);
    allWordsVerbs.value = [];
  }
};

// Pagination pour les résultats de la recherche
const paginatedWords = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return items.value.slice(start, start + pageSize.value);
});

const totalPages = computed(() =>
  Math.ceil(items.value.length / pageSize.value)
);

// Pagination pour tous les mots et verbes
const paginatedWordsVerbs = computed(() => {
  return allWordsVerbs.value;
});

const totalAllPages = computed(() =>
  Math.ceil(allWordsVerbs.value.length / allPageSize.value)
);

// Fonction pour changer de page pour la recherche
const changePage = (page) => {
  currentPage.value = page;
  fetchWords(); // Recharger les résultats de recherche pour la nouvelle page
};

// Fonction pour changer de page pour tous les mots et verbes
const changeAllPage = (page) => {
  currentAllPage.value = page;
  fetchAllWordsVerbs(); // Recharger les mots et verbes pour la nouvelle page
};

// Récupérer les données au montage du composant
onMounted(async () => {
  await fetchWords(); // Récupérer les résultats initiaux de la recherche
  await fetchAllWordsVerbs(); // Récupérer les mots et verbes initiaux
});
</script>
