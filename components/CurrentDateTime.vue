<template>
  <div>
    <p>{{ currentDateTime }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const currentDateTime = ref("");

const updateDateTime = () => {
  const now = new Date();
  currentDateTime.value = now.toLocaleString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

onMounted(() => {
  // Met à jour la date et l'heure toutes les secondes
  updateDateTime();
  setInterval(updateDateTime, 1000);
});
</script>

<style scoped>
p {
  font-size: 0.9rem;
  color: #e1e1e1;
}
</style>
