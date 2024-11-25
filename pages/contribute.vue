<template>
  <div class="container mt-5">
    <!-- Titre principal -->
    <header class="text-center">
      <h1 class="text-primary">Soutenez Lexikongo</h1>
      <p class="lead mt-3">
        Transformons ensemble Lexikongo en une ressource incontournable pour
        préserver et promouvoir la langue Kikongo.
      </p>
    </header>

    <!-- Formulaire de choix de méthode de paiement -->
    <section class="mt-5">
      <h2 class="text-center">Choisissez une méthode de paiement</h2>
      <PaymentForm />
    </section>

    <!-- Informations supplémentaires -->
    <section class="mt-5 text-center">
      <p>
        Vous pouvez également nous soutenir en partageant Lexikongo avec votre
        entourage ou en envoyant des suggestions pour enrichir notre plateforme.
      </p>
      <NuxtLink
        to="/contact"
        class="btn btn-outline-primary btn-lg mt-3"
        aria-label="Contactez-nous pour des suggestions"
      >
        <i class="fas fa-envelope me-2"></i> Contactez-nous
      </NuxtLink>
    </section>
  </div>
</template>


<script setup>
import { useHead } from "#app";
import PaymentForm from "@/components/PaymentForm.vue";

useHead({
  title: "Soutenez Lexikongo | Contributions",
  meta: [
    {
      name: "description",
      content:
        "Apportez votre soutien à Lexikongo pour préserver et moderniser la langue Kikongo. Contribuez dès aujourd'hui pour un futur où cette langue est valorisée et enseignée.",
    },
    {
      name: "keywords",
      content:
        "Lexikongo, contributions, dons, soutenir le Kikongo, préservation linguistique, culture Kongo, donation",
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      property: "og:title",
      content: "Soutenez Lexikongo | Contributions",
    },
    {
      property: "og:description",
      content:
        "Soutenez Lexikongo dans sa mission de préserver la langue Kikongo. Contribuez et participez à la modernisation de cette langue unique.",
    },
    {
      property: "og:url",
      content: "https://www.lexikongo.fr/contribute",
    },
    {
      property: "og:image",
      content: "https://www.lexikongo.fr/images/contribute-banner.webp",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Soutenez Lexikongo | Contributions",
    },
    {
      name: "twitter:description",
      content:
        "Aidez Lexikongo à préserver la langue Kikongo en contribuant dès aujourd'hui.",
    },
    {
      name: "twitter:image",
      content: "https://www.lexikongo.fr/images/contribute-banner.webp",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Soutenez Lexikongo | Contributions",
        description:
          "Apportez votre soutien à Lexikongo pour préserver et moderniser la langue Kikongo. Contribuez dès aujourd'hui pour un futur où cette langue est valorisée et enseignée.",
        url: "https://www.lexikongo.fr/contribute",
        image: "https://www.lexikongo.fr/images/contribute-banner.webp",
        inLanguage: "fr",
        publisher: {
          "@type": "Organization",
          name: "Lexikongo",
          url: "https://www.lexikongo.fr",
        },
      }),
    },
  ],
});
</script>

<style scoped>
.donation-section {
  text-align: center;
}
</style>
