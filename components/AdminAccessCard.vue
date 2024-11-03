<template>
  <div class="col-md-4 mb-3">
    <div class="card shadow-sm h-100 d-flex flex-column">
      <div class="card-body d-flex flex-column justify-content-center">
        <i :class="iconClass + ' fa-3x text-primary mb-3'"></i>
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">{{ description }}</p>
        <nuxt-link :to="link" class="btn btn-outline-primary mt-auto">
          {{ buttonText }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  iconClass: String,
  title: String,
  description: String,
  link: String,
  buttonText: String,
});
</script>

<style scoped>
/* Ajouter une transition pour les cartes et ajuster leur taille sur petits écrans */
.card {
  border: none;
  transition: transform 0.3s ease-in-out;
}

/* Effet d'hover pour la carte */
.card:hover {
  transform: translateY(-10px);
}

/* Ajustements pour petits écrans */
@media (max-width: 768px) {
  .fa-3x {
    font-size: 2.5rem; /* Réduire la taille des icônes sur les petits écrans */
  }
  .card-title {
    font-size: 1.25rem; /* Adapter la taille du titre */
  }
  .card-text {
    font-size: 1rem; /* Ajuster le texte descriptif */
  }
}
</style>
