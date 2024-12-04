<template>
  <div class="container mt-5">
    <!-- En-tête principale -->
    <header class="text-center mb-5">
      <h1 class="display-4 text-primary mb-4 mt-4">
        <i class="fas fa-hand-holding-heart me-2"></i> Soutenez Lexikongo
      </h1>
      <p class="lead">
        Votre soutien peut transformer Lexikongo en une ressource incontournable
        pour la préservation et l’enseignement de la langue Kikongo. Ensemble,
        construisons un héritage linguistique durable.
      </p>

      <LogoSlogan />
    </header>

    <!-- Importance du projet -->
    <section class="mb-5">
      <h2 class="text-secondary">
        <i class="fas fa-question-circle me-2"></i> Pourquoi soutenir Lexikongo
        ?
      </h2>
      <p>
        Lexikongo n’est pas seulement une plateforme, mais une mission pour
        préserver et promouvoir la langue Kikongo. Votre soutien permet de :
      </p>
      <ul>
        <li>
          <strong>Sauvegarder le patrimoine linguistique :</strong> Enrichir la
          base de données pour qu’elle reste une référence culturelle accessible
          à tous.
        </li>
        <li>
          <strong>Encourager les études linguistiques :</strong> Offrir une
          ressource trilingue (Kikongo, Français, Anglais) pour les étudiants,
          chercheurs et passionnés.
        </li>
        <li>
          <strong>Créer des opportunités éducatives :</strong> Permettre aux
          jeunes générations et aux curieux de découvrir cette langue unique.
        </li>
      </ul>
    </section>

    <!-- Bouton de dons via Stripe -->
    <section class="donation-section mb-5 text-center">
      <h2 class="text-primary mb-4">
        <i class="fas fa-donate me-2"></i> Faire un Don Sécurisé
      </h2>
      <p class="mb-3">
        Contribuez dès aujourd’hui avec un don sécurisé en euros via Stripe.
      </p>
      <button @click="handleStripePayment" class="btn btn-primary btn-lg">
        Faire un don de 10€
      </button>
    </section>

    <!-- Utilisation des fonds -->
    <section class="mb-5">
      <h2 class="text-secondary">
        <i class="fas fa-coins me-2"></i> Où vont vos dons ?
      </h2>
      <p>
        Chaque contribution est utilisée de manière responsable pour améliorer
        Lexikongo et étendre son impact. Voici comment vos dons sont investis :
      </p>
      <ul>
        <li>
          <strong>Développement de nouvelles fonctionnalités :</strong> Ajouter
          des outils comme la recherche avancée et des tableaux de bord
          personnalisés.
        </li>
        <li>
          <strong>Extension à d’autres langues :</strong> Créer un réseau de
          lexiques numériques pour d'autres langues africaines.
        </li>
        <li>
          <strong>Amélioration de l’interface utilisateur :</strong> Garantir
          une expérience fluide et intuitive.
        </li>
        <li>
          <strong>Production de contenu éducatif :</strong> Publier des guides
          et articles pédagogiques sur le Kikongo.
        </li>
      </ul>
    </section>

    <!-- Options de dons -->
    <section class="donation-options mb-5">
      <h2 class="text-primary">
        <i class="fas fa-hand-holding-usd me-2"></i> Autres Moyens de Soutien
      </h2>
      <p>
        Si vous souhaitez soutenir Lexikongo d’une autre manière, voici des
        options disponibles :
      </p>
      <div class="d-flex flex-column flex-md-row justify-content-center">
        <button @click="donate('paypal')" class="btn btn-primary me-3 mb-3">
          <i class="fab fa-paypal me-2"></i> Don via PayPal
        </button>
        <button
          @click="donate('bank-transfer')"
          class="btn btn-outline-secondary me-3 mb-3"
        >
          <i class="fas fa-university me-2"></i> Don par Virement Bancaire
        </button>
        <button @click="donate('other')" class="btn btn-outline-info mb-3">
          <i class="fas fa-hands-helping me-2"></i> Autres Options
        </button>
      </div>
    </section>

    <!-- Appel à l’action -->
    <section class="text-center mt-5">
      <p class="text-muted">
        Chaque contribution nous rapproche de notre objectif : préserver et
        partager la richesse de la langue Kikongo avec le monde.
      </p>
      <NuxtLink to="/contact" class="btn btn-outline-success btn-lg mt-3">
        <i class="fas fa-envelope me-2"></i> Contactez-nous
      </NuxtLink>
    </section>
  </div>
</template>

<script setup>
import { useHead } from "#app";
import { loadStripe } from "@stripe/stripe-js";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Soutenez Lexikongo - Contribuez à la Préservation de la Langue Kikongo",
  description:
    "Aidez à préserver la langue Kikongo en soutenant Lexikongo. Découvrez comment vos contributions permettent de développer le lexique et d'enrichir le patrimoine linguistique.",
  url: "https://www.lexikongo.fr/contribution",
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
};

useHead({
  title:
    "Soutenez Lexikongo - Contribuez à la Préservation de la Langue Kikongo",
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
        "Aidez à préserver la langue Kikongo en soutenant Lexikongo. Vos dons permettent d'améliorer la plateforme et de développer des outils linguistiques modernes.",
    },
    {
      name: "keywords",
      content:
        "Kikongo, contribution, préservation linguistique, Lexikongo, soutien, dons, Kikongo, mots, verbes, linguistique, traduction, français, anglais, culture africaine, patrimoine linguistique, Dictionnaire Kikongo - Français, Dictionnaire - Anglais, Dictionnaire Kikongo - Français - Anglais, Dictionnaire africain, Mbanza Kongo, Congo, Congo-Brazzaville, RDC, Angola, Gabon, Cameroun, RCA, Centrafrique, Langues, Langues Bantoues",
    },
    {
      name: "author",
      content: "Lexikongo",
    },
    {
      property: "og:title",
      content:
        "Soutenez Lexikongo - Contribuez à la Préservation de la Langue Kikongo",
    },
    {
      property: "og:description",
      content:
        "Aidez à enrichir le patrimoine linguistique Kikongo grâce à vos contributions.",
    },
    {
      property: "og:image",
      content: "https://www.lexikongo.fr/images/text_logo@1x.webp",
    },
    {
      property: "og:url",
      content: "https://www.lexikongo.fr/contribution",
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
      content:
        "Soutenez Lexikongo - Contribuez à la Préservation de la Langue Kikongo",
    },
    {
      name: "twitter:description",
      content:
        "Découvrez comment vos dons permettent d'enrichir le lexique Kikongo et de développer des outils linguistiques modernes.",
    },
    {
      name: "twitter:image",
      content: "https://www.lexikongo.fr/images/text_logo@1x.webp",
    },
  ],
});

const handleStripePayment = async () => {
  const stripe = await loadStripe("STRIPE_KEY");
  const response = await $fetch("/api/create-checkout-session", {
    method: "POST",
    body: { amount: 10 },
  });

  if (response && response.id) {
    await stripe.redirectToCheckout({ sessionId: response.id });
  } else {
    console.error("Erreur lors de la création de la session de paiement.");
  }
};

const donate = (method) => {
  if (method === "paypal") {
    window.open("https://www.paypal.com/donate/lexikongo", "_blank");
  } else if (method === "bank-transfer") {
    console.info("Veuillez nous contacter pour les informations bancaires.");
  } else {
    console.info("Contactez-nous pour explorer d'autres options.");
  }
};
</script>

<style scoped>
/* Styles principaux */

section {
  margin-bottom: 2rem;
}

.donation-section button {
  background-color: var(--primary-color);
  color: #fff;
  border-radius: 0.5rem;
}

.donation-buttons .btn {
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
}

/* Responsive */
@media (max-width: 768px) {
  .donation-buttons {
    flex-direction: column;
  }

  .donation-buttons .btn {
    margin-bottom: 1rem;
  }
}
</style>
