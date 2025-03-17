<template>
  <div class="chart-container">
    <canvas id="chartStats"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

// Variables pour stocker les données dynamiques
const totalUsers = ref(0);
const totalWords = ref(0);
const totalVerbs = ref(0);

// Fonction pour récupérer les statistiques depuis l'API
const fetchStatistics = async () => {
  try {
    const response = await fetch("/api/total-statistics");
    const result = await response.json();

    totalUsers.value = result.totalUsers;
    totalWords.value = result.totalWords;
    totalVerbs.value = result.totalVerbs;
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques :", error);
  }
};

// Fonction pour initialiser le graphique
const initializeChart = () => {
  const ctx = document.getElementById("chartStats").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Utilisateurs", "Mots", "Verbes"],
      datasets: [
        {
          label: "Statistiques",
          data: [totalUsers.value, totalWords.value, totalVerbs.value],
          backgroundColor: ["#007bff", "#28a745", "#17a2b8"],
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      responsive: true,
      maintainAspectRatio: false, // Pour gérer la taille du graphique
    },
  });
};

// Récupérer les statistiques et initialiser le graphique lors du montage du composant
onMounted(async () => {
  await fetchStatistics();
  initializeChart();
});
</script>

<style scoped>
/* Container du graphique avec dimensions flexibles */
.chart-container {
  position: relative;
  width: 100%;
  height: 400px;
}

/* Ajustement pour les petits écrans */
@media (max-width: 768px) {
  .chart-container {
    height: 300px; /* Réduire la hauteur sur les petits écrans */
  }
}

@media (max-width: 576px) {
  .chart-container {
    height: 250px; /* Réduire encore plus pour les très petits écrans */
  }
}
</style>
