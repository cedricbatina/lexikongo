<template>
  <div class="documentation">
    <h1>Documentation pour les Développeurs</h1>
    <p>
      Ce guide exhaustif fournit toutes les informations techniques pour
      contribuer au développement de Lexikongo, notamment sur la structure de la
      base de données, les API, les rôles utilisateurs, et les détails du
      déploiement.
    </p>

    <!-- Objectif et Contexte du Projet -->
    <h3>Objectif et Contexte du Projet</h3>
    <p>
      Lexikongo est une application Nuxt 3 conçue pour promouvoir et préserver
      la langue Kikongo, avec des fonctionnalités collaboratives permettant aux
      utilisateurs de soumettre, valider et consulter des mots et verbes en
      Kikongo, avec des traductions en français et anglais.
    </p>
    <p>
      L'application est construite pour être évolutive, permettant l'ajout de
      nouvelles langues et de rôles utilisateurs, ainsi qu'une gestion fine des
      permissions pour assurer la qualité du contenu. Cette architecture
      flexible permet également une intégration avec des systèmes externes, par
      exemple pour la gestion des utilisateurs ou des paiements de soutien.
    </p>

    <!-- Architecture de la Base de Données -->
    <h3>Architecture de la Base de Données</h3>
    <p>
      La base de données MySQL de Lexikongo est structurée pour gérer les
      utilisateurs, les rôles, les soumissions de mots et de verbes, les
      traductions, et les slugs uniques. Voici un aperçu détaillé des tables :
    </p>
    <ul>
      <li>
        <strong>users</strong> : Gère les informations des utilisateurs avec les
        champs <code>user_id</code>, <code>email</code>, <code>role</code>,
        <code>password</code>. Les rôles sont reliés à la table
        <code>roles</code>.
      </li>
      <li>
        <strong>roles</strong> : Contient les rôles (admin, contributeur,
        utilisateur) avec des permissions définies pour chaque type
        d’utilisateur.
      </li>
      <li>
        <strong>words</strong> et <strong>verbs</strong> : Tables principales
        contenant les mots et verbes validés, incluant des champs comme
        <code>singular</code>, <code>plural</code>, <code>root</code>,
        <code>suffix</code>, <code>phonetic</code>, et les
        <code>class_id</code> pour les déclinaisons nominales.
      </li>
      <li>
        <strong>word_meanings</strong> et <strong>verb_meanings</strong> :
        Gèrent les traductions de mots et de verbes dans les différentes
        langues. Les traductions sont liées aux mots et verbes par leurs
        <code>word_id</code> ou <code>verb_id</code>.
      </li>
      <li>
        <strong>pending_words_submissions</strong> et
        <strong>pending_verbs_submissions</strong> : Stockent les mots et verbes
        soumis par les contributeurs en attente de validation par un
        administrateur.
      </li>
      <li>
        <strong>pending_words_translations</strong> et
        <strong>pending_verbs_translations</strong> : Conservent les traductions
        en attente de validation, reliées aux soumissions via leur
        <code>submission_id</code>.
      </li>
      <li>
        <strong>slugs</strong> : Gère les slugs uniques pour les mots et verbes
        validés, essentiels pour le SEO et l'accès rapide via des URLs lisibles.
      </li>
      <li>
        <strong>archived_submissions</strong> : Archive les soumissions traitées
        pour un suivi de 90 jours, permettant aux administrateurs de consulter
        l'historique des décisions de validation ou de rejet.
      </li>
      <li>
        <strong>languages</strong> : Définit les langues disponibles pour les
        traductions, permettant l’ajout de nouvelles langues avec des champs
        comme <code>language_id</code>, <code>language_code</code>, et
        <code>language_name</code>.
      </li>
      <li>
        <strong>nominal_classes</strong> et
        <strong>derived_verb_types</strong> : Gèrent les classes nominales et
        les types de verbes pour organiser les formes linguistiques spécifiques
        au Kikongo.
      </li>
    </ul>

    <!-- Structure des Rôles et Permissions -->
    <h3>Gestion des Rôles et Permissions</h3>
    <p>
      Lexikongo utilise une gestion dynamique des rôles pour définir les actions
      autorisées pour chaque type d’utilisateur :
    </p>
    <ul>
      <li>
        <strong>Admin</strong> : Accès complet à toutes les fonctionnalités, y
        compris la gestion des soumissions, la modification des mots et verbes,
        et l’administration des utilisateurs. Peut valider, rejeter et archiver
        les contributions.
      </li>
      <li>
        <strong>Contributeur</strong> : Peut soumettre des mots et des verbes
        pour validation par un administrateur. Les soumissions sont placées dans
        les tables <code>pending_words_submissions</code> et
        <code>pending_verbs_submissions</code>.
      </li>
      <li>
        <strong>Utilisateur</strong> : Rôle en lecture seule permettant de
        consulter les mots et verbes validés dans Lexikongo. Les utilisateurs
        enregistrés ont accès à des détails supplémentaires, comme des exemples
        d’utilisation et des synonymes.
      </li>
    </ul>

    <!-- API et Endpoints -->
    <h3>API et Endpoints</h3>
    <p>
      Lexikongo dispose d’une API sécurisée utilisant des tokens JWT pour gérer
      l’authentification et les autorisations. Voici les principaux endpoints,
      leurs fonctions et des exemples de payloads :
    </p>

    <ul>
      <li>
        <strong>API de Soumission</strong>
        <ul>
          <li>
            <code>POST /api/submit-word</code> : Permet aux contributeurs de
            soumettre des mots avec les champs <code>singular</code>,
            <code>plural</code>, <code>phonetic</code>,
            <code>translations</code>. Les mots soumis sont ajoutés à la table
            <code>pending_words_submissions</code>.
          </li>
          <li>
            <code>POST /api/submit-verb</code> : Permet de soumettre des verbes
            avec les champs <code>root</code>, <code>suffix</code>,
            <code>phonetic</code>, et <code>translations</code>. Enregistré dans
            <code>pending_verbs_submissions</code>.
          </li>
        </ul>
      </li>
      <li>
        <strong>API de Validation/Rejet</strong>
        <ul>
          <li>
            <code>POST /api/approve-submission</code> : Valide une soumission et
            la déplace dans les tables <code>words</code> ou <code>verbs</code>.
            Archive la soumission en ajoutant une entrée dans
            <code>archived_submissions</code>.
          </li>
          <li>
            <code>POST /api/reject-submission</code> : Rejette une soumission
            avec un champ <code>reason</code> expliquant le motif. Archivé dans
            <code>archived_submissions</code>.
          </li>
        </ul>
      </li>
      <li>
        <strong>API de Gestion des Traductions</strong>
        <ul>
          <li>
            <code>PUT /api/update-translation</code> : Permet de modifier les
            traductions dans les tables <code>word_meanings</code> et
            <code>verb_meanings</code>. Utilise <code>word_id</code> ou
            <code>verb_id</code> pour identifier l’entrée et inclut les champs
            <code>language_code</code> et <code>meaning</code>.
          </li>
          <li>
            <code>DELETE /api/delete-translation</code> : Supprime une
            traduction spécifique d'un mot ou d'un verbe.
          </li>
        </ul>
      </li>
      <li>
        <strong>API de Slug</strong>
        <ul>
          <li>
            <code>GET /api/generate-slug</code> : Génère un slug unique pour un
            nouveau mot ou verbe. Les slugs sont ensuite enregistrés dans
            <code>slugs</code> pour les mots approuvés ou dans les tables
            temporaires pour les soumissions en attente.
          </li>
        </ul>
      </li>
    </ul>

    <!-- Exemples de Flux de Données et Journalisation des Actions -->
    <h3>Exemples de Flux de Données et Journalisation des Actions</h3>
    <p>
      Chaque action de validation ou de rejet de soumission est journalisée pour
      garantir une traçabilité complète et permet aux administrateurs de suivre
      l'historique des modifications. Voici un exemple de flux de données pour
      la validation d'un verbe :
    </p>
    <pre>
async function approveVerb(connection, verbSubmission, admin_id, submission_id) {
  const { name, root, suffix, phonetic, user_id } = verbSubmission;
  const slug = await generateUniqueSlug(connection, name);

  // Enregistrement du verbe approuvé
  const [result] = await connection.execute(`
    INSERT INTO verbs (name, root, suffix, phonetic, user_id, is_approved)
    VALUES (?, ?, ?, ?, ?, 1)`, [name, root, suffix, phonetic, user_id]);

  const approvedVerbId = result.insertId;
  
  // Création de slug et transfert de traductions
  await connection.execute(`INSERT INTO slugs (slug, verb_id) VALUES (?, ?)`, [slug, approvedVerbId]);
  await connection.execute(`
    INSERT INTO verb_meanings (verb_id, language_code, meaning)
    SELECT ?, language_code, meaning FROM pending_verbs_translations WHERE submission_id = ?`,
    [approvedVerbId, submission_id]);

  // Archivage de la soumission initiale
  await archiveVerb(connection, verbSubmission, "approved", admin_id, approvedVerbId);
  await connection.execute(`DELETE FROM pending_verbs_submissions WHERE submission_id = ?`, [submission_id]);
}
    </pre>

    <!-- Outils de Développement et Déploiement -->
    <h3>Outils de Développement et Déploiement</h3>
    <p>
      Lexikongo est configuré pour être déployé sur des plateformes compatibles
      Nuxt 3. Les développeurs peuvent utiliser les commandes suivantes pour
      gérer l’application :
    </p>
    <ul>
      <li><code>npm install</code> : Installer les dépendances nécessaires.</li>
      <li>
        <code>npm run dev</code> : Lancer le serveur de développement local.
      </li>
      <li>
        <code>npm run build</code> : Générer les fichiers de build pour le
        déploiement.
      </li>
      <li>
        <code>npm start</code> : Lancer l’application en mode production après
        le build.
      </li>
    </ul>

    <!-- Gestion des Conflits et Mises à Jour -->
    <h3>Gestion des Conflits et Mises à Jour</h3>
    <p>
      Pour une meilleure collaboration, il est recommandé d’utiliser un flux de
      travail Git standard (branches de fonctionnalités, pull requests, revues
      de code) et d’effectuer des tests approfondis avant chaque mise en
      production. Les mises à jour majeures doivent être documentées dans le
      fichier CHANGELOG.
    </p>
  </div>
</template>

<script setup>
import { useHead } from "#app";

useHead({
  title: "Documentation pour les Développeurs - Lexikongo",
  meta: [
    {
      name: "description",
      content:
        "Guide technique complet pour les développeurs travaillant sur Lexikongo, incluant l’architecture de la base de données, les API, et les détails de déploiement.",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: "Documentation pour les Développeurs",
        description:
          "Guide technique complet pour les développeurs travaillant sur Lexikongo, incluant l’architecture de la base de données, les API, et les détails de déploiement.",
        author: {
          "@type": "Batina",
          name: "Lexikongo",
        },
        publisher: {
          "@type": "Batina",
          name: "Lexikongo",
        },
      }),
    },
  ],
});
</script>