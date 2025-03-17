<template>
  <div class="container mt-5">
    <!-- Titre principal -->
    <header class="text-center mb-4">
      <h1 class="display-4 text-primary mb-4 mt-4">
        <i class="fa-solid fa-arrow-down-a-z"></i> Liste des verbes en Kikongo
      </h1>
      <p class="lead">
        Découvrez la liste des verbes en Kikongo, présents dans la base de
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
        <section class="row justify-content-center mb-4">
          <div class="col-lg-10 col-md-12">
            <div class="card shadow-sm p-4 mb-4">
              <h2 class="card-title text-primary mb-4">
                <i class="fa-solid fa-arrow-down-a-z"></i> Liste des Verbes
              </h2>
              <VerbList />
            </div>
          </div>
        </section>

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

      <!-- Barre latérale pour boutons -->
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Liste des Verbes en Kikongo | Lexique Kikongo",
  description:
    "Accédez à une liste exhaustive des verbes en Kikongo avec leurs traductions en français et en anglais, ainsi que des informations phonétiques et étymologiques.",
  url: "https://lexikongo.fr/verbs",
  image: "https://lexikongo.fr/images/text_logo@1x.webp",
  inLanguage: "fr",
  publisher: {
    "@type": "Organization",
    name: "Lexikongo",
    url: "https://lexikongo.fr",
    logo: {
      "@type": "ImageObject",
      url: "https://lexikongo.fr/images/text_logo@1x.webp",
      width: 200,
      height: 200,
    },
  },
  about: {
    "@type": "Thing",
    name: "Kikongo Verbs",
    sameAs: [
      "https://en.wikipedia.org/wiki/Kikongo",
      "https://fr.wikipedia.org/wiki/Kikongo",
    ],
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://lexikongo.fr/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

useHead({
  title: "Liste des Verbes en Kikongo | Lexique Kikongo",
  meta: [
    // Meta Description
    {
      name: "description",
      content:
        "Explorez la liste complète des verbes en Kikongo avec des traductions en français et anglais, ainsi que des informations phonétiques et contextuelles.",
    },
    // Meta Keywords
    {
      name: "keywords",
      content:
        "Kikongo, verbes Kikongo, lexique Kikongo, dictionnaire des verbes, langue africaine, Congo, traductions Kikongo, linguistique, expressions Kikongo, Kikongo, mots, verbes, linguistique, traduction, français, anglais, culture africaine, patrimoine linguistique, Dictionnaire Kikongo - Français, Dictionnaire - Anglais, Dictionnaire Kikongo - Français - Anglais, Dictionnaire africain, Mbanza Kongo, Congo, Congo-Brazzaville, RDC, Angola, Gabon, Cameroun, RCA, Centrafrique, Langues, Langues Bantoues",
    },
    // Author and Robots
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
      content: "Liste des Verbes en Kikongo | Lexique Kikongo",
    },
    {
      property: "og:description",
      content:
        "Découvrez une collection enrichie de verbes en Kikongo avec des traductions en français et anglais, ainsi que des détails phonétiques.",
    },
    {
      property: "og:image",
      content: "https://lexikongo.fr/images/text_logo@1x.webp",
    },
    {
      property: "og:url",
      content: "https://lexikongo.fr/verbs",
    },
    {
      property: "og:type",
      content: "website",
    },

    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Liste des Verbes en Kikongo | Lexique Kikongo",
    },
    {
      name: "twitter:description",
      content:
        "Explorez un dictionnaire enrichi des verbes en Kikongo avec des traductions précises et des informations phonétiques.",
    },
    {
      name: "twitter:image",
      content: "https://lexikongo.fr/images/text_logo@1x.webp",
    },
    // Canonical URL
    {
      rel: "canonical",
      href: "https://lexikongo.fr/verbs",
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
}/* Par défaut, la barre latérale est sticky pour les grands écrans */
.sidebar-buttons {
  position: sticky;
  top: 100px;
  z-index: 10;
  background: white;
  max-height: calc(100vh - 120px); /* Évite le débordement */
  overflow-y: auto;
  border-radius: 8px;
}

/* Sur tablette et mobile, la barre latérale devient un bloc normal */
@media (max-width: 991px) { /* <= lg */
  .sidebar-buttons {
    position: static;
    max-height: none;
  }
  .order-md-last {
    order: 2 !important;
  }
}

/* Espacement correct entre les sections */
.card {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Ajustement des marges pour tablette et mobile */
@media (max-width: 991px) { /* <= lg */
  aside {
    margin-top: 2rem; /* Ajoute un espace entre le contenu et la barre latérale */
  }
}

/* Ajustement de la taille des boutons */
.btn-lg {
  width: 100%;
  max-width: 250px;
}

/* Sur tablette et grand écran, les boutons retrouvent leur taille normale */
@media (min-width: 768px) {
  .btn-lg {
    width: auto;
  }
}


</style>