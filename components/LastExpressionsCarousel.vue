<template>
  <div class="expression-carousel">
    <p class="carousel-text">
      <span v-if="currentExpression">
        <strong>{{
          currentExpression.type === "word" ? "Mot" : "Verbe"
        }}</strong>
        : {{ currentExpression.singular || currentExpression.name }} -
        {{ currentExpression.translation_fr || "Non traduit" }}
        <span v-if="currentExpression.translation_en">
          ({{ currentExpression.translation_en }})
        </span>
      </span>
      <span v-else>Chargement des nouvelles expressions...</span>
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const expressions = ref([]); // Liste des expressions
const currentIndex = ref(0); // Index de l'expression actuelle
const currentExpression = ref(null); // Expression actuellement affichée

// Fonction pour récupérer les données depuis l'API
const fetchExpressions = async () => {
  try {
    const response = await fetch("/api/last-expressions");
    if (response.ok) {
      const result = await response.json();
      expressions.value = result;
      if (expressions.value.length > 0) {
        currentExpression.value = expressions.value[currentIndex.value];
      }
    } else {
      console.error("Erreur lors de la récupération des données.");
    }
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API :", error);
  }
};

// Fonction pour changer d'expression toutes les 10 secondes
const startCarousel = () => {
  setInterval(() => {
    if (expressions.value.length > 0) {
      currentIndex.value = (currentIndex.value + 1) % expressions.value.length;
      currentExpression.value = expressions.value[currentIndex.value];
    }
  }, 10000); // 10 secondes
};

// Charger les données et démarrer le carousel
onMounted(async () => {
  await fetchExpressions();
  startCarousel();
});
</script>

<style scoped>
.expression-carousel {
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
  text-align: center;
  margin: 20px 0;
}

.carousel-text {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  color: var(--primary-color);
}
</style>
