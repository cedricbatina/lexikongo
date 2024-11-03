<template>
  <div class="documentation">
    <h1>Guide des Utilisateurs</h1>
    <p>
      Lexikongo est une plateforme accessible à tous les utilisateurs pour
      consulter le lexique trilingue en Kikongo, Français et Anglais. Ce guide
      décrit les fonctionnalités disponibles en fonction du type de compte
      utilisateur.
    </p>

    <!-- Fonctionnalités pour Tous les Utilisateurs -->
    <h3>Fonctionnalités pour Tous les Utilisateurs</h3>
    <p>Tous les visiteurs, avec ou sans compte, peuvent :</p>
    <ul>
      <li>
        Consulter le lexique pour explorer les mots et verbes en Kikongo et
        leurs traductions.
      </li>
      <li>
        Rechercher des expressions et enrichir leur connaissance du Kikongo.
      </li>
    </ul>

    <!-- Fonctionnalités pour les Utilisateurs avec Compte -->
    <h3>Fonctionnalités pour les Utilisateurs avec Compte</h3>
    <p>Les utilisateurs inscrits bénéficient de fonctionnalités avancées :</p>
    <ul>
      <li>Accès aux exemples d'utilisation pour les mots et les verbes.</li>
      <li>
        Consultation des synonymes et des détails linguistiques supplémentaires.
      </li>
      <li>
        Possibilité de soumettre des demandes pour devenir contributeur ou
        administrateur, si les conditions sont remplies.
      </li>
    </ul>

    <!-- Contributions Financières pour le Développement -->
    <h3>Contributions Financières</h3>
    <p>
      Les utilisateurs peuvent également soutenir Lexikongo en contribuant
      financièrement via
      <a href="https://www.paymeacoffee.com">Pay Me a Coffee</a>. Les dons
      permettent d'améliorer l'application et d'ajouter de nouvelles
      fonctionnalités.
    </p>
  </div>
</template>

<script setup>
useHead({
  title: "Guide des Utilisateurs - Lexikongo",
  meta: [
    {
      name: "description",
      content:
        "Guide pour les utilisateurs de Lexikongo, avec les fonctionnalités accessibles avec et sans compte.",
    },
  ],
});
</script>
