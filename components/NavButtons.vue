<template>
  <div class="button-container">
    <!-- Retour à l'accueil -->
    <button @click="goHome" class="btn btn-outline-secondary action-btn">
      <i class="fas fa-home"></i> Retour à l'accueil
    </button>

    <!-- Liste des mots -->
    <button @click="goWordsList" class="btn btn-outline-primary action-btn">
      <i class="fas fa-spell-check me-1"></i> Liste des mots
    </button>

    <!-- Liste des verbes -->
    <button @click="goVerbsList" class="btn btn-outline-warning action-btn">
      <i class="fa-solid fa-arrow-down-a-z"></i> Liste des verbes
    </button>
  </div>
</template>


<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

// Fonctions de navigation pour les pages
const goHome = () => {
  router.push("/");
};

const goWordsList = () => {
  router.push("/words");
};

const goVerbsList = () => {
  router.push("/verbs");
};
</script>
