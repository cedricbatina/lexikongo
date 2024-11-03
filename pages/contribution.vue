<template>
  <div class="pay-me-a-coffee">
    <h1>Contribuez à Lexikongo : Aidez-nous à Faire Grandir ce Projet !</h1>
    <p>
      Lexikongo est bien plus qu’un simple dictionnaire. C’est une plateforme
      dédiée à la préservation de la langue Kikongo et à son enseignement aux
      nouvelles générations, ainsi qu’aux passionnés de langues. Grâce à une
      approche collaborative, nous avons déjà pu construire une base de données
      riche et utile. Cependant, le potentiel de Lexikongo est immense, et avec
      votre aide, nous pouvons aller encore plus loin.
    </p>

    <!-- Importance du Projet -->
    <h2>Pourquoi Contribuer ?</h2>
    <p>Lexikongo peut devenir un projet clé pour :</p>
    <ul>
      <li>
        <strong>Les jeunes :</strong> Donner accès à des ressources modernes
        pour apprendre et comprendre le Kikongo, tout en favorisant l’intérêt
        pour les langues africaines.
      </li>
      <li>
        <strong>Les études linguistiques :</strong> Offrir un lexique trilingue
        en Kikongo, Français et Anglais, utile pour les chercheurs et étudiants
        en linguistique.
      </li>
      <li>
        <strong>Les locuteurs natifs :</strong> Aider les locuteurs Kikongo à
        préserver et partager leur langue dans un monde de plus en plus
        globalisé.
      </li>
    </ul>

    <!-- Utilisation des Dons -->
    <h2>Comment Votre Contribution Sera Utilisée</h2>
    <p>Les fonds recueillis serviront à :</p>
    <ul>
      <li>
        Développer de <strong>nouvelles fonctionnalités</strong> comme un
        système de notifications, un tableau de bord personnalisé, et des outils
        d’analyse linguistique.
      </li>
      <li>
        Étendre Lexikongo à <strong>d’autres langues</strong> et dialectes, pour
        créer un véritable réseau de lexiques africains.
      </li>
      <li>
        Améliorer <strong>l’expérience utilisateur</strong> sur tous les
        appareils, avec une interface fluide et intuitive.
      </li>
      <li>
        Mettre en place un <strong>système de recherche avancé</strong> pour
        permettre des recherches plus complètes et précises.
      </li>
      <li>
        Assurer la <strong>maintenance et sécurité</strong> du site afin de
        garantir un accès continu et sécurisé à Lexikongo.
      </li>
    </ul>

    <!-- Options de Dons -->
    <h2>Comment Contribuer ?</h2>
    <p>Pour soutenir Lexikongo, vous pouvez faire un don via :</p>
    <div class="donation-buttons">
      <button @click="donate('paypal')">Faire un Don via PayPal</button>
      <button @click="donate('bank-transfer')">
        Faire un Don par Virement Bancaire
      </button>
      <button @click="donate('other')">Autres Options de Don</button>
    </div>

    <!-- Remerciements et Appel à l'Action -->
    <h2>Merci de Votre Soutien !</h2>
    <p>
      En soutenant Lexikongo, vous participez activement à la préservation du
      patrimoine linguistique Kikongo et à l’accès à une éducation linguistique
      moderne et accessible. Nous sommes reconnaissants pour chaque
      contribution, et nous nous engageons à faire évoluer Lexikongo pour qu’il
      devienne une ressource de référence pour tous.
    </p>
    <p>
      Ensemble, nous pouvons faire de Lexikongo un projet qui inspire et
      soutient les générations présentes et futures.
    </p>
  </div>
</template>

<script setup>
import { useHead } from "nuxt/app";

useHead({
  title: "Contribuez à Lexikongo - Pay Me a Coffee",
  meta: [
    {
      name: "description",
      content:
        "Contribuez au projet Lexikongo pour soutenir le développement et la préservation de la langue Kikongo. Faites un don pour nous aider à ajouter de nouvelles fonctionnalités et à élargir notre lexique.",
    },
  ],
});

// Fonctions de don
function donate(method) {
  if (method === "paypal") {
    window.open("https://www.paypal.com/donate/lexikongo", "_blank");
  } else if (method === "bank-transfer") {
    alert(
      "Merci pour votre intérêt à faire un don par virement bancaire. Veuillez nous contacter pour obtenir les informations bancaires."
    );
  } else {
    alert(
      "Nous vous remercions pour votre soutien ! Veuillez nous contacter pour discuter des autres options de don disponibles."
    );
  }
}
</script>

<style scoped>
.pay-me-a-coffee {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  line-height: 1.8;
  font-family: Arial, sans-serif;
}

.pay-me-a-coffee h1,
.pay-me-a-coffee h2 {
  color: #2a9d8f;
}

.pay-me-a-coffee p {
  margin-bottom: 1em;
}

.donation-buttons {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.donation-buttons button {
  background-color: #e76f51;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.donation-buttons button:hover {
  background-color: #d65c44;
}
</style>
