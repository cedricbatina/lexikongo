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
    <!-- Pourquoi contribuer -->
    <section class="mb-5">
      <h2 class="text-primary">
        <i class="fa-solid fa-ribbon"></i> Engagement socio-culturel
      </h2>
      <p>
        Lexikongo n’est pas une simple plateforme numérique, mais une mission
        qui vise à préserver et à moderniser l'une des langues les plus riches
        et anciennes d'Afrique : le Kikongo. En soutenant ce projet, vous jouez
        un rôle actif dans :
      </p>
      <ul>
        <li>
          <strong>Préserver le patrimoine linguistique :</strong> Le Kikongo,
          avec ses plus de <strong>350 000 mots et verbes</strong>, est une
          langue en danger face à l’érosion culturelle. Chaque don contribue à
          documenter et préserver ce trésor inestimable.
        </li>
        <li>
          <strong>Favoriser l’éducation et la recherche :</strong> Votre soutien
          permet de créer des outils modernes pour l’enseignement, comme des
          cours interactifs, des guides d’apprentissage, et des lexiques
          numériques multilingues (Kikongo-Français-Anglais).
        </li>
        <li>
          <strong>Créer une langue vivante et moderne :</strong> Aidez-nous à
          introduire de nouveaux mots pour parler des sciences, de la
          technologie, et des concepts modernes tout en respectant la structure
          du Kikongo classique.
        </li>
        <li>
          <strong>Inspirer les générations futures :</strong> Grâce à votre
          soutien, nous transmettons aux jeunes une langue qui ne se limite pas
          à un héritage, mais devient un outil d’expression et d’innovation.
        </li>
      </ul>
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
            <a href="mailto:contact@lexikongo.fr" class="email-link fw-bold"
              >contact@lexikongo.fr</a
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

    <section class="mb-5">
      <h2 class="text-primary">
        <i class="fas fa-lightbulb me-2"></i> Un rêve collectif
      </h2>
      <p>
        Imaginez une plateforme où le Kikongo devient une langue centrale pour
        l’éducation, la recherche, et la culture. Imaginez des étudiants
        apprenant à coder, à innover, à enseigner les sciences en Kikongo. C’est
        une vision ambitieuse, mais réalisable grâce à votre soutien.
      </p>
      <p>
        Chaque mot ajouté au lexique, chaque euro versé pour développer cette
        plateforme, chaque partage de connaissances nous rapproche de cet
        objectif. Votre soutien n’est pas qu’un don ; il est un investissement
        dans l’avenir d’une culture millénaire.
      </p>
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
          <NuxtLink to="/contribute" class="text-primary fw-bold">
            Contribution Financière</NuxtLink
          >, pour nous soutenir
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
    <!-- Comment contribuer -->
    <section class="text-center mb-5">
      <h2 class="text-primary">
        <i class="fas fa-hands-helping me-2"></i> Comment contribuer ?
      </h2>
      <p class="m-3">Il existe plusieurs façons de soutenir Lexikongo :</p>
      <div class="contribution-options mb-4">
        <NuxtLink to="/contribute" class="btn btn-outline-success btn-lg me-3">
          <i class="fas fa-hand-holding-usd me-2"></i> Faire un Don à Lexikongo
        </NuxtLink>

        <NuxtLink to="/register" class="btn btn-outline-info btn-lg me-3">
          <i class="fas fa-users me-2"></i> Rejoindre les Contributeurs
        </NuxtLink>
        <NuxtLink to="/contact" class="btn btn-outline-secondary btn-lg">
          <i class="fas fa-envelope me-2"></i> Contactez-nous
        </NuxtLink>
      </div>
      <p>
        Votre contribution, qu’elle soit financière ou intellectuelle, est
        précieuse pour bâtir un futur où le Kikongo est à la fois préservé et
        modernisé.
      </p>
    </section>
    <!-- Où vont vos dons -->
    <section class="mb-5">
      <h2 class="text-primary">
        <i class="fas fa-coins me-2"></i> Où vont vos dons ?
      </h2>
      <p>
        Vos dons sont utilisés avec soin et transparence. Voici quelques
        exemples de ce qu’ils permettent de financer :
      </p>
      <ul>
        <li>
          <strong>Développement technique :</strong> Création et maintenance de
          la plateforme, ajout de fonctionnalités comme la recherche avancée et
          des tableaux de bord pour les contributeurs.
        </li>
        <li>
          <strong>Production de contenu éducatif :</strong> Développement de
          cours, guides, vidéos et autres supports pédagogiques pour promouvoir
          l’apprentissage du Kikongo.
        </li>
        <li>
          <strong>Extension linguistique :</strong> Ajout de dialectes, de
          nouvelles langues africaines, des traductions dans d'autres langues,
          pour enrichir le réseau linguistique de Lexikongo.
        </li>
        <li>
          <strong>Formation et soutien des contributeurs :</strong> Mise en
          place d’outils collaboratifs, formations pour les volontaires, et
          partenariats avec des écoles et des universités.
        </li>
        <li>
          <strong>Maintenance et sécurité :</strong> Garantir un accès fiable et
          sécurisé à tous les utilisateurs à travers le monde.
        </li>
      </ul>
    </section>

    <!-- Vision collective -->
    <section class="mb-5">
      <h2 class="text-primary">
        <i class="fas fa-rocket me-2"></i> Construire une plateforme pour tous
      </h2>
      <p>
        Notre vision dépasse la préservation linguistique. Lexikongo ambitionne
        de devenir une plateforme où le Kikongo est utilisé pour enseigner,
        communiquer, et innover. Grâce à votre soutien, nous pourrons construire
        une base de données dynamique et accessible, tout en inspirant les
        générations futures à embrasser cette langue unique.
      </p>
      <p>
        Rejoignez-nous dans ce voyage fascinant, où chaque contribution
        rapproche le Kikongo d’une place centrale dans le monde numérique.
      </p>
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
