<template>
  <div v-if="authStore.userRole === 'admin'" class="button-container">
    <!-- Ajouter un verbe -->
    <button @click="addVerb" class="action-btn verb-btn">
      <i class="fas fa-pencil-alt"></i> Ajouter un verbe
    </button>

    <!-- Ajouter un mot -->
    <button @click="addWord" class="action-btn word-btn">
      <i class="fas fa-book"></i> Ajouter un mot
    </button>

    <!-- Ajouter un utilisateur -->
    <button @click="addUser" class="action-btn user-btn">
      <i class="fas fa-user-plus"></i> Ajouter un utilisateur
    </button>

    <!-- Retour à l'accueil -->
    <button @click="goHome" class="action-btn home-btn">
      <i class="fas fa-home"></i> Retour à l'accueil
    </button>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const addVerb = () => {
  router.push("/admin/admin-add-verb");
};

const addWord = () => {
  router.push("/admin/admin-add-word");
};

const addUser = () => {
  router.push("/admin/admin-add-user");
};

const goHome = () => {
  router.push("/");
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
  font-weight: 500; /* Moins gras pour alléger le texte */
  padding: 0.5rem 1rem;
  background-color: transparent;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  border-radius: 10px; /* Coins arrondis */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Légère ombre */
}

.action-btn:hover {
  background-color: #e7e9e7; /* Fond léger au survol */
}

.action-btn i {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

/* Style pour chaque type de bouton */
.verb-btn {
  border-color: #ff8a1d; /* Bordure orange */
  color: #ff8a1d;
}

.word-btn {
  border-color: #007bff; /* Bordure bleue */
  color: #007bff;
}

.user-btn {
  border-color: #28a745; /* Bordure verte */
  color: #28a745;
}

.home-btn {
  border-color: #6c757d; /* Bordure grise */
  color: #6c757d;
}

@media (max-width: 768px) {
  .action-btn {
    width: 100%;
    text-align: center;
  }
}
</style>
