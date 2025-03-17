<template>
  <div class="documentation">
    <h1>Guide des Administrateurs</h1>
    <p>
      Les administrateurs ont un rôle crucial dans la gestion et la modération
      des contributions de mots et de verbes sur la plateforme Lexikongo. Ce
      guide détaille leurs responsabilités, les outils de modération, et les
      étapes pour devenir administrateur.
    </p>

    <!-- Conditions pour devenir Administrateur -->
    <h3>Conditions pour devenir Administrateur</h3>
    <p>Pour postuler en tant qu’administrateur, les utilisateurs doivent :</p>
    <ul>
      <li>Créer un compte utilisateur sur Lexikongo.</li>
      <li>Faire une demande via le formulaire de contact.</li>
      <li>
        Être un expert en Kikongo ou avoir terminé le cours
        <a
          href="https://longoka.fr/cours/apprenez-les-bases-du-kikongo-classique/"
          >Apprenez les bases du Kikongo classique</a
        >.
      </li>
    </ul>

    <!-- Rôles et Responsabilités -->
    <h3>Rôles et Responsabilités des Administrateurs</h3>
    <p>
      Les administrateurs ont un accès complet à toutes les fonctionnalités et
      sont responsables de la gestion des contenus, de la modération et de
      l'archivage des soumissions. Voici leurs principales responsabilités :
    </p>
    <ul>
      <li>
        <strong>Modération des Contributions :</strong> Examiner, approuver ou
        rejeter les soumissions de mots et verbes dans le tableau de bord de
        modération (<code>ManageSubmissions.vue</code>).
      </li>
      <li>
        <strong>Validation et Rejet :</strong> Lorsqu'une soumission est
        approuvée, elle est transférée dans les tables finales
        <code>words</code> ou <code>verbs</code>. En cas de rejet, un motif peut
        être spécifié, et la soumission est archivée dans
        <code>archived_submissions</code>.
      </li>
      <li>
        <strong>Archivage :</strong> Les soumissions traitées sont stockées
        pendant 90 jours dans une archive avant suppression automatique, offrant
        un historique pour la modération.
      </li>
      <li>
        <strong>Gestion des Utilisateurs :</strong> Accéder aux paramètres des
        utilisateurs, gérer les contributeurs et leurs soumissions, et approuver
        les demandes de nouveaux administrateurs.
      </li>
    </ul>

    <!-- Outils et Vue Administrateur -->
    <h3>Outils et Vue Administrateur</h3>
    <p>
      L’interface admin inclut des fonctionnalités spécifiques pour la
      modération et l'administration des données :
    </p>
    <ul>
      <li>
        <strong>Tableau de Bord :</strong> Accès rapide aux statistiques, y
        compris le nombre de mots, verbes, utilisateurs et soumissions en
        attente. Des graphiques montrent l'évolution du contenu et des
        contributions.
      </li>
      <li>
        <strong>Composants de Formulaires :</strong> Les composants
        <code>AdminAddWord</code> et <code>AdminAddVerb</code> permettent
        l'ajout direct de mots et de verbes, sans besoin de validation.
      </li>
      <li>
        <strong>Gestion des Slugs :</strong> Les administrateurs peuvent générer
        des slugs uniques pour chaque mot et verbe validé, assurant des URLs
        optimisées pour le SEO.
      </li>
    </ul>

    <!-- Fonctionnalités Futures pour les Administrateurs -->
    <h3>Fonctionnalités Futures</h3>
    <ul>
      <li>
        <strong>Tableau de Bord des Statistiques :</strong> Afficher des données
        analytiques avancées sur les contributions, les taux d'approbation, et
        les délais moyens de validation.
      </li>
      <li>
        <strong>Notifications pour les Contributeurs :</strong> Ajouter un
        système de notification pour informer les contributeurs de l’évolution
        de leurs soumissions (validation ou rejet).
      </li>
      <li>
        <strong>Améliorations de l'Archivage :</strong> Étendre la période de
        rétention ou ajouter des options de tri avancées pour faciliter l’accès
        aux archives.
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useHead } from "nuxt/app";

useHead({
  title: "Guide des Administrateurs - Lexikongo",
  meta: [
    {
      name: "description",
      content:
        "Guide complet pour les administrateurs de Lexikongo, incluant le processus de validation des soumissions et les responsabilités de gestion.",
    },
  ],
});
</script>
