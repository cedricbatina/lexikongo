<template>
  <div class="contribution-page container mt-5">
    <!-- En-tête principale -->
    <header class="text-center mb-5">
      <h1 class="display-4 text-primary">
        <i class="fas fa-hand-holding-heart me-2"></i> Soutenez Lexikongo
      </h1>
      <p class="lead">
        Transformons ensemble Lexikongo en une ressource incontournable pour
        préserver et promouvoir la langue Kikongo. Votre soutien est une pierre
        angulaire de cette mission ambitieuse.
      </p>
    </header>
    <section class="text-center mb-5">
      <LogoSlogan />
      <SearchButtons />
      <ContributorButtons />
      <AdminButtons />
    </section>

    <!-- Pourquoi contribuer -->
    <section class="mb-5">
      <h2 class="text-primary">
        <i class="fas fa-question-circle me-2"></i> Pourquoi contribuer ?
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

    <!-- Témoignage et engagement -->
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
          <strong>Extension linguistique :</strong> Ajout de dialectes et de
          nouvelles langues africaines pour enrichir le réseau linguistique de
          Lexikongo.
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

    <!-- Comment contribuer -->
    <section class="text-center mb-5">
      <h2 class="text-primary">
        <i class="fas fa-donate me-2"></i> Comment contribuer ?
      </h2>
      <p class="m-3">Il existe plusieurs façons de soutenir Lexikongo :</p>
      <div class="contribution-options mb-4">
        <NuxtLink
          to="/documentation/for-contributors"
          class="btn btn-warning btn-lg me-3"
        >
          <i class="fas fa-hand-holding-usd me-2"></i> Faire un Don
        </NuxtLink>
        <NuxtLink to="/register" class="btn btn-outline-success btn-lg me-3">
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
    <div class="text-center mt-5">
      <p class="text-center mt-2 mb-4text-success fw-bold">
        Chaque action compte. Aidez-nous à préserver et moderniser la langue
        Kikongo pour les générations à venir.
      </p>
      <NuxtLink to="/contribute" class="btn btn-success btn-lg me-3">
        <i class="fas fa-donate me-2"></i> Contribuez Maintenant
      </NuxtLink>
      <NuxtLink to="/contact" class="btn btn-outline-secondary btn-lg">
        <i class="fas fa-envelope me-2"></i> Contactez-nous pour plus
        d’informations
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.btn {
  font-size: 1.1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
}

@media (max-width: 768px) {
  .btn {
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>


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
  image: "https://www.lexikongo.fr/images/contribution_banner.webp",
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
  mainEntity: {
    "@type": "CreativeWork",
    headline:
      "Soutenez Lexikongo - Contribuez à la Préservation de la Langue Kikongo",
    text: "Soutenez notre mission pour préserver et promouvoir la langue Kikongo. Vos dons financent le développement d'outils linguistiques modernes, enrichissent le contenu éducatif, et favorisent l'accès à une ressource unique pour cette langue africaine.",
    author: {
      "@type": "Organization",
      name: "Lexikongo",
    },
  },
  potentialAction: {
    "@type": "DonateAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.lexikongo.fr/contribution",
    },
    description:
      "Faites un don pour soutenir la préservation de la langue Kikongo.",
  },
  about: {
    "@type": "Thing",
    name: "Kikongo Language Preservation",
    sameAs: [
      "https://en.wikipedia.org/wiki/Kikongo",
      "https://fr.wikipedia.org/wiki/Kikongo",
    ],
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
        "Aidez à préserver la langue Kikongo en soutenant Lexikongo. Vos contributions permettent d'enrichir le lexique et de développer des outils linguistiques modernes.",
    },
    {
      name: "keywords",
      content:
        "Kikongo, contribution, préservation linguistique, Lexikongo, langue africaine, soutien, dons, patrimoine culturel, langue Kikongo, Kikongo, mots, verbes, linguistique, traduction, français, anglais, culture africaine, patrimoine linguistique, Dictionnaire Kikongo - Français, Dictionnaire - Anglais, Dictionnaire Kikongo - Français - Anglais, Dictionnaire africain, Mbanza Kongo, Congo, Congo-Brazzaville, RDC, Angola, Gabon, Cameroun, RCA, Centrafrique, Langues, Langues Bantoues",
    },
    {
      name: "author",
      content: "Lexikongo",
    },
    {
      name: "robots",
      content: "index, follow",
    },
    // Meta tags Open Graph pour les réseaux sociaux
    {
      property: "og:title",
      content:
        "Soutenez Lexikongo - Contribuez à la Préservation de la Langue Kikongo",
    },
    {
      property: "og:description",
      content:
        "Participez à la préservation du patrimoine linguistique Kikongo en soutenant Lexikongo. Vos dons financent le développement de notre plateforme et enrichissent son contenu éducatif.",
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
    // Twitter meta tags
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
        "Découvrez comment vos dons permettent d'enrichir le lexique Kikongo et de développer des outils linguistiques pour préserver cette langue africaine.",
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
    body: { amount: 10 }, // Montant en euros
  });

  if (response && response.id) {
    await stripe.redirectToCheckout({ sessionId: response.id });
  } else {
    alert("Erreur lors de la création de la session de paiement.");
  }
};

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