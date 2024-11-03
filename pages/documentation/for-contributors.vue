<template>
  <div class="documentation">
    <h1>Guide des Contributeurs</h1>
    <p>
      Les contributeurs enrichissent la plateforme Lexikongo en soumettant de
      nouveaux mots et verbes pour aider à la préservation de la langue Kikongo.
      Ce guide détaille le processus de soumission et les conditions d'accès
      pour devenir contributeur.
    </p>

    <!-- Conditions pour devenir Contributeur -->
    <h3>Conditions pour devenir Contributeur</h3>
    <p>Pour contribuer à Lexikongo, les utilisateurs doivent :</p>
    <ul>
      <li>Créer un compte utilisateur sur Lexikongo.</li>
      <li>
        Maîtriser le Kikongo ou avoir suivi le cours
        <a
          href="https://longoka.fr/cours/apprenez-les-bases-du-kikongo-classique/"
          >Apprenez les bases du Kikongo classique</a
        >.
      </li>
      <li>
        Comprendre la phonétique et les déclinaisons de la langue Kikongo, pour
        fournir des soumissions précises et complètes.
      </li>
    </ul>

    <!-- Processus de Soumission -->
    <h3>Processus de Soumission</h3>
    <p>
      Les contributeurs peuvent soumettre des mots et verbes via les formulaires
      dédiés. Les soumissions incluent :
    </p>
    <ul>
      <li>Formes singulière et plurielle pour les noms.</li>
      <li>
        Classe nominale pour les mots et racine et suffixe pour les verbes.
      </li>
      <li>Phonétique et traduction en Français et Anglais.</li>
    </ul>
    <p>
      Les soumissions sont stockées dans des tables temporaires (<code
        >pending_words_submissions</code
      >
      et <code>pending_verbs_submissions</code>) en attente de validation par un
      administrateur. Un slug unique est également généré pour chaque mot ou
      verbe soumis.
    </p>

    <!-- Consultation et Suivi des Soumissions -->
    <h3>Consultation et Suivi des Soumissions</h3>
    <p>
      Les contributeurs peuvent suivre leurs soumissions et vérifier leur statut
      (en attente, approuvé, rejeté) dans l'interface
      <code>ContributorSubmissions.vue</code>. Le statut est mis à jour via
      l'API <code>get-submissions-by-user/[id]</code>.
    </p>

    <!-- Autres Façons de Contribuer -->
    <h3>Autres Façons de Contribuer</h3>
    <ul>
      <li>
        Les utilisateurs peuvent soutenir le projet via des dons pour financer
        le développement et les améliorations de l'application. Accédez à la
        page
        <NuxtLink to="/contribution">Contribution</NuxtLink> pour effectuer un
        don.
      </li>

      <li>
        Les contributions sans compte sont possibles en fournissant des
        ressources ou informations sur le Kikongo.
      </li>
    </ul>
  </div>
</template>

<script setup>
useHead({
  title: "Guide des Contributeurs - Lexikongo",
  meta: [
    {
      name: "description",
      content:
        "Guide pour les contributeurs souhaitant ajouter des mots et verbes sur Lexikongo, avec des détails sur le processus de soumission.",
    },
  ],
});
</script>
