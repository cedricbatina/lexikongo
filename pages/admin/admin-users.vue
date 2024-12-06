<template>
  <div class="container mt-5">
    <div class="row justify-content-between">
      <!-- Liste des utilisateurs -->
      <div class="col-md-12">
        <div class="card shadow-sm">
          <div class="card-body">
            <h4 class="card-title mb-4">Gestion des Utilisateurs</h4>
            <UserList />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from "@vueuse/head";

// Définir les métadonnées de la page
useHead({
  title: "Gestion des utilisateurs - Admin",
  meta: [
    {
      name: "description",
      content: "Page de gestion des utilisateurs pour les administrateurs.",
    },
  ],
});
</script>

<style scoped>
/* Styles améliorés pour une présentation moderne */
.card {
  border-radius: 8px;
  transition: box-shadow 0.3s ease-in-out;
  border: none;
}

.card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #007bff;
}

.card-body {
  padding: 1.5rem;
}

.container {
  max-width: 1200px;
}
</style>
