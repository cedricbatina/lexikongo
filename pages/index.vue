<template>
  <div class="container mt-5">
    <!-- Titre principal -->
    <header class="text-center mb-4">
      <h1 class="display-4 text-primary mb-4 mt-4">
        <i class="fa-solid fa-magnifying-glass me-2" aria-hidden="true"></i>
        Recherche de mots et verbes
      </h1>
      <p class="lead">
        Recherchez des mots et verbes en Kikongo, Français ou Anglais, et
        découvrez leurs significations.
      </p>
    </header>

    <!-- Formulaire de recherche -->
    <section
      class="row justify-content-center mb-4"
      aria-labelledby="search-section"
    >
      <div class="col-lg-8 col-md-10 col-sm-12">
        <div class="card shadow-sm p-4 mb-4">
          <h2 id="search-section" class="card-title text-left text-primary">
            <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
            Recherche
          </h2>
          <SearchingForm @search="handleSearch" />
        </div>
      </div>
    </section>

    <!-- Résultats de recherche -->
    <section
      v-if="filteredResults.length"
      class="card shadow-sm p-4 mb-4"
      aria-labelledby="results-section"
    >
      <h3 id="results-section" class="card-title text-center text-primary">
        Résultats de la recherche
      </h3>
      <SearchingResults :data="filteredResults" :columns="columns" />
    </section>

    <!-- Aucun résultat trouvé -->
    <section
      v-else-if="searchQuery"
      class="alert alert-info mt-4 text-center"
      aria-live="polite"
    >
      Aucun mot ou verbe trouvé pour votre recherche.
    </section>

    <!-- Appel à l'action -->
    <section class="text-center mt-4" aria-labelledby="contribute-section">
      <p id="contribute-section" class="text-default">
        Vous ne trouvez pas l'expression que vous cherchez ? <br />
        Contribuez à enrichir le lexique en ajoutant de nouveaux mots ou verbes.
      </p>
      <NuxtLink
        to="/documentation/for-contributors"
        class="btn btn-outline-success btn-lg me-3"
        aria-label="Rejoignez les contributeurs pour enrichir le lexique"
      >
        <i class="fas fa-hands-helping me-2" aria-hidden="true"></i>
        Rejoignez les Contributeurs
      </NuxtLink>
      <NuxtLink
        to="/contact"
        class="btn btn-outline-primary btn-lg"
        aria-label="Contactez-nous pour toute assistance ou suggestion"
      >
        <i class="fas fa-envelope me-2" aria-hidden="true"></i>
        Contactez-nous
      </NuxtLink>
    </section>

    <!-- Section des boutons -->
    <section class="text-center mt-5 mb-5">
      <SearchButtons />
      <ContributorButtons />
      <AdminButtons />
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useHead } from "#app";
import LogoSlogan from "@/components/LogoSlogan.vue";
import SearchingForm from "@/components/SearchingForm.vue";
import SearchingResults from "@/components/SearchingResults.vue";
import SearchButtons from "@/components/SearchButtons.vue";
import ContributorButtons from "@/components/ContributorButtons.vue";
import AdminButtons from "@/components/AdminButtons.vue";

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

// SEO Configuration
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Recherche de Mots et Verbes en Kikongo | Lexikongo",
  description:
    "Recherchez des mots et verbes en Kikongo et découvrez leurs significations en français et anglais. Explorez notre base enrichie de mots et verbes Kikongo.",
  url: "https://www.lexikongo.fr/",
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
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.lexikongo.fr/?query={search_term_string}&lang={lang}",
    "query-input": ["required name=search_term_string", "optional name=lang"],
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

useHead({
  title: "Recherche de Mots et Verbes en Kikongo | Lexikongo",
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
        "Recherchez des mots et verbes en Kikongo et découvrez leurs significations en français et anglais. Explorez notre base enrichie de mots et verbes Kikongo.",
    },
    {
      name: "keywords",
      content:
        "Kikongo, mots, verbes, linguistique, traduction, français, anglais, culture africaine, patrimoine linguistique",
    },
    {
      name: "author",
      content: "Lexikongo",
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      property: "og:title",
      content: "Recherche de Mots et Verbes en Kikongo | Lexikongo",
    },
    {
      property: "og:description",
      content:
        "Explorez les mots et verbes en Kikongo avec leurs significations en français et anglais.",
    },
    {
      property: "og:image",
      content: "https://www.lexikongo.fr/images/text_logo@1x.webp",
    },
    {
      property: "og:url",
      content: "https://www.lexikongo.fr/",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Recherche de Mots et Verbes en Kikongo | Lexikongo",
    },
    {
      name: "twitter:description",
      content:
        "Découvrez les mots et verbes en Kikongo avec leurs traductions en français et anglais.",
    },
    {
      name: "twitter:image",
      content: "https://www.lexikongo.fr/images/text_logo@1x.webp",
    },
  ],
});
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
