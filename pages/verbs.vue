<template>
  <div class="container mt-4">
    <!-- Titre principal -->
    <header class="text-center mb-4">
      <h1 class="display-4 text-primary mb-4 mt-4">
        Liste des verbes en Kikongo
      </h1>
      <p class="lead">
        Découvrez la liste des verbes en Kikongo, présents dans la base de
        données, et leurs significations.
      </p>
      <LogoSlogan />
      <SearchButtons />
      <ContributorButtons />
      <AdminButtons />
    </header>

    <!-- Liste des verbes -->
    <section>
      <div class="card shadow-sm">
        <div class="card-body">
          <h1 class="card-title text-primary mb-4 text-left">
            <i class="fa-solid fa-arrow-down-a-z"></i> Liste des Verbes
          </h1>
          <VerbList />
          <div class="mt-4 text-center">
            <SearchButtons />
            <ContributorButtons />
            <AdminButtons />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useHead } from "@vueuse/head";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Liste des Verbes en Kikongo | Lexique Kikongo",
  description:
    "Découvrez la liste des verbes en Kikongo avec leurs traductions en français et en anglais.",
  url: "https://lexikongo.com/verbs",
  image: "https://lexikongo.com/images/lexikongo_logo@2x.png",
  inLanguage: "fr",
  publisher: {
    "@type": "Organization",
    name: "Lexikongo",
    url: "https://lexikongo.com",
    logo: {
      "@type": "ImageObject",
      url: "https://lexikongo.com/images/logo.webp",
      width: 200,
      height: 200,
    },
  },
  about: {
    "@type": "Thing",
    name: "Kikongo Language Verbs",
    sameAs: [
      "https://en.wikipedia.org/wiki/Kikongo",
      "https://fr.wikipedia.org/wiki/Kikongo",
    ],
  },
};

useHead({
  title: "Liste des Verbes en Kikongo | Lexique Kikongo",
  meta: [
    {
      name: "description",
      content:
        "Découvrez la liste des verbes en Kikongo avec leurs traductions en français et en anglais.",
    },
    {
      property: "og:title",
      content: "Liste des Verbes en Kikongo | Lexique Kikongo",
    },
    {
      property: "og:description",
      content:
        "Explorez notre collection de verbes en Kikongo avec des traductions précises et des informations phonétiques.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://lexikongo.com/verbs",
    },
    {
      property: "og:image",
      content: "https://lexikongo.com/images/lexikongo_logo@2x.png",
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
        "Découvrez les verbes en Kikongo avec des traductions et des informations phonétiques.",
    },
    {
      name: "twitter:image",
      content: "https://lexikongo.com/images/lexikongo_logo@2x.png",
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
