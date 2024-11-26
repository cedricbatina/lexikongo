<template>
  <div class="container mt-5">
    <!-- Titre principal -->
    <header class="text-center">
      <h1 class="text-primary display-4">
        <i class="fas fa-donate me-2"></i> Soutenez Lexikongo
      </h1>
      <p class="lead mt-3 text-muted">
        Transformons ensemble Lexikongo en une ressource incontournable pour
        préserver et promouvoir la langue Kikongo.
      </p>
    </header>

    <!-- Formulaire de choix de méthode de paiement -->
    <section class="mt-5">
      <h2 class="text-center text-secondary">
        Choisissez une méthode de paiement
      </h2>
      <p class="text-muted text-center mb-4">
        Sélectionnez la méthode qui vous convient pour contribuer à notre
        mission.
      </p>
      <div class="payment-options d-flex flex-column align-items-center">
        <PaymentForm />
      </div>
    </section>

    <!-- Informations sur le virement bancaire -->
    <section class="mt-5">
      <h3 class="text-center text-primary">
        <i class="fas fa-university me-2"></i> Virement Bancaire
      </h3>
      <div class="bank-transfer mt-3">
        <BankTransfer />
      </div>
    </section>

    <!-- Informations supplémentaires -->
    <section class="mt-5 text-center">
      <h3 class="text-primary">
        <i class="fas fa-hand-holding-heart me-2"></i> Participez autrement
      </h3>
      <p class="text-muted">
        Soutenez-nous en partageant Lexikongo avec votre entourage ou en
        envoyant des suggestions pour enrichir notre plateforme.
      </p>
      <NuxtLink
        to="/contact"
        class="btn btn-outline-primary btn-lg mt-3"
        aria-label="Contactez-nous pour des suggestions"
      >
        <i class="fas fa-envelope me-2"></i> Contactez-nous
      </NuxtLink>
    </section>

    <!-- Appel à l'action : Partager -->
    <section class="mt-5 text-center">
      <h4 class="text-secondary">
        <i class="fas fa-share-alt me-2"></i> Partagez notre mission
      </h4>
      <div class="social-icons mt-3">
        <a
          href="https://facebook.com"
          target="_blank"
          class="btn btn-facebook me-2"
          aria-label="Partagez sur Facebook"
        >
          <i class="fab fa-facebook-f"></i>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          class="btn btn-twitter me-2"
          aria-label="Partagez sur Twitter"
        >
          <i class="fab fa-twitter"></i>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          class="btn btn-linkedin"
          aria-label="Partagez sur LinkedIn"
        >
          <i class="fab fa-linkedin-in"></i>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useHead, useRuntimeConfig } from "#app";
import PaymentForm from "@/components/PaymentForm.vue";
import BankTransfer from "@/components/BankTransfer.vue";

const config = useRuntimeConfig();
const paypalKey = config.public.paypalKey;

// Gestion des balises SEO et des scripts dynamiques
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
      src: "https://pay.google.com/gp/p/js/pay.js",
      async: true,
    },
    ...(paypalKey
      ? [
          {
            src: `https://www.paypal.com/sdk/js?client-id=${paypalKey}`,
            async: true,
          },
        ]
      : []),
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
.payment-options {
  max-width: 600px;
  margin: 0 auto;
}

.social-icons a {
  font-size: 1.5rem;
  padding: 0.75rem;
  color: white;
}

.btn-facebook {
  background-color: #3b5998;
}

.btn-twitter {
  background-color: #1da1f2;
}

.btn-linkedin {
  background-color: #0077b5;
}

.social-icons a:hover {
  opacity: 0.8;
}

.bank-transfer {
  max-width: 600px;
  margin: 0 auto;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}
</style>
