<template>
  <div
    v-if="authStore.userRole.includes('contributor')"
    class="button-container"
  >
    <!-- Ajouter un verbe -->
    <button @click="addVerb" class="action-btn verb-btn">
      <i class="fas fa-pencil-alt"></i> Ajouter un verbe
    </button>

    <!-- Ajouter un mot -->
    <button @click="addWord" class="action-btn word-btn">
      <i class="fas fa-book"></i> Ajouter un mot
    </button>

    <!-- Retour à l'accueil -->
    <button @click="goHome" class="action-btn home-btn">
      <i class="fas fa-home"></i> Retour à l'accueil
    </button>

    <!-- Accéder au tableau de bord Contributor -->
    <button @click="goContributorBoard" class="action-btn dashboard-btn">
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

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.action-btn {
  border: 2px solid;
  color: #007bff;
  font-size: 1rem;
  font-weight: 500; /* Police plus légère */
  padding: 0.5rem 1rem;
  background-color: transparent;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.action-btn:hover {
  background-color: #e7e9e7;
}

.action-btn i {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

/* Couleurs adaptées pour chaque type de bouton */
.verb-btn {
  border-color: #ff8a1d;
  color: #ff8a1d;
}

.word-btn {
  border-color: #007bff;
  color: #007bff;
}

.home-btn {
  border-color: #6c757d;
  color: #6c757d;
}

.dashboard-btn {
  border-color: #17a2b8;
  color: #17a2b8;
}

@media (max-width: 768px) {
  .action-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
