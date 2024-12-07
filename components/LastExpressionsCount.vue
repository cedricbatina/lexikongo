<template>
  <p class="last-expressions-count">
    <strong>{{ totalExpressions }}</strong> nouvelles expressions, dont
    <strong>{{ data.wordCount }}</strong> mots et
    <strong>{{ data.verbCount }}</strong> verbes !
  </p>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const data = ref({
  wordCount: 0,
  verbCount: 0,
});

// Utilisation de `computed` pour calculer dynamiquement le total
const totalExpressions = computed(
  () => data.value.wordCount + data.value.verbCount
);

const fetchExpressionCounts = async () => {
  try {
    const response = await fetch("/api/last-expressions-count");
    if (response.ok) {
      const result = await response.json();
      data.value = result;
    } else {
      console.error("Erreur lors de la récupération des données.");
    }
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API :", error);
  }
};

onMounted(() => {
  fetchExpressionCounts();
});
</script>

<style scoped>
.last-expressions-count {
  font-size: 1.2rem;
  color: #333;
  text-align: center;
  margin: 20px 0;
  font-weight: 500;
}
.last-expressions-count strong {
  color: #007bff; /* Couleur accentuée */
}
</style>
