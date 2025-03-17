<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid d-flex justify-content-between">
      <!-- Menu secondaire en accordéon -->
      <div class="accordion" id="menuSecondaireAccordion">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              @click="isMenuOpen = !isMenuOpen"
              :class="{ collapsed: !isMenuOpen }"
            >
              <span class="text-center text-primary">Liens</span>
            </button>
          </h2>
          <div
            class="accordion-collapse collapse"
            :class="{ show: isMenuOpen }"
          >
            <div class="accordion-body">
              <ul class="list-group">
                <li class="list-group-item">
                  <nuxt-link class="nav-link" to="/">
                    <i class="fas fa-home"></i> Accueil
                  </nuxt-link>
                </li>
                <li class="list-group-item">
                  <nuxt-link class="nav-link" to="/words">
                    <i class="fas fa-book"></i> Mots
                  </nuxt-link>
                </li>
                <li class="list-group-item">
                  <nuxt-link class="nav-link" to="/verbs">
                    <i class="fas fa-pencil-alt"></i> Verbes
                  </nuxt-link>
                </li>

                <li class="list-group-item">
                  <nuxt-link class="nav-link" to="/contact">
                    <i class="fas fa-envelope"></i> Contact
                  </nuxt-link>
                </li>

                <li class="list-group-item">
                  <nuxt-link class="nav-link" to="/contribution">
                    <i class="fas fa-file-signature"></i> Contribution
                  </nuxt-link>
                </li>
                <li class="list-group-item">
                  <nuxt-link class="nav-link" to="/donations">
                    <i class="fa-solid fa-hand-holding-dollar"></i> Faire un don
                  </nuxt-link>
                </li>
                <li class="list-group-item">
                  <nuxt-link class="nav-link" to="/privacy"
                    ><i class="fas fa-gavel"></i> Mentions</nuxt-link
                  >
                </li>
                <li class="list-group-item">
                  <nuxt-link class="nav-link" to="/terms"
                    ><i class="fas fa-file-contract"></i> Conditions
                    d'utilisation</nuxt-link
                  >
                </li>
                <!-- Connexion ou Déconnexion en fonction de l'état de l'utilisateur -->
                <li v-if="!isLoggedIn" class="list-group-item">
                  <nuxt-link class="nav-link" to="/login">
                    <i class="fas fa-sign-in-alt"></i> Connexion
                  </nuxt-link>
                </li>
                <li v-if="isLoggedIn" class="list-group-item">
                  <button @click="logout" class="btn btn-danger">
                    <i class="fas fa-sign-out-alt"></i> Déconnexion
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const isMenuOpen = ref(true);

// Définir les variables réactives pour l'état de connexion et le rôle
const isLoggedIn = computed(() => authStore.isLoggedIn);

// Vérifier l'état d'authentification au montage
onMounted(() => {
  authStore.checkAuth();
});

// Fonction de déconnexion
const logout = () => {
  authStore.logout();
  window.location.reload(); // Recharger la page après déconnexion
};
</script>

<style scoped>
.accordion-button {
  background-color: #f8f9fa;
  font-weight: bold;
  font-size: 1.2rem;
}

.list-group-item {
  background-color: #f8f9fa;
  margin: 0.1rem;
}

.accordion-body .nav-link {
  display: flex;
  align-items: center;
}

.accordion-body .nav-link i {
  margin-right: 8px;
}
.fas {
  color: #ff8a1d;
}
.fa-hand-holding-dollar {
  color: #ff8a1d;
}
.fa-sign-out-alt {
  color: #f8f9fa;
}
</style>
