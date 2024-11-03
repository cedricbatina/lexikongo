<template>
  <div class="documentation">
    <h1>Documentation de Lexikongo</h1>
    <p>
      Bienvenue dans la documentation de Lexikongo, une plateforme collaborative
      pour la préservation et l’apprentissage du Kikongo.
    </p>
    <p>
      Cette documentation est organisée en sections spécifiques selon les
      besoins de chaque type d’utilisateur :
    </p>
    <ul>
      <li>
        <router-link to="/documentation/for-devs"
          >Documentation pour les Développeurs</router-link
        >
      </li>
      <li>
        <router-link to="/documentation/for-contributors"
          >Guide des Contributeurs</router-link
        >
      </li>
      <li>
        <router-link to="/documentation/for-admins"
          >Guide des Administrateurs</router-link
        >
      </li>
      <li>
        <router-link to="/documentation/for-users"
          >Guide des Utilisateurs</router-link
        >
      </li>
    </ul>
    <p>
      Pour contribuer ou obtenir des permissions supplémentaires, veuillez
      consulter les informations spécifiques de chaque rôle.
    </p>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Documentation",
};
</script>
