<template>
  <div class="container mt-5">
    <!-- Titre principal -->
    <div class="text-center mb-4">
      <!-- <h2 class="display-4 text-primary">Lexique Kikongo</h2>-->
      <LogoSlogan />
      <p class="lead">
        Recherchez des mots et verbes en Kikongo et découvrez leurs
        significations.
      </p>
    </div>

    <!-- Section de recherche et résultats -->
    <div class="row justify-content-center mb-4">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <div class="card shadow-sm p-4 mb-4">
          <h4 class="card-title text-left text-primary">Recherche</h4>
          <SearchingForm @search="handleSearch" />
        </div>

        <!-- Résultats de recherche -->
        <div v-if="paginatedWords.length" class="card shadow-sm p-4 mb-4">
          <h4 class="card-title text-center text-primary">
            Résultats de la recherche
          </h4>
          <SearchingResults :paginatedWords="paginatedWords" />
          <Pagination
            :currentPage="currentPage"
            :totalPages="totalPages"
            @pageChange="changePage"
          />
        </div>

        <!-- Message si aucun résultat et une recherche a été effectuée -->
        <div
          v-else-if="query && !paginatedWords.length"
          class="alert alert-info mt-4 text-center"
        >
          Aucun mot trouvé.
        </div>
      </div>
    </div>

    <AdminButtons />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useHead } from "#app"; // Importation de useHead pour Nuxt 3
import LogoSlogan from "@/components/LogoSlogan.vue";
import SearchingForm from "@/components/SearchingForm.vue";
import SearchingResults from "@/components/SearchingResults.vue";
import Pagination from "@/components/Pagination.vue";
import AdminButtons from "@/components/AdminButtons.vue";

// Configuration des meta tags SEO
useHead({
  title: "Lexikongo - Lexique Kikongo en ligne",
  meta: [
    {
      name: "description",
      content:
        "Recherchez des mots et verbes en Kikongo et découvrez leurs significations.",
    },
    {
      name: "keywords",
      content:
        "Kikongo, dictionnaire, lexique, recherche, mots, verbes, lexikongo, langue, Congo",
    },
    {
      name: "author",
      content: "Lexikongo",
    },
    // Vous pouvez ajouter d'autres meta tags si nécessaire
  ],
});

const query = ref("");
const language = ref("kikongo");
const items = ref([]);
const currentPage = ref(1);
const pageSize = 15;

const handleSearch = async ({
  query: searchQuery,
  language: selectedLanguage,
}) => {
  query.value = searchQuery;
  language.value = selectedLanguage;
  currentPage.value = 1; // Réinitialiser la page actuelle lors d'une nouvelle recherche
  await fetchWords();
};

const fetchWords = async () => {
  if (!query.value) {
    items.value = [];
    return;
  }

  try {
    // Effectuer une recherche à la fois sur les mots et les verbes
    const response = await fetch(
      `/api/all-words-verbs?query=${encodeURIComponent(query.value)}&language=${
        language.value
      }&type=all`
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.statusText}`);
    }

    const result = await response.json();

    if (!Array.isArray(result)) {
      throw new Error("Le format des données retournées n'est pas valide");
    }

    items.value = result;
  } catch (error) {
    console.error("Erreur lors de la récupération des mots et verbes :", error);
    items.value = []; // Réinitialiser en cas d'erreur
  }
};

const paginatedWords = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return items.value.slice(start, start + pageSize);
});

const totalPages = computed(() => Math.ceil(items.value.length / pageSize));

const changePage = (page) => {
  currentPage.value = page;
};
</script>

<style scoped>
/* Variables CSS pour les couleurs */
:root {
  --primary-color: #007bff;
  --hover-primary: #0056b3;
  --secondary-color: #a52a2a;
  --dark-color: #2a0600;
  --highlight-color: #28a745;
  --text-default: #03080d;
  --third-color: #ff4500;
}

/* Harmonisation des couleurs avec admin/index.vue */
.card-title {
  font-size: 1.25rem;
  color: var(
    --primary-color
  ); /* Utilisation de la variable CSS pour la couleur */
}

/* Alertes et messages */
.alert {
  font-size: 1rem;
  text-align: center;
}

/* Espacement entre les cartes */
.card {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Responsivité */
@media (max-width: 768px) {
  .card-title {
    font-size: 1.15rem; /* Taille réduite des titres pour tablettes */
  }
  h2 {
    font-size: 2rem; /* Taille réduite du titre principal sur tablettes */
  }
  .lead {
    font-size: 1rem; /* Réduction du texte principal pour tablettes */
  }
}

@media (max-width: 576px) {
  .card-title {
    font-size: 1rem; /* Taille réduite des titres pour mobiles */
  }
  h2 {
    font-size: 1.75rem; /* Taille du titre principal pour mobiles */
  }
  .lead {
    font-size: 0.875rem; /* Réduction du texte principal pour mobiles */
  }
}
</style>
