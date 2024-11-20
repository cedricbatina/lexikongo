<template>
  <div class="container mt-5">
    <!-- Titre principal -->
    <header class="text-center mb-4">
      <h1 class="display-4 text-primary mb-4 mt-4">
        Liste des mots en Kikongo
      </h1>
      <p class="lead">
        Découvrez la liste des mots en Kikongo, présents dans la base de
        données, et leurs significations.
      </p>
      <LogoSlogan />
      <SearchButtons />
      <ContributorButtons />
      <AdminButtons />
    </header>
    <h1 class="card-title text-primary mb-4 text-left">
      <i class="fa-solid fa-arrow-down-a-z"></i> Liste des Mots
    </h1>
    <!-- Affichage de la liste des mots -->
    <WordList />
    <SearchButtons />
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
    "Découvrez la liste complète des mots en Kikongo avec leurs significations en français et en anglais.",
  url: "https://www.lexikongo.fr/words",
  image: "https://www.lexikongo.fr/images/lexikongo_logo@2x.png",
  inLanguage: "fr",
  publisher: {
    "@type": "Organization",
    name: "Lexikongo",
    url: "https://www.lexikongo.fr",
    logo: {
      "@type": "ImageObject",
      url: "https://www.lexikongo.fr/images/logo.webp",
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
};

useHead({
  title: "Lexikongo - Liste des Mots en Kikongo",
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
        "Découvrez la liste complète des mots en Kikongo avec leurs significations en français et en anglais.",
    },
    {
      name: "keywords",
      content:
        "Kikongo, mots, lexique, dictionnaire, langue, Congo, Lexikongo, liste des mots",
    },
    {
      name: "author",
      content: "Lexikongo",
    },
    // Meta tags Open Graph pour les réseaux sociaux
    {
      property: "og:title",
      content: "Lexikongo - Liste des Mots en Kikongo",
    },
    {
      property: "og:description",
      content:
        "Découvrez la liste complète des mots en Kikongo avec leurs significations en français et en anglais.",
    },
    {
      property: "og:image",
      content: "https://www.lexikongo.fr/images/lexikongo_logo@2x.png",
    },
    {
      property: "og:url",
      content: "https://www.lexikongo.fr/words",
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
      content: "Lexikongo - Liste des Mots en Kikongo",
    },
    {
      name: "twitter:description",
      content:
        "Découvrez la liste complète des mots en Kikongo avec leurs significations en français et en anglais.",
    },
    {
      name: "twitter:image",
      content: "https://www.lexikongo.fr/images/lexikongo_logo@2x.png",
    },
  ],
});
</script>

