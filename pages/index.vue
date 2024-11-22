<template>
  <div class="container mt-5">
    <!-- Titre principal -->
    <header class="text-center mb-4">
      <h1 class="display-4 text-primary mb-4 mt-4">
        <i class="fa-solid fa-magnifying-glass"></i> Recherche de mots et verbes
      </h1>
      <p class="lead">
        Recherchez, dans le formulaire ci-dessous, des mots et verbes en Kikongo
        et découvrez leurs significations.
      </p>
      <LogoSlogan />
    </header>

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
      <!-- Appel à l'action -->
      <section class="text-center mt-4">
        <p class="text-default">
          Vous ne trouvez pas ce que vous cherchez ? <br />
          Contribuez à enrichir le lexique en ajoutant de nouveaux mots ou
          verbes.
        </p>
        <NuxtLink
          to="/for-contributors"
          class="btn btn-outline-success btn-lg me-3"
        >
          <i class="fas fa-hands-helping me-2"></i> Rejoignez les Contributeurs
        </NuxtLink>
        <NuxtLink to="/contact" class="btn btn-outline-primary btn-lg">
          <i class="fas fa-envelope me-2"></i> Contactez-nous
        </NuxtLink>
      </section>
    </div>

    <section class="text-center mt-4 mb-4">
      <SearchButtons />
      <ContributorButtons />
      <AdminButtons />
    </section>
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
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Lexikongo - Explorez le Lexique Kikongo Complet",
  description:
    "Accédez à un lexique complet des mots et expressions en Kikongo avec des traductions précises en français et en anglais. Découvrez la richesse de cette langue africaine.",
  url: "https://www.lexikongo.fr",
  image: "https://www.lexikongo.fr/images/text_logo@1x.webp",
  inLanguage: "fr",
  publisher: {
    "@type": "Organization",
    name: "Lexikongo",
    url: "https://www.lexikongo.fr",
    logo: {
      "@type": "ImageObject",
      url: "https://www.lexikongo.fr/images/text_logo@1x.webp",
      width: 200,
      height: 200,
    },
  },
  mainEntity: {
    "@type": "CreativeWork",
    headline: "Lexikongo - Le Lexique Kikongo à Portée de Main",
    text: "Lexikongo offre un dictionnaire complet des mots, verbes et expressions en Kikongo, avec des traductions en français et en anglais, ainsi que des informations phonétiques et étymologiques.",
    author: {
      "@type": "Organization",
      name: "Lexikongo",
    },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.lexikongo.fr/words?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
  about: {
    "@type": "Thing",
    name: "Kikongo Language",
    sameAs: [
      "https://en.wikipedia.org/wiki/Kikongo",
      "https://fr.wikipedia.org/wiki/Kikongo",
    ],
  },
};

// Configuration des meta tags SEO
useHead({
  title: "Lexikongo - Découvrez le Lexique Complet en Kikongo",
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify(jsonLd),
    },
  ],
  meta: [
    {
      name: "description",
      content:
        "Explorez le lexique complet des mots en Kikongo avec leurs significations en français et en anglais. Apprenez la phonétique et l'étymologie des mots Kikongo.",
    },
    {
      name: "keywords",
      content:
        "Kikongo, lexique Kikongo, mots Kikongo, verbes kikongo, langue africaine, Congo, patrimoine, culture, dictionnaire Kikongo, traduction Kikongo, culture africaine, expressions Kikongo, Kikongo - Français",
    },
    {
      name: "author",
      content: "Lexikongo",
    },
    {
      name: "robots",
      content: "index, follow",
    },
    // Meta tags Open Graph pour les réseaux sociaux
    {
      property: "og:title",
      content: "Lexikongo - Découvrez le Lexique Complet en Kikongo",
    },
    {
      property: "og:description",
      content:
        "Accédez à un dictionnaire complet en Kikongo avec des traductions précises en français et en anglais. Explorez la richesse de cette langue africaine.",
    },
    {
      property: "og:image",
      content: "https://www.lexikongo.fr/images/text_logo@1x.webp",
    },
    {
      property: "og:url",
      content: "https://www.lexikongo.fr",
    },
    {
      property: "og:type",
      content: "website",
    },
    // Twitter meta tags
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Lexikongo - Explorez le Lexique Complet en Kikongo",
    },
    {
      name: "twitter:description",
      content:
        "Découvrez le lexique complet des mots en Kikongo avec des traductions en français et en anglais. Une ressource pour préserver cette langue africaine.",
    },
    {
      name: "twitter:image",
      content: "https://www.lexikongo.fr/images/text_logo@1x.webp",
    },
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
