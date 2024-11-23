<template>
  <div class="container mt-5">
    <!-- En-tête principale -->
    <header class="text-center mb-5">
      <h1 class="display-4 text-primary mb-4 mt-4">
        <i class="fas fa-hands-helping me-2"></i> Rejoignez la communauté
        Lexikongo
      </h1>
      <p class="lead text-default">
        Devenez un acteur clé dans la préservation et la promotion de la langue
        Kikongo. Enrichissez notre lexique, partagez vos connaissances et
        participez à ce projet unique pour préserver un patrimoine culturel
        inestimable.
      </p>
    </header>
    <section class="text-center mb-5">
      <LogoSlogan />
      <SearchButtons />
      <ContributorButtons />
      <AdminButtons />
    </section>
    <p class="lead text-default">
      Le Kikongo, une langue bantu parlée par des millions de personnes, est
      riche de plus de 350 000 mots et verbes. Ce lexique a un immense potentiel
      pour enrichir l'éducation, les sciences et les arts. Ensemble,
      transformons cette vision en réalité.
    </p>
    <!-- Pourquoi devenir contributeur -->
    <section class="mb-5">
      <h2 class="text-primary">
        <i class="fas fa-question-circle me-2"></i> Pourquoi contribuer ?
      </h2>
      <p>
        En rejoignant Lexikongo, vous devenez une pièce essentielle dans la
        sauvegarde d'une langue qui incarne l'histoire, la culture et l'identité
        d'un peuple. Contribuer, c’est :
      </p>
      <ul>
        <li>
          <strong>Préserver un trésor linguistique :</strong> La langue Kikongo
          est bien plus qu’un moyen de communication. Elle porte en elle des
          valeurs, des philosophies et des expressions uniques.
        </li>
        <li>
          <strong>Créer des mots modernes :</strong> Grâce à la logique et à la
          structure du Kikongo, nous pouvons créer des mots pour des concepts
          modernes en science, technologie et éducation.
        </li>
        <li>
          <strong>Faire rayonner la culture Kongo :</strong> Participez à rendre
          cette langue vivante et influente à l’ère numérique.
        </li>
      </ul>
      <p>
        Imaginez un monde où le Kikongo est enseigné dans les écoles, utilisé
        dans les innovations technologiques et reconnu internationalement. Ce
        rêve commence avec vos contributions.
      </p>
    </section>

    <!-- Conditions pour contribuer -->
    <section class="mb-5">
      <h2 class="text-primary">
        <i class="fas fa-user-check me-2"></i> Conditions pour contribuer
      </h2>
      <p>
        Pour garantir la qualité de notre base de données, voici les prérequis
        pour rejoindre Lexikongo :
      </p>
      <ul>
        <li>
          <strong>Connaissances linguistiques :</strong> Avoir une maîtrise de
          base du Kikongo ou suivre le cours:
          <a
            href="https://longoka.fr/course/apprenez-les-bases-du-kikongo-classique/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary fw-bold"
          >
            Apprenez les bases du kikongo classique</a
          >.
        </li>
        <li>
          <strong>Créer un compte :</strong>
          <NuxtLink to="/register" class="text-primary fw-bold">
            Inscrivez-vous gratuitement
          </NuxtLink>
          pour accéder aux outils de contribution. Après avoir confirmé votre
          inscription en cliquant sur lien envoyé, dans votre boîte mail. Si
          vous ne voyez pas l'email, vérifiez les spams. Une fois inscrit,
          faites une demande de contribution en envoyant un message à
          l'administrateur, via le:
          <NuxtLink to="/contact" class="text-primary fw-bold">
            Formulaire de contact </NuxtLink
          >. <br />
          <p>
            Vous pouvez directement envoyer un email à l'adresse :
            <a href="mailto:info@lexikongo.fr" class="email-link fw-bold"
              >info@lexikongo.fr</a
            >
          </p>
        </li>
        <li>
          <strong>Respect des consignes :</strong> Soumettez des données
          fiables, précises et conformes aux normes établies.
        </li>
      </ul>
    </section>

    <!-- Comment contribuer -->
    <section class="mb-5">
      <h2 class="text-primary">
        <i class="fas fa-pencil-alt me-2"></i> Comment contribuer ?
      </h2>
      <p>Contribuer à Lexikongo est un processus simple et structuré :</p>
      <ol>
        <li>
          <strong>Inscrivez-vous :</strong> Créez un compte sur notre plateforme
          <NuxtLink to="/register" class="text-primary fw-bold">
            Lexikongo </NuxtLink
          >.
        </li>
        <li>
          <strong>Connectez-vous :</strong> Explorez les outils dédiés aux
          contributeurs dans votre tableau de bord.
        </li>
        <li>
          <strong>Soumettez vos contributions :</strong> Ajoutez des mots,
          verbes et expressions avec des détails tels que :
          <ul>
            <li>
              Singulier et pluriel, phonétique et au moins une traduction en
              français, pour les mots.
            </li>
            <li>
              Infinitif, Racine, suffixe et phonétique et au moins une
              traduction en français, pour les verbes.
            </li>
            <li>Traductions en Français et Anglais.</li>
          </ul>
        </li>
        <li>
          <strong>Suivez vos soumissions :</strong> Consultez leur statut (en
          attente, approuvé, rejeté) en temps réel.
        </li>
      </ol>
      <p>
        Ce processus structuré garantit la qualité et la pertinence des données
        ajoutées à notre base de connaissances.
      </p>
    </section>

    <!-- Plus qu'une contribution -->
    <section class="mb-5">
      <h2 class="text-primary">
        <i class="fas fa-lightbulb me-2"></i> Lexikongo : Plus qu’un lexique
      </h2>
      <p>
        Lexikongo aspire à devenir une plateforme révolutionnaire pour les
        apprenants, les chercheurs et les locuteurs de la langue Kikongo. Grâce
        à vos contributions, nous pouvons :
      </p>
      <ul>
        <li>Développer des outils linguistiques modernes.</li>
        <li>Intégrer des cours interactifs et des ressources éducatives.</li>
        <li>
          Étendre la base de données pour inclure des variantes et des dialectes
          régionaux.
        </li>
      </ul>
    </section>

    <!-- Soutenez-nous -->
    <section class="mb-5">
      <h2 class="text-primary">
        <i class="fas fa-hand-holding-heart me-2"></i> Soutenez-nous autrement
      </h2>
      <p>
        Vous souhaitez nous soutenir davantage ? Voici comment vous pouvez
        contribuer :
      </p>
      <ul>
        <li>
          <strong>Faire un don :</strong> Visitez notre page
          <NuxtLink to="/contribution" class="text-primary fw-bold">
            Contribution</NuxtLink
          >, pour savoir commment votre don sera utilisé.
        </li>
        <li>
          <strong>Partager Lexikongo :</strong> Faites connaître notre
          plateforme à votre entourage et sur vos réseaux sociaux.
        </li>
        <li>
          <strong>Envoyer des suggestions :</strong> Partagez vos idées et
          ressources pour enrichir notre projet.
        </li>
      </ul>
    </section>

    <!-- Appel à l'action -->
    <div class="text-center mt-4">
      <NuxtLink to="/register" class="btn btn-outline-primary btn-lg me-3">
        <i class="fas fa-user-plus me-2"></i> Rejoignez-nous
      </NuxtLink>
      <NuxtLink to="/contribution" class="btn btn-outline-success btn-lg me-3">
        <i class="fas fa-donate me-2"></i> Faire un Don à Lexikongo
      </NuxtLink>
      <NuxtLink to="/contact" class="btn btn-outline-secondary btn-lg">
        <i class="fas fa-envelope me-2"></i> Contactez-nous
      </NuxtLink>
    </div>
  </div>
</template>


<script setup>
import { useHead } from "@vueuse/head";
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Rejoignez la Communauté - Contributeurs de Lexikongo",
  description:
    "Rejoignez Lexikongo pour contribuer à enrichir le lexique Kikongo, préserver cette langue unique, et participer activement à un projet culturel et éducatif ambitieux. Découvrez comment vous impliquer dès aujourd'hui.",
  url: "https://www.lexikongo.fr/documentation/for-contributors",
  image: "https://www.lexikongo.fr/images/text_logo@1x.webp",
  publisher: {
    "@type": "Organization",
    name: "Lexikongo",
    logo: {
      "@type": "ImageObject",
      url: "https://www.lexikongo.fr/images/text_logo@1x.webp",
      width: 200,
      height: 200,
    },
  },
  mainEntity: {
    "@type": "CreativeWork",
    headline:
      "Rejoignez Lexikongo - Participez à la préservation et à l’enrichissement du lexique Kikongo",
    text: "Découvrez comment rejoindre notre communauté de contributeurs et aider à préserver la langue Kikongo. Devenez un acteur clé dans la création d'une ressource linguistique et culturelle inestimable.",
    author: {
      "@type": "Organization",
      name: "Lexikongo",
    },
  },
  potentialAction: {
    "@type": "JoinAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.lexikongo.fr/documentation/for-contributors",
    },
    description:
      "Rejoignez la communauté Lexikongo et contribuez à la préservation de la langue Kikongo en participant activement à notre projet.",
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
  title: "Rejoignez la Communauté - Contributeurs de Lexikongo",
  meta: [
    {
      name: "description",
      content:
        "Rejoignez Lexikongo pour enrichir le lexique Kikongo, préserver cette langue unique, et participer à un projet culturel et éducatif ambitieux. Découvrez comment vous impliquer.",
    },
    {
      name: "keywords",
      content:
        "Lexikongo, contributeurs, langue Kikongo, préservation linguistique, lexique Kikongo, culture africaine, langue africaine, communauté linguistique",
    },
    {
      name: "robots",
      content: "index, follow",
    },
    // Meta Open Graph pour les réseaux sociaux
    {
      property: "og:title",
      content: "Rejoignez la Communauté - Contributeurs de Lexikongo",
    },
    {
      property: "og:description",
      content:
        "Participez activement à la préservation de la langue Kikongo en rejoignant notre communauté de contributeurs passionnés. Aidez-nous à enrichir un lexique linguistique unique.",
    },
    {
      property: "og:image",
      content: "https://www.lexikongo.fr/images/text_logo@1x.webp",
    },
    {
      property: "og:url",
      content: "https://www.lexikongo.fr/documentation/for-contributors",
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
      content: "Rejoignez la Communauté - Contributeurs de Lexikongo",
    },
    {
      name: "twitter:description",
      content:
        "Découvrez comment contribuer à Lexikongo pour enrichir le lexique Kikongo, préserver cette langue unique, et participer à un projet culturel ambitieux.",
    },
    {
      name: "twitter:image",
      content: "https://www.lexikongo.fr/images/text_logo@1x.webp",
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
.contributors-page {
  max-width: 800px;
  margin: 0 auto;
}

a {
  text-decoration: none;
}
.btn-lg {
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .contributors-page {
    padding: 0.5rem;
  }

  .btn-lg {
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>
