<template>
  <div class="contributors-page container mt-5">
    <!-- En-tête principale -->
    <header class="text-center mb-5">
      <h1 class="display-4 text-primary">
        <i class="fas fa-hands-helping me-2"></i> Rejoignez la communauté
        Lexikongo
      </h1>
      <p class="lead text-default">
        Devenez un acteur clé de la préservation de la langue Kikongo.
        Enrichissez notre lexique, partagez vos connaissances et aidez à
        transmettre ce précieux héritage culturel à travers le monde.
      </p>
    </header>

    <!-- Pourquoi devenir contributeur -->
    <section class="mb-5">
      <h2 class="text-primary">
        <i class="fas fa-question-circle me-2"></i> Pourquoi devenir
        contributeur ?
      </h2>
      <p>
        Chaque contribution compte. En tant que contributeur, vous jouez un rôle
        essentiel dans la documentation et la promotion de la langue Kikongo.
        Voici pourquoi vous devriez participer :
      </p>
      <ul>
        <li>
          <strong>Préserver le patrimoine linguistique :</strong> Enrichissez
          une base de données accessible à tous, garantissant la transmission
          des connaissances aux générations futures.
        </li>
        <li>
          <strong>Promouvoir le Kikongo :</strong> Participez à faire du Kikongo
          une langue vivante et visible dans le monde numérique, aidant les
          apprenants et les chercheurs.
        </li>
        <li>
          <strong>Faire partie d'une communauté :</strong> Rejoignez un réseau
          de passionnés et de locuteurs déterminés à faire briller cette langue
          unique.
        </li>
      </ul>
    </section>

    <!-- Conditions pour contribuer -->
    <section class="mb-5">
      <h2 class="text-primary">
        <i class="fas fa-user-check me-2"></i> Conditions pour contribuer
      </h2>
      <p>
        Vous souhaitez rejoindre Lexikongo en tant que contributeur ? Voici les
        prérequis pour garantir des soumissions de qualité :
      </p>
      <ul>
        <li>
          <strong>Connaissances en Kikongo :</strong> Avoir une maîtrise de base
          du Kikongo ou suivre le cours
          <a
            href="https://longoka.fr/cours/apprenez-les-bases-du-kikongo-classique/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary fw-bold"
          >
            Apprenez les bases du Kikongo classique </a
          >.
        </li>
        <li>
          <strong>Compréhension linguistique :</strong> Connaître la phonétique
          et les variations linguistiques pour fournir des soumissions précises.
        </li>
        <li>
          <strong>Créer un compte :</strong>
          <NuxtLink to="/register" class="text-primary fw-bold"
            >Créer un compte gratuitement</NuxtLink
          >
          sur Lexikongo.
        </li>
      </ul>
    </section>

    <!-- Comment contribuer -->
    <section class="mb-5">
      <h2 class="text-primary">
        <i class="fas fa-pencil-alt me-2"></i> Comment contribuer ?
      </h2>
      <p>
        Contribuer est simple et rapide. Suivez ces étapes pour soumettre vos
        connaissances :
      </p>
      <ol>
        <li>
          <strong>Créez un compte :</strong> Accédez à notre
          <NuxtLink to="/register" class="text-primary fw-bold"
            >page d'inscription</NuxtLink
          >
          pour créer un compte.
        </li>
        <li>
          <strong>Connectez-vous :</strong> Connectez-vous à votre compte pour
          accéder aux outils de contribution.
        </li>
        <li>
          <strong>Accédez au tableau de bord :</strong> Visitez la section
          <NuxtLink to="/contributor" class="text-primary fw-bold"
            >Tableau de bord Contributeur</NuxtLink
          >.
        </li>
        <li>
          <strong>Soumettez vos mots et verbes :</strong> Utilisez les
          formulaires de soumission pour ajouter des mots ou des verbes avec des
          détails comme :
          <ul>
            <li>Singulier et pluriel pour les mots.</li>
            <li>Racine et suffixe pour les verbes.</li>
            <li>Phonétique et traductions en Français et Anglais.</li>
          </ul>
        </li>
        <li>
          <strong>Suivez vos soumissions :</strong> Consultez le statut de vos
          contributions (en attente, approuvé, rejeté) dans votre tableau de
          bord.
        </li>
      </ol>
    </section>

    <!-- Soutenir autrement -->
    <section class="mb-5">
      <h2 class="text-primary">
        <i class="fas fa-hand-holding-heart me-2"></i> Soutenir autrement
      </h2>
      <p>
        Vous souhaitez aider autrement ? Voici comment vous pouvez nous soutenir
        :
      </p>
      <ul>
        <li>
          <strong>Faire un don :</strong> Aidez-nous à maintenir et améliorer la
          plateforme en effectuant un don sur notre page
          <NuxtLink to="/contribution" class="text-primary fw-bold"
            >Contribution</NuxtLink
          >.
        </li>
        <li>
          <strong>Partagez vos connaissances :</strong> Envoyez-nous des
          ressources linguistiques ou des suggestions pour enrichir notre base
          de données.
        </li>
        <li>
          <strong>Parlez-en autour de vous :</strong> Partagez Lexikongo avec
          vos amis, famille et réseaux sociaux.
        </li>
      </ul>
    </section>

    <!-- Appel à l'action -->
    <div class="text-center mt-4 mb-4">
      <NuxtLink to="/register" class="btn btn-outline-primary btn-lg me-3">
        <i class="fas fa-user-plus me-2"></i> Rejoignez-nous maintenant
      </NuxtLink>
      <NuxtLink to="/contact" class="btn btn-outline-secondary btn-lg">
        <i class="fas fa-envelope me-2"></i> Contactez-nous
      </NuxtLink>
    </div>
    <SearchButtons />
  </div>
</template>



<script setup>
import { useHead } from "@vueuse/head";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Guide des Contributeurs - Lexikongo",
  description:
    "Découvrez comment enrichir Lexikongo en soumettant des mots et verbes en Kikongo. Rejoignez-nous pour préserver cette langue riche et son patrimoine culturel.",
  url: "https://www.lexikongo.fr/contributors",
  image: "https://www.lexikongo.fr/images/lexikongo_logo@2x.png",
  publisher: {
    "@type": "Organization",
    name: "Lexikongo",
    logo: {
      "@type": "ImageObject",
      url: "https://www.lexikongo.fr/images/logo.webp",
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
  title: "Guide des Contributeurs - Lexikongo",
  meta: [
    {
      name: "description",
      content:
        "Découvrez comment enrichir Lexikongo en soumettant des mots et verbes en Kikongo. Rejoignez-nous pour préserver cette langue riche et son patrimoine culturel.",
    },
    {
      property: "og:title",
      content: "Guide des Contributeurs - Lexikongo",
    },
    {
      property: "og:description",
      content:
        "Apprenez comment soumettre des mots et verbes en Kikongo sur Lexikongo et contribuer à la préservation de cette langue précieuse.",
    },
    {
      property: "og:url",
      content: "https://www.lexikongo.fr/contributors",
    },
    {
      property: "og:image",
      content: "https://www.lexikongo.fr/images/lexikongo_logo@2x.png",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
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

