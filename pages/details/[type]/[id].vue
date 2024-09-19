<template>
  <div class="container">
    <h2>Détails {{ type === "word" ? "du mot" : "du verbe" }}</h2>
    <ul class="list-group">
      <li class="list-group-item">
        <strong>Singulier:</strong> {{ details.singular }}
      </li>
      <li class="list-group-item" v-if="details.plural">
        <strong>Pluriel:</strong> {{ details.plural }}
      </li>
      <li class="list-group-item">
        <strong>Phonétique:</strong> {{ details.phonetic }}
      </li>
      <li class="list-group-item" v-if="details.root">
        <strong>Racine:</strong> {{ details.root }}
      </li>
      <li class="list-group-item" v-if="details.nominal_class">
        <strong>Classe nominale:</strong> {{ details.nominal_class }}
      </li>
      <li class="list-group-item" v-if="details.derived_word">
        <strong>Mot dérivé:</strong> Oui
      </li>
      <li class="list-group-item" v-if="details.derived_from_word">
        <strong>Dérivé du mot ID:</strong> {{ details.derived_from_word }}
      </li>
      <li class="list-group-item" v-if="details.derived_from_verb">
        <strong>Dérivé du verbe ID:</strong> {{ details.derived_from_verb }}
      </li>
      <li class="list-group-item">
        <strong>Variabilité:</strong> {{ details.number_variability }}
      </li>
      <li class="list-group-item">
        <strong>Traduction FR:</strong> {{ details.translation_fr || "Aucune" }}
      </li>
      <li class="list-group-item">
        <strong>Traduction EN:</strong> {{ details.translation_en || "Aucune" }}
      </li>
      <li class="list-group-item">
        <strong>Auteur:</strong> {{ details.author || "Inconnu" }}
      </li>
      <li class="list-group-item">
        <strong>Date de création:</strong> {{ formatDate(details.created_at) }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const details = ref({});
const type = ref(route.params.type);

const fetchDetails = async () => {
  try {
    const response = await fetch(
      `/api/details/${route.params.type}/${route.params.id}`
    );
    const result = await response.json();
    details.value = result;
  } catch (error) {
    console.error("Erreur lors de la récupération des détails :", error);
  }
};

// Fonction pour formater la date en français
const formatDate = (dateString) => {
  if (!dateString) return "Inconnue";
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

onMounted(async () => {
  await fetchDetails();
});
</script>
