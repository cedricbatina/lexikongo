<!-- Exemple d'ajout dans CookieConsent.vue -->

<template>
  <div v-if="showBanner" class="cookie-consent-banner">
    <p>
      Nous utilisons des cookies pour améliorer votre expérience sur notre site.
      En poursuivant votre navigation, vous acceptez notre utilisation des
      cookies.
      <a href="/privacy-policy" target="_blank" class="text-white"
        >En savoir plus</a
      >
    </p>
    <button @click="acceptCookies" class="btn btn-primary">Accepter</button>
    <button @click="manageCookies" class="btn btn-secondary">Gérer</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const showBanner = ref(false);

const acceptCookies = () => {
  localStorage.setItem("cookies-accepted", "true");
  showBanner.value = false;
  // Recharger la page pour charger les scripts après acceptation
  window.location.reload();
};

const manageCookies = () => {
  // Rediriger vers une page de gestion des cookies ou ouvrir un modal
  useRouter().push("/manage-cookies"); // Assurez-vous d'avoir cette page
};

onMounted(() => {
  const consent = localStorage.getItem("cookies-accepted");
  if (!consent) {
    showBanner.value = true;
  }
});
</script>

<style scoped>
.cookie-consent-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
}

.btn-primary,
.btn-secondary {
  margin-left: 0.5rem;
}

.btn-primary {
  background-color: #007bff;
  border: none;
  padding: 0.5rem 1rem;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  border: none;
  padding: 0.5rem 1rem;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>
