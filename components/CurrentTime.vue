<template>
  <div class="card shadow-sm text-center datetime-card mb-2">
    <div class="card-body">
      <p class="card-text date">{{ currentDate }}</p>
      <p class="card-text time text-primary">{{ currentTime }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Variables réactives pour la date et l'heure
const currentDate = ref("");
const currentTime = ref("");

// Fonction pour mettre à jour la date et l'heure
const updateDateTime = () => {
  const now = new Date();

  // Mettre à jour la date en français
  currentDate.value = now.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Mettre à jour l'heure en format 24h avec les secondes
  currentTime.value = now.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

onMounted(() => {
  // Mettre à jour la date et l'heure toutes les secondes
  updateDateTime();
  setInterval(updateDateTime, 1000);
});
</script>

<style scoped>
.datetime-card {
  max-width: 350px;
  margin: auto;
  margin-top: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
}

.date {
  font-size: 1rem;
  font-weight: 500;
  color: #495057;
}

.time {
  font-size: 1.2rem;
  font-weight: 700;
  color: #28a745;
}
</style>
