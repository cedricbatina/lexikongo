<template>
  <div class="button-container">
    <!-- Retour à l'accueil -->
    <button @click="goHome" class="action-btn home-btn">
      <i class="fas fa-home"></i> Retour à l'accueil
    </button>

    <!-- Liste des mots -->
    <button @click="goWordsList" class="action-btn words-btn">
      <i class="fas fa-book"></i> Liste des mots
    </button>

    <!-- Liste des verbes -->
    <button @click="goVerbsList" class="action-btn verbs-btn">
      <i class="fas fa-pencil-alt"></i> Liste des verbes
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

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.action-btn {
  border: 2px solid;
  font-size: 1rem;
  font-weight: 500;
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

/* Spécificités de chaque bouton */
.home-btn {
  border-color: #6c757d;
  color: #6c757d;
}

.words-btn {
  border-color: #007bff;
  color: #007bff;
}

.verbs-btn {
  border-color: #ff8a1d;
  color: #ff8a1d;
}

@media (max-width: 768px) {
  .action-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
