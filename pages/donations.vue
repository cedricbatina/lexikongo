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
      <p>Il existe plusieurs façons de soutenir Lexikongo :</p>
      <div class="contribution-options mb-4">
        <NuxtLink to="/donations" class="btn btn-primary btn-lg me-3">
          <i class="fas fa-hand-holding-usd me-2"></i> Faire un Don
        </NuxtLink>
        <NuxtLink
          to="/contributors"
          class="btn btn-outline-success btn-lg me-3"
        >
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
      <p class="text-muted">
        Chaque action compte. Aidez-nous à préserver et moderniser la langue
        Kikongo pour les générations à venir.
      </p>
      <NuxtLink to="/donations" class="btn btn-primary btn-lg me-3">
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
