<template>
  <div class="search-buttons">
    <nuxt-link to="/search-words" class="btn btn-outline-primary m-2">
      <i class="fa fa-search"></i> Rechercher des mots
    </nuxt-link>
    <nuxt-link to="/search-verbs" class="btn btn-outline-success m-2">
      <i class="fa fa-search"></i> Rechercher des verbes
    </nuxt-link>
    <nuxt-link to="/words" class="btn btn-outline-primary m-2">
      <i class="fas fa-spell-check me-1"></i> Liste des mots
    </nuxt-link>
    <nuxt-link to="/verbs" class="btn btn-outline-success m-2">
      <i class="fa-solid fa-arrow-down-a-z"></i> Liste des verbes
    </nuxt-link>
    <nuxt-link to="/expressions" class="btn btn-outline-info m-2">
      <i class="fas fa-book"></i> Liste de mots & verbes
    </nuxt-link>
    <nuxt-link to="/for-contributors" class="btn btn-outline-warning m-2">
      <i class="fas fa-book"></i> Contribuer sur Lexikongo
    </nuxt-link>
    <nuxt-link to="/" class="btn btn-outline-secondary m-2">
      <i class="fas fa-home"></i> Retour à l'accueil
    </nuxt-link>
  </div>
</template>
