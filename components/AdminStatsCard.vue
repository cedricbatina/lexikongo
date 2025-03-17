<template>
  <div class="col-md-4 mb-3">
    <div :class="`card text-white bg-${bgColor} mb-3 h-100`">
      <div class="card-header">{{ title }}</div>
      <div class="card-body d-flex flex-column justify-content-center">
        <h5 class="card-title">{{ value }}</h5>
        <p class="card-text">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  value: Number,
  description: String,
  bgColor: String, // Couleurs comme 'primary', 'success', 'info'
});
</script>

<style scoped>
/* Ajouter une transition pour les cartes */
.card {
  transition: transform 0.3s ease-in-out;
}

/* Effet d'hover pour la carte */
.card:hover {
  transform: translateY(-5px);
}

/* Ajustements pour petits écrans */
@media (max-width: 768px) {
  .card-title {
    font-size: 1.5rem; /* Adapter la taille du titre */
  }
  .card-text {
    font-size: 1rem; /* Ajuster le texte descriptif */
  }
}
</style>
