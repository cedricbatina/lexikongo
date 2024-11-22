<template>
  <div class="documentation container mt-5">
    <!-- En-tête principale -->
    <header class="text-center mb-5">
      <h1 class="display-4 text-primary mb-4 mt-4">
        <i class="fas fa-hands-helping me-2"></i> Documentation de Lexikongo
      </h1>
      <p class="lead text-default">
        Bienvenue dans la documentation de Lexikongo, une plateforme
        collaborative pour la préservation et l’apprentissage du Kikongo.
      </p>
    </header>

    <section class="text-center mb-5">
      <LogoSlogan />
      <SearchButtons />
      <ContributorButtons />
      <AdminButtons />
    </section>

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
