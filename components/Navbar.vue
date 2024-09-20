<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light row">
    <div class="container-fluid">
      <div class="col-1"></div>
      <div class="col-5">
        <Logo />
      </div>
      <div class="col-1"></div>
      <!-- Le bouton hamburger visible seulement sur les petits écrans -->
      <button
        class="navbar-toggler d-lg-none"
        type="button"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span :class="{ 'navbar-toggler-icon': true, open: isMenuOpen }"></span>
      </button>
      <div class="collapse navbar-collapse" :class="{ show: isMenuOpen }">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 col-5">
          <!-- Afficher Déconnexion si l'utilisateur est connecté -->
          <li v-if="authStore.isLoggedIn" class="nav-item">
            <button class="btn btn-danger" @click="logout">Déconnexion</button>
          </li>
          <!-- Afficher le lien Profil seulement si l'utilisateur est connecté -->
          <li v-if="authStore.isLoggedIn" class="nav-item">
            <nuxt-link class="nav-link" to="/user/profil">Profil</nuxt-link>
          </li>

          <!-- Afficher Connexion si l'utilisateur n'est pas connecté -->
          <li v-else class="nav-item">
            <nuxt-link class="nav-link" to="/login"
              ><button class="btn btn-primary">Connexion</button></nuxt-link
            >
          </li>

          <li class="nav-item">
            <nuxt-link class="nav-link" to="/">Accueil</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/posts">Réalisations</nuxt-link>
          </li>

          <li class="nav-item">
            <nuxt-link class="nav-link" to="/contact">Contact</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/privacy">Mentions</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const isMenuOpen = ref(false);
const router = useRouter();

// Vérifier l'état de connexion lors du montage du composant
onMounted(() => {
  authStore.checkAuth(); // Vérifier l'état de connexion dans le store
});

// Fonction de déconnexion
const logout = () => {
  authStore.logout();
  router.push("/login");
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
</style>
