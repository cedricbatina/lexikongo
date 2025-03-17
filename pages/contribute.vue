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
        Sélectionnez la méthode de paiement qui vous convient le mieux pour
        contribuer à notre mission.
      </p>
      <div class="payment-options d-flex flex-column align-items-center">
        <PaymentForm />
      </div>
    </section>

    <!-- Comment contribuer -->
    <section class="text-center mb-5">
      <h2 class="text-primary">
        <i class="fas fa-hands-helping me-2"></i> Contribuez autrement
      </h2>
      <p class="text-muted mb-4">
        Vous pouvez également nous soutenir en partageant Lexikongo avec votre
        entourage ou en envoyant des suggestions pour enrichir notre plateforme.
      </p>
      <p class="m-3">Il existe plusieurs façons de soutenir Lexikongo :</p>
      <div class="contribution-options mb-4">
        <NuxtLink to="/contribute" class="btn btn-outline-success btn-lg me-3">
          <i class="fas fa-hand-holding-usd me-3"></i> Faire un Don à Lexikongo
        </NuxtLink>

        <NuxtLink to="/register" class="btn btn-outline-info btn-lg me-3">
          <i class="fas fa-users me-3"></i> Rejoindre les Contributeurs
        </NuxtLink>
        <NuxtLink to="/contact" class="btn btn-outline-secondary btn-lg">
          <i class="fas fa-envelope me-3"></i> Contactez-nous
        </NuxtLink>
      </div>
    </section>
    <!-- Appel à l'action -->
    <section class="mt-5 text-center">
      <h4 class="text-secondary">
        <i class="fas fa-share-alt me-2"></i> Aidez-nous à partager notre
        mission
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

const config = useRuntimeConfig();
const paypalKey = config.public.paypalKey;

// Gestion des balises SEO et intégration des scripts dynamiques
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
        "Lexikongo, contributions, dons, soutenir le Kikongo, préservation linguistique, culture Kongo, donation, Kikongo, mots, verbes, linguistique, traduction, français, anglais, culture africaine, patrimoine linguistique, Dictionnaire Kikongo - Français, Dictionnaire - Anglais, Dictionnaire Kikongo - Français - Anglais, Dictionnaire africain, Mbanza Kongo, Congo, Congo-Brazzaville, RDC, Angola, Gabon, Cameroun, RCA, Centrafrique, Langues, Langues Bantoues",
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
/* Titre principal */
header h1 {
  font-size: 2.5rem;
  font-weight: bold;
}

/* Sous-titre */
header p.lead {
  font-size: 1.25rem;
}

/* Section des options de paiement */
.payment-options {
  gap: 1.5rem;
}

/* Boutons */
.btn-outline-primary {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

/* Couleurs secondaires */
.text-secondary {
  color: var(--text-primary);
}
/* Espacement */
.mt-5 {
  margin-top: 3rem !important;
}
.mb-4 {
  margin-bottom: 1.5rem !important;
}
</style>
