<template>
  <div class="container mt-5">
    <header class="text-center mb-4">
      <h1 class="display-4 text-primary mb-4 mt-4">
        <i class="fas fa-shield-alt me-2"></i> Politique de Confidentialité
      </h1>
      <p class="lead">
        Dernière mise à jour : {{ lastUpdated }}
      </p>
    </header>

    <section class="mb-5">
      <h2 class="text-primary">1. Informations Générales</h2>
      <p>
        Cette politique de confidentialité explique comment 
        <strong>@rtful Batina Creative Studios</strong> collecte, utilise et protège vos informations
        personnelles lorsque vous utilisez notre site <strong>Lexikongo</strong> (<a href="https://lexikongo.fr" target="_blank">lexikongo.fr</a>).
      </p>
    </section>

    <section class="mb-5">
      <h2 class="text-primary">2. Identité et coordonnées du responsable du traitement</h2>
      <ul class="list-unstyled">
        <li><strong>Nom légal :</strong> MONSIEUR CEDRIC BATINA</li>
        <li><strong>Nom commercial :</strong> @rtful Batina Creative Studios</li>
        <li><strong>SIRET :</strong> 911 940 070 00012</li>
        <li><strong>Code NAF / APE :</strong> 6201Z (Programmation informatique)</li>
      <!--  <li><strong>Date d’immatriculation :</strong> 24 février 2022</li>-->
        <li><strong>Hébergement :</strong> Infomaniak (Base de données et domaine)</li>
        <li><strong>Déploiement :</strong> Netlify</li>
      </ul>
    </section>

    <section class="mb-5">
      <h2 class="text-primary">3. Données collectées</h2>
      <p>Nous collectons les informations suivantes :</p>
      <ul>
        <li>Adresse e-mail (lors de l’inscription ou du contact)</li>
        <li>Nom d’utilisateur et informations de profil</li>
        <li>Données de navigation et cookies</li>
        <li>Contributions (mots, verbes, traductions) soumises à la plateforme</li>
      </ul>
    </section>

    <section class="mb-5">
      <h2 class="text-primary">4. Finalité du traitement des données</h2>
      <p>Nous utilisons vos données pour :</p>
      <ul>
        <li>Gérer votre compte utilisateur et vos contributions</li>
        <li>Améliorer la plateforme Lexikongo</li>
        <li>Assurer la sécurité et la modération du contenu</li>
        <li>Envoyer des notifications importantes liées à votre compte</li>
      </ul>
    </section>

    <section class="mb-5">
      <h2 class="text-primary">5. Partage des données</h2>
      <p>Vos données ne sont jamais vendues. Cependant, nous pouvons les partager avec :</p>
      <ul>
        <li>Nos prestataires techniques (hébergement, déploiement, analyses anonymisées)</li>
        <li>Les autorités compétentes en cas d’obligation légale</li>
      </ul>
    </section>

    <section class="mb-5">
      <h2 class="text-primary">6. Stockage et sécurité des données</h2>
      <p>
        Les données sont stockées sur les serveurs sécurisés d’Infomaniak.
        Nous mettons en place des mesures de protection (chiffrement, accès restreint) pour garantir leur sécurité.
      </p>
    </section>

    <section class="mb-5">
      <h2 class="text-primary">7. Vos droits</h2>
      <p>Conformément au RGPD, vous avez les droits suivants :</p>
      <ul>
        <li><strong>Droit d’accès :</strong> Vous pouvez demander une copie des données vous concernant.</li>
        <li><strong>Droit de rectification :</strong> Vous pouvez demander la correction d’informations inexactes.</li>
        <li><strong>Droit à l’effacement :</strong> Vous pouvez demander la suppression de vos données.</li>
        <li><strong>Droit à la limitation du traitement :</strong> Dans certains cas, vous pouvez restreindre l’utilisation de vos données.</li>
        <li><strong>Droit à la portabilité :</strong> Vous pouvez récupérer vos données dans un format structuré.</li>
      </ul>
      <p>Pour exercer ces droits, contactez-nous à <a href="mailto:contact@lexikongo.fr">contact@lexikongo.fr</a>.</p>
    </section>

    <section class="mb-5">
      <h2 class="text-primary">8. Cookies</h2>
      <p>Nous utilisons des cookies pour :</p>
      <ul>
        <li>Améliorer votre expérience utilisateur</li>
        <li>Analyser le trafic et optimiser le site</li>
      </ul>
      <p>Vous pouvez gérer vos préférences en matière de cookies dans les paramètres de votre navigateur.</p>
    </section>

    <section class="mb-5">
      <h2 class="text-primary">9. Modifications</h2>
      <p>Cette politique de confidentialité peut être mise à jour. Nous vous informerons en cas de modifications importantes.</p>
    </section>

    <footer class="text-center mt-5">
      <p class="small">&copy; {{ currentYear }} @rtful Batina Creative Studios. Tous droits réservés.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";

const currentYear = ref(new Date().getFullYear());
const lastUpdated = ref("16 mars 2025"); // 🔄 Met à jour la date lors de changements
</script>

<style scoped>
h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

p, li {
  font-size: 1rem;
}

.container {
  max-width: 800px;
  margin: auto;
}

/* Responsive */
@media (max-width: 768px) {
  h2 {
    font-size: 1.3rem;
  }
  p, li {
    font-size: 0.95rem;
  }
}
</style>
