<template>
  <div class="container mt-5">
    <!-- Titre principal -->
    <header class="text-center mb-4">
      <h1 class="display-4 text-primary mb-4 mt-4">
        <i class="fa-solid fa-magnifying-glass me-2"></i> Recherche de mots et
        verbes
      </h1>
      <p class="lead">
        Recherchez des mots et verbes en Kikongo, Français ou Anglais, et
        découvrez leurs significations.
      </p>
    </header>
    <section class="text-center mt-5 mb5">
      <SearchButtons />
      <ContributorButtons />
      <AdminButtons />
    </section>

    <!-- Formulaire de recherche -->
    <div class="row justify-content-center mb-4">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <div class="card shadow-sm p-4 mb-4">
          <h2 class="card-title text-left text-primary">
            <i class="fa-solid fa-magnifying-glass"></i> Recherche
          </h2>
          <SearchingForm @search="handleSearch" />
        </div>
      </div>
    </div>

    <!-- Résultats de recherche -->
    <div v-if="filteredResults.length" class="card shadow-sm p-4 mb-4">
      <h3 class="card-title text-center text-primary">
        Résultats de la recherche
      </h3>
      <SearchingResults :data="filteredResults" :columns="columns" />
    </div>

    <!-- Aucun résultat trouvé -->
    <div v-else-if="searchQuery" class="alert alert-info mt-4 text-center">
      Aucun mot ou verbe trouvé pour votre recherche.
    </div>
    <!-- Appel à l'action -->
    <section class="text-center mt-4">
      <p class="text-default">
        Vous ne trouvez pas l'expression que vous cherchez ? <br />
        Contribuez à enrichir le lexique en ajoutant de nouveaux mots ou verbes.
      </p>
      <NuxtLink
        to="/documentation/for-contributors"
        class="btn btn-outline-success btn-lg me-3"
      >
        <i class="fas fa-hands-helping me-2"></i> Rejoignez les Contributeurs
      </NuxtLink>
      <NuxtLink to="/contact" class="btn btn-outline-primary btn-lg">
        <i class="fas fa-envelope me-2"></i> Contactez-nous
      </NuxtLink>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import LogoSlogan from "@/components/LogoSlogan.vue";
import SearchingForm from "@/components/SearchingForm.vue";
import SearchingResults from "@/components/SearchingResults.vue";

const searchQuery = ref(""); // Contient le texte de recherche
const results = ref([]); // Contient les résultats de l'API

// Colonnes pour SearchingResults
const columns = [
  { label: "Type", key: "type" },
  { label: "Singulier", key: "singular" },
  { label: "Pluriel", key: "plural" },
  { label: "Phonétique", key: "phonetic" },
  { label: "Français", key: "translation_fr" },
  { label: "Anglais", key: "translation_en" },
];

// Résultats filtrés pour l'affichage
const filteredResults = computed(() => {
  if (!searchQuery.value) return [];
  return results.value.filter(
    (item) =>
      item.singular.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (item.translation_fr &&
        item.translation_fr
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())) ||
      (item.translation_en &&
        item.translation_en
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()))
  );
});

// Gestion de la recherche
const handleSearch = async ({ query, language, mode }) => {
  searchQuery.value = query; // Mise à jour de la recherche
  try {
    const response = await fetch(
      `/api/all-words-verbs?query=${encodeURIComponent(
        query
      )}&language=${language}&mode=${mode}`
    );
    const data = await response.json();
    results.value = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Erreur lors de la recherche :", error);
  }
};
</script>




<!---<script setup>
import { ref, computed } from "vue";
import { useHead } from "#app"; // Importation de useHead pour Nuxt 3
import LogoSlogan from "@/components/LogoSlogan.vue";
import SearchingForm from "@/components/SearchingForm.vue";
import SearchingResults from "@/components/SearchingResults.vue";
import Pagination from "@/components/Pagination.vue";

// État global pour gérer la recherche et la pagination
const searchQuery = ref("");
const selectedLanguage = ref("kikongo");
const items = ref([]); // Contient les résultats de recherche
const currentPage = ref(1);

const pageSize = 15; // Nombre de résultats par page

// Fonction pour récupérer les mots et verbes via l'API
const fetchWordsAndVerbs = async (query, language, mode) => {
  try {
    const response = await fetch(
      `/api/all-words-verbs?query=${encodeURIComponent(
        query
      )}&language=${encodeURIComponent(language)}&mode=${encodeURIComponent(
        mode
      )}`
    );
    const data = await response.json();
    items.value = Array.isArray(data) ? data : []; // Mettez à jour les résultats
    currentPage.value = 1; // Réinitialisez à la première page après une nouvelle recherche
  } catch (error) {
    console.error("Erreur lors de la récupération des mots et verbes :", error);
    items.value = []; // Videz les résultats en cas d'erreur
  }
};

// Gestion de l'événement de recherche déclenché par SearchingForm
const handleSearch = ({ query, language, mode }) => {
  searchQuery.value = query;
  selectedLanguage.value = language;
  fetchWordsAndVerbs(query, language, mode);
};

// Calcul des résultats paginés
const paginatedWords = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return items.value.slice(start, start + pageSize);
});

// Calcul du nombre total de pages
const totalPages = computed(() => Math.ceil(items.value.length / pageSize));

// Fonction pour changer de page
const changePage = (page) => {
  currentPage.value = page;
};

// Configuration des meta tags SEO
useHead({
  title: "Lexikongo - Découvrez le Lexique Complet en Kikongo",
  meta: [
    {
      name: "description",
      content:
        "Explorez les mots et verbes en Kikongo avec leurs significations en français et anglais.",
    },
  ],
});
</script>-->


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
