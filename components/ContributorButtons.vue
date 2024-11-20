<template>
  <div
    v-if="authStore.userRole.includes('contributor')"
    class="button-container"
  >
    <!-- Ajouter un mot -->
    <button @click="addWord" class="btn btn-outline-primary action-btn">
      <i class="fas fa-spell-check me-1"></i> Ajouter un mot
    </button>

    <!-- Ajouter un verbe -->
    <button @click="addVerb" class="btn btn-outline-success action-btn">
      <i class="fa-solid fa-arrow-down-a-z"></i> Ajouter un verbe
    </button>

    <!-- Retour à l'accueil -->
    <button @click="goHome" class="btn btn-outline-secondary action-btn">
      <i class="fas fa-home"></i> Retour à l'accueil
    </button>

    <!-- Accéder au tableau de bord Contributor -->
    <button @click="goContributorBoard" class="btn btn-outline-info action-btn">
      <i class="fas fa-user-cog"></i> Contributor Board
    </button>
  </div>
</template>


<script setup>
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const addVerb = () => {
  router.push("/contributor/add-verb");
};

const addWord = () => {
  router.push("/contributor/add-word");
};

const goHome = () => {
  router.push("/");
};

const goContributorBoard = () => {
  router.push("/contributor");
};
</script>

