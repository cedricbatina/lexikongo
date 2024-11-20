<template>
  <div class="contribution-page container mt-5">
    <!-- En-tête principale -->
    <header class="text-center mb-5">
      <h1 class="display-4 text-primary">
        <i class="fas fa-hand-holding-heart me-2"></i> Soutenez Lexikongo
      </h1>
      <p class="lead text-default">
        Votre soutien peut transformer Lexikongo en une ressource incontournable
        pour la préservation et l’enseignement de la langue Kikongo. Ensemble,
        construisons un héritage linguistique durable.
      </p>
    </header>

    <!-- Importance du projet -->
    <section class="mb-5">
      <h2 class="text-secondary">
        <i class="fas fa-question-circle me-2"></i> Pourquoi soutenir Lexikongo
        ?
      </h2>
      <p>
        Lexikongo n’est pas seulement une plateforme, mais une mission pour
        préserver et promouvoir la langue Kikongo dans un monde en constante
        évolution. Votre soutien permet de :
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
          jeunes générations et aux curieux de découvrir et apprendre cette
          langue unique.
        </li>
      </ul>
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
          <strong>Développement de nouvelles fonctionnalités :</strong> Intégrer
          des outils comme la recherche avancée, des tableaux de bord
          personnalisés, et des systèmes de notifications.
        </li>
        <li>
          <strong>Extension à d’autres langues :</strong> Ajouter des dialectes
          et langues africaines pour créer un réseau de lexiques numériques.
        </li>
        <li>
          <strong>Amélioration de l’interface utilisateur :</strong> Offrir une
          navigation fluide et intuitive sur tous les appareils.
        </li>
        <li>
          <strong>Maintenance et sécurité :</strong> Garantir un accès fiable et
          sécurisé pour tous les utilisateurs.
        </li>
        <li>
          <strong>Production de contenu éducatif :</strong> Créer des articles,
          guides et ressources pédagogiques sur la langue Kikongo.
        </li>
      </ul>
    </section>

    <!-- Options de dons -->
    <section class="mb-5">
      <h2 class="text-secondary">
        <i class="fas fa-donate me-2"></i> Comment pouvez-vous contribuer ?
      </h2>
      <p>
        Soutenez Lexikongo en choisissant l’une des options ci-dessous. Chaque
        contribution, grande ou petite, compte énormément :
      </p>
      <div class="donation-buttons">
        <button @click="donate('paypal')" class="btn btn-primary me-3">
          <i class="fab fa-paypal me-2"></i> Faire un Don via PayPal
        </button>
        <button
          @click="donate('bank-transfer')"
          class="btn btn-outline-secondary me-3"
        >
          <i class="fas fa-university me-2"></i> Faire un Don par Virement
          Bancaire
        </button>
        <button @click="donate('other')" class="btn btn-outline-info">
          <i class="fas fa-hands-helping me-2"></i> Autres Options
        </button>
      </div>
    </section>

    <!-- Appel à l’action -->
    <section class="text-center mt-5">
      <p class="text-default">
        Chaque contribution nous rapproche de notre objectif : préserver et
        partager la richesse de la langue Kikongo avec le monde.
      </p>
      <NuxtLink to="/contact" class="btn btn-lg btn-outline-success mt-3">
        <i class="fas fa-envelope me-2"></i> Contactez-nous pour en savoir plus
      </NuxtLink>
    </section>
  </div>
</template>

<script setup>
import { useHead } from "#app";

useHead({
  title:
    "Soutenez Lexikongo - Contribuez à la Préservation de la Langue Kikongo",
  meta: [
    {
      name: "description",
      content:
        "Participez à la préservation de la langue Kikongo en soutenant Lexikongo. Découvrez comment vos contributions permettent d'améliorer notre plateforme et d'enrichir le patrimoine linguistique.",
    },
    {
      name: "keywords",
      content:
        "Contribuer, Dons, Lexikongo, Kikongo, Préservation linguistique, Langues africaines, Lexique numérique, Héritage culturel",
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
      content:
        "Soutenez Lexikongo - Contribuez à la Préservation de la Langue Kikongo",
    },
    {
      property: "og:description",
      content:
        "Découvrez comment vos contributions aident Lexikongo à enrichir le patrimoine linguistique Kikongo et à offrir des ressources éducatives accessibles.",
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
      property: "og:image",
      content: "https://www.lexikongo.fr/images/logo.webp",
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
        "Rejoignez Lexikongo pour préserver la langue Kikongo. Vos dons permettent de développer des outils modernes et d'enrichir le lexique.",
    },
    {
      name: "twitter:image",
      content: "https://www.lexikongo.fr/images/lexikongo_logo@2x.png",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Soutenez Lexikongo - Contribuez à la Préservation de la Langue Kikongo",
        description:
          "Participez activement à la préservation de la langue Kikongo. Découvrez comment vos dons soutiennent Lexikongo dans son développement et son engagement culturel.",
        url: "https://www.lexikongo.fr/contribution",
        publisher: {
          "@type": "Organization",
          name: "Lexikongo",
          logo: {
            "@type": "ImageObject",
            url: "https://www.lexikongo.fr/images/lexikongo_logo@2x.png",
            width: 1200,
            height: 630,
          },
        },
        mainEntity: {
          "@type": "DonateAction",
          name: "Contribuer à Lexikongo",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://www.lexikongo.fr/contribution",
            actionPlatform: [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform",
            ],
          },
          description:
            "Contribuez financièrement à Lexikongo pour soutenir le développement de la plateforme et enrichir le patrimoine linguistique Kikongo.",
          recipient: {
            "@type": "Organization",
            name: "Lexikongo",
            sameAs: "https://www.lexikongo.fr",
          },
        },
        potentialAction: {
          "@type": "DonateAction",
          target: "https://www.paypal.com/donate/lexikongo",
        },
      }),
    },
  ],
});

// Gestion des options de dons
function donate(method) {
  if (method === "paypal") {
    window.open("https://www.paypal.com/donate/lexikongo", "_blank");
  } else if (method === "bank-transfer") {
    alert(
      "Merci pour votre intérêt à faire un don par virement bancaire. Veuillez nous contacter pour les détails."
    );
  } else {
    alert(
      "Merci pour votre soutien ! Veuillez nous contacter pour discuter des autres options disponibles."
    );
  }
}
</script>

<style scoped>
/* En-tête */
.contribution-page header h1 {
  color: var(--primary-color);
}

.contribution-page header p {
  font-size: 1.25rem;
}

/* Section principale */
.contribution-page h2 {
  color: var(--secondary-color);
  margin-bottom: 1rem;
}

.contribution-page p,
.contribution-page ul {
  margin-bottom: 1.5rem;
}

/* Boutons de dons */
.donation-buttons .btn {
  font-size: 1.1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
}

.donation-buttons .btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: #fff;
}

.donation-buttons .btn-primary:hover {
  background-color: var(--hover-primary);
}

.donation-buttons .btn-outline-secondary,
.donation-buttons .btn-outline-info {
  border-color: var(--secondary-color);
  color: var(--secondary-color);
}

.donation-buttons .btn-outline-secondary:hover,
.donation-buttons .btn-outline-info:hover {
  background-color: var(--secondary-color);
  color: #fff;
}
</style>
