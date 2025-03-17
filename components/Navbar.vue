<template>
  <nav
    class="navbar"
    role="navigation"
    aria-label="Barre de navigation principale"
  >
    <div class="container">
      <!-- Logo aligné à gauche -->
      <div class="navbar-brand">
        <Logo />
      </div>

      <!-- Bouton hamburger pour mobile -->
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
        aria-label="Basculer la navigation"
        :aria-expanded="isMenuOpen"
        aria-controls="navbarNav"
      >
        <span class="navbar-toggler-icon" :class="{ open: isMenuOpen }"></span>
      </button>

      <!-- Menu principal aligné à droite -->
      <div
        id="navbarNav"
        class="navbar-menu"
        :class="{ 'is-active': isMenuOpen }"
      >
        <ul class="navbar-nav">
          <!-- Liens généraux (visibles pour tout le monde) -->
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/">
              <i class="fas fa-home me-1"></i> Accueil
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/words">
              <i class="fas fa-spell-check me-1"></i> Mots
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/verbs">
              <i class="fa-solid fa-arrow-down-a-z"></i> Verbes
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/expressions">
              <i class="fas fa-book"></i> Mots & Verbes
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/documentation/for-contributors">
              <i class="fas fa-hands-helping me-2"></i> Contribution
            </nuxt-link>
          </li>

          <!-- Liens conditionnels selon le rôle de l'utilisateur -->
          <template v-if="isLoggedIn">
            <li v-if="userRoles.includes('user')" class="nav-item">
              <nuxt-link class="nav-link" to="/user/profile">
                <i class="fas fa-user-check"></i> Tableau de Bord
              </nuxt-link>
            </li>
            <li v-if="userRoles.includes('contributor')" class="nav-item">
              <nuxt-link class="nav-link" to="/contributor">
                <i class="fas fa-tasks me-1"></i> Espace Contributeur
              </nuxt-link>
            </li>
            <li v-if="userRoles.includes('admin')" class="nav-item">
              <nuxt-link class="nav-link" to="/admin">
                <i class="fas fa-tools me-1"></i> Espace Admin
              </nuxt-link>
            </li>
          </template>

          <!-- Profil utilisateur -->
          <li v-if="isLoggedIn" class="nav-item">
            <nuxt-link
              class="nav-link"
              :to="`/user/profile/${username}`"
              title="Voir mon profil"
            >
              <i class="fas fa-user-circle"></i> {{ username }}
            </nuxt-link>
          </li>

          <!-- Connexion / Déconnexion -->
          <li v-if="!isLoggedIn" class="nav-item">
            <nuxt-link class="nav-link" to="/login">
              <i class="fas fa-sign-in-alt"></i> Connexion
            </nuxt-link>
          </li>
          <li v-else class="nav-item">
            <button @click="logout" class="btn btn-outline">
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
import { useRouter } from "vue-router";
import Logo from "@/components/Logo.vue"; // Assurez-vous que le composant Logo est correctement importé

const authStore = useAuthStore();
const isMenuOpen = ref(false);
const router = useRouter();

// État de connexion, rôles et nom d'utilisateur
const isLoggedIn = computed(() => authStore.isLoggedIn);
const userRoles = computed(() => authStore.userRoles || []);
const username = computed(() => authStore.user?.username || "Utilisateur");

// Vérification de l'authentification
onMounted(() => {
  authStore.checkAuth();
});

// Basculer le menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Déconnexion
const logout = async () => {
  await authStore.logout();
  router.push("/login");
};
</script>

<style scoped>
/* Définition des variables CSS */

/* Styles généraux */
.navbar {
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  padding: 0.5rem 1rem;
  position: relative;
  z-index: 10;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.navbar-brand {
  display: flex;
  align-items: center;
}

/* Navbar Toggler */
.navbar-toggler {
  border: none;
  background: none;
  cursor: pointer;
}

.navbar-toggler-icon {
  position: relative;
  width: 24px;
  height: 2px;
  background-color: var(--text-default);
  transition: background-color 0.3s ease;
}

.navbar-toggler-icon::before,
.navbar-toggler-icon::after {
  content: "";
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: var(--text-default);
  transition: transform 0.3s ease, top 0.3s ease;
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

/* Navbar Menu */
.navbar-menu {
  display: none;
}

.navbar-menu.is-active {
  display: block;
}

.navbar-nav {
  list-style: none;
  padding-left: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.nav-item {
  margin: 0.5rem 0;
}

.nav-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.nav-link:hover {
  color: var(--hover-primary);
}

/* Bouton Déconnexion */
.btn {
  font: inherit;
  cursor: pointer;
  border: none;
  padding: 0;
  background: none;
}

.btn-outline {
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  display: inline-flex;
  align-items: center;
}

.btn-outline:hover {
  background-color: var(--primary-color);
  color: #fff;
}

/* Icônes */
.nav-link i,
.btn-outline i {
  margin-right: 0.5rem;
}

/* Responsivité */
@media (min-width: 768px) {
  .navbar-menu {
    display: flex !important;
  }
  .navbar-nav {
    flex-direction: row;
  }
  .nav-item {
    margin: 0 0.5rem;
  }
  .navbar-toggler {
    display: none;
  }
}

/* Accessibilité : focus visible */
.nav-link:focus,
.btn-outline:focus {
  outline: 2px dashed var(--primary-color);
  outline-offset: 2px;
}
</style>
