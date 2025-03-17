<template>
  <div class="container mt-5">
    <!-- Titre principal -->
    <header class="text-center mb-4">
      <h1 class="display-4 text-primary mb-4 mt-4">
        <i class="fas fa-spell-check me-1"></i> Liste des mots en Kikongo
      </h1>
      <p class="lead">
        Découvrez la liste des mots en Kikongo, présents dans la base de
        données, et leurs significations.
      </p>
    </header>

    <section class="text-center mb-4 mt-4">
      <LogoSlogan />
    </section>

    <!-- Contenu principal et barre latérale -->
    <div class="row">
      <!-- Contenu principal -->
      <div class="col-lg-9">
        <h2 class="card-title text-primary mb-4">
          <i class="fas fa-spell-check me-1"></i> Liste des Mots
        </h2>

        <!-- Affichage de la liste des mots -->
        <WordList />

        <!-- Section Appel à l'action -->
        <section class="text-center mt-4" aria-labelledby="contribute-section">
        <LastExpressionsCount />

          <p id="contribute-section" class="text-default">
            Vous ne trouvez pas l'expression que vous cherchez ? <br />
            Contribuez à enrichir le lexique en ajoutant de nouveaux mots ou verbes.
          </p>
          <div class="d-flex flex-column flex-md-row justify-content-center gap-3">
            <NuxtLink
              to="/documentation/for-contributors"
              class="btn btn-outline-success btn-lg"
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
          </div>
        </section>

      </div>

      <!-- Barre latérale pour boutons (droite sur écran large, en bas sur tablette/mobile) -->
      <aside class="col-lg-3 order-lg-2 order-md-last mt-4 mt-lg-0">
        <div class="card shadow-sm p-4 sidebar-buttons">
          <SearchButtons />
          <ContributorButtons />
          <AdminButtons />
        </div>
      </aside>
    </div>
  </div>
</template>


<script setup>
import { useHead } from "#app";
import WordList from "@/components/WordList.vue";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Liste des Mots en Kikongo | Lexique Kikongo",
  description:
    "Explorez la liste exhaustive des mots en Kikongo, enrichie de traductions précises en français et en anglais, ainsi que de leur phonétique et étymologie.",
  url: "https://www.lexikongo.fr/words",
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
  about: {
    "@type": "Thing",
    name: "Kikongo Language",
    sameAs: [
      "https://en.wikipedia.org/wiki/Kikongo",
      "https://fr.wikipedia.org/wiki/Kikongo",
    ],
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.lexikongo.fr/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

useHead({
  title: "Découvrez et Explorez les Mots en Kikongo | Lexikongo",
  meta: [
    // Meta Description
    {
      name: "description",
      content:
        "Explorez le lexique complet des mots en Kikongo, incluant leurs traductions en français et en anglais, leur phonétique et leurs origines culturelles.",
    },
    // Meta Keywords
    {
      name: "keywords",
      content:
        "Kikongo, dictionnaire Kikongo, mots en Kikongo, traduction Kikongo, langue africaine, lexique, Congo, culture africaine, étymologie Kikongo, Kikongo, mots, verbes, linguistique, traduction, français, anglais, culture africaine, patrimoine linguistique, Dictionnaire Kikongo - Français, Dictionnaire - Anglais, Dictionnaire Kikongo - Français - Anglais, Dictionnaire africain, Mbanza Kongo, Congo, Congo-Brazzaville, RDC, Angola, Gabon, Cameroun, RCA, Centrafrique, Langues, Langues Bantoues",
    },

    {
      name: "author",
      content: "Lexikongo",
    },
    {
      name: "robots",
      content: "index, follow",
    },
    // Open Graph Tags
    {
      property: "og:title",
      content: "Lexikongo - Découvrez et Explorez les Mots en Kikongo",
    },
    {
      property: "og:description",
      content:
        "Accédez à un lexique enrichi des mots en Kikongo, avec des traductions en français et anglais. Une ressource essentielle pour la langue Kikongo.",
    },
    {
      property: "og:image",
      content: "https://www.lexikongo.fr/images/text_logo@1x.webp",
    },
    {
      property: "og:url",
      content: "https://www.lexikongo.fr/words",
    },
    {
      property: "og:type",
      content: "website",
    },
    // Twitter Tags
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Lexikongo - Découvrez et Explorez les Mots en Kikongo",
    },
    {
      name: "twitter:description",
      content:
        "Explorez un dictionnaire enrichi des mots en Kikongo avec des traductions, phonétiques et explications culturelles.",
    },
    {
      name: "twitter:image",
      content: "https://www.lexikongo.fr/images/text_logo@1x.webp",
    },
    // Canonical Link
    {
      rel: "canonical",
      href: "https://www.lexikongo.fr/words",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify(jsonLd),
    },
  ],
});
</script>

<style scoped>
/* Conteneur principal */
.container {
  max-width: 1200px;
}

/* Section des boutons en barre latérale */
.sidebar-buttons {
  position: sticky;
  top: 100px;
  z-index: 10;
  background: white;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}

/* Suppression du sticky sur mobile */
@media (max-width: 767px) {
  .sidebar-buttons {
    position: static;
    max-height: none;
  }
}

/* Boutons optimisés */
.btn-lg {
  width: 100%;
  max-width: 250px;
}

@media (min-width: 768px) {
  .btn-lg {
    width: auto;
  }
}

</style>