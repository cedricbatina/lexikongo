<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid d-flex justify-content-between">
      <!-- Logo aligné à gauche -->
      <div class="navbar-brand">
        <Logo />
      </div>

      <!-- Bouton hamburger pour mobile -->
      <button
        class="navbar-toggler"
        type="button"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span :class="['navbar-toggler-icon', { open: isMenuOpen }]"></span>
      </button>

      <!-- Menu principal aligné à droite -->
      <div
        class="collapse navbar-collapse justify-content-end"
        :class="{ show: isMenuOpen }"
      >
        <ul class="navbar-nav">
          <!-- Lien visible pour tout le monde (utilisateur connecté ou non) -->
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/">
              <i class="fas fa-home me-1"></i> Accueil
            </nuxt-link>
          </li>

          <li class="nav-item">
            <nuxt-link class="nav-link" to="/words">
              <i class="fas fa-spell-check me-1"></i> Les Mots
            </nuxt-link>
          </li>

          <li class="nav-item">
            <nuxt-link class="nav-link" to="/verbs">
              <i class="fas fa-pencil-alt me-1"></i> Les Verbes
            </nuxt-link>
          </li>

          <!-- Lien vers le profil visible uniquement si l'utilisateur est connecté -->
          <li v-if="isLoggedIn && userRole === 'user'" class="nav-item">
            <nuxt-link class="nav-link" to="/user">
              <i class="fas fa-user"></i> Profil
            </nuxt-link>
          </li>

          <!-- Lien vers le tableau de bord admin visible uniquement pour les admins -->
          <li v-if="isLoggedIn && userRole === 'contributor'" class="nav-item">
            <nuxt-link class="nav-link" to="/contributor">
              <i class="fas fa-cog me-1"></i> Contributeur
            </nuxt-link>
          </li>
          <li v-if="isLoggedIn && userRole === 'admin'" class="nav-item">
            <nuxt-link class="nav-link" to="/admin">
              <i class="fas fa-cog me-1"></i> Admin
            </nuxt-link>
          </li>
          <!-- Lien de connexion visible uniquement si l'utilisateur n'est pas connecté -->
          <li v-if="!isLoggedIn" class="nav-item">
            <nuxt-link class="nav-link" to="/login">
              <i class="fas fa-sign-in-alt"></i> Connexion
            </nuxt-link>
          </li>

          <!-- Lien de déconnexion visible uniquement si l'utilisateur est connecté -->
          <li v-if="isLoggedIn" class="nav-item">
            <button @click="logout" class="btn btn-danger">
              <i class="fas fa-sign-out-alt"></i> Déconnexion
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router"; // Pour rediriger après déconnexion

const authStore = useAuthStore();
const isMenuOpen = ref(false);
const router = useRouter(); // Initialisation du router

// Définir les variables réactives pour l'état de connexion et le rôle
const isLoggedIn = computed(() => authStore.isLoggedIn);
const userRole = computed(() => authStore.userRole);

// Vérifier l'état d'authentification au montage
onMounted(() => {
  authStore.checkAuth();
});

// Fonction de déconnexion
const logout = () => {
  authStore.logout();

  // Rediriger vers la page d'accueil après déconnexion
  router.push("/");
};
</script>


<style scoped>
.navbar-toggler {
  border: none;
}

.navbar-toggler-icon {
  position: relative;
  width: 24px;
  height: 2px;
  background-color: #000;
  transition: background-color 0.3s ease;
}

.navbar-toggler-icon::before,
.navbar-toggler-icon::after {
  content: "";
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: #000;
  transition: transform 0.3s ease, top 0.3s ease, bottom 0.3s ease;
}

.navbar-toggler-icon::before {
  top: -6px;
}

.navbar-toggler-icon::after {
  top: 6px;
}

.navbar-toggler-icon.open {
  background-color: transparent;
}

.navbar-toggler-icon.open::before {
  transform: rotate(45deg);
  top: 0;
}

.navbar-toggler-icon.open::after {
  transform: rotate(-45deg);
  top: 0;
}

.collapse.navbar-collapse {
  transition: height 0.3s ease;
}

.show {
  display: block !important;
  height: auto !important;
}

.fa-sign-out-alt {
  color: #f8f9fa;
}
</style>
