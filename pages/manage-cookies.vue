<!-- pages/manage-cookies.vue -->

<template>
  <div class="container mt-5">
    <h1>Gestion des Cookies</h1>
    <p>
      Vous pouvez gérer vos préférences de cookies ici. Acceptez ou refusez
      l'utilisation des cookies de suivi.
    </p>
    <button @click="acceptCookies" class="btn btn-primary">
      Accepter tous les cookies
    </button>
    <button @click="rejectCookies" class="btn btn-secondary">
      Refuser les cookies
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const acceptCookies = () => {
  localStorage.setItem("cookies-accepted", "true");
  router.push("/"); // Redirige vers la page d'accueil ou une autre page
  window.location.reload();
};

const rejectCookies = () => {
  localStorage.setItem("cookies-accepted", "false");
  router.push("/"); // Redirige vers la page d'accueil ou une autre page
};
</script>

<style scoped>
.btn-primary,
.btn-secondary {
  margin-right: 0.5rem;
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
