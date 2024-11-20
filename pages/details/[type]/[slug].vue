<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10">
        <div class="card shadow-sm border-0">
          <div class="card-body p-4">
            <h2 class="card-title text-primary mb-4">
              <i class="fas fa-info-circle me-2"></i>
              {{ type === "word" ? "Détails du Mot" : "Détails du Verbe" }}
            </h2>

            <ul class="list-group list-group-flush">
              <!-- Affichage des détails spécifiques pour les mots -->
              <template v-if="type === 'word'">
                <li class="list-group-item">
                  <i class="fas fa-font me-3"></i>
                  <strong>Singulier :</strong>
                  <span class="searchedExpression">{{ details.singular }}</span>
                </li>
                <li v-if="details.plural" class="list-group-item">
                  <i class="fas fa-spell-check me-3"></i>
                  <strong>Pluriel :</strong>
                  <span class="searchedExpression">{{ details.plural }}</span>
                </li>
                <li v-if="details.nominal_class" class="list-group-item">
                  <i class="fas fa-layer-group me-3"></i>
                  <strong>Classe nominale :</strong>
                  <span class="text-primary">{{ details.nominal_class }}</span>
                </li>
              </template>

              <!-- Affichage des détails spécifiques pour les verbes -->
              <template v-if="type === 'verb'">
                <li class="list-group-item">
                  <i class="fas fa-font me-3"></i>
                  <strong>Nom :</strong>
                  <span class="searchedExpression">{{ details.name }}</span>
                </li>
                <li v-if="details.root" class="list-group-item">
                  <i class="fas fa-tree me-3"></i>
                  <strong>Racine :</strong>
                  <span>{{ details.root }}</span>
                </li>
                <li v-if="details.suffix" class="list-group-item">
                  <i class="fas fa-file-alt me-3"></i>
                  <strong>Suffixe :</strong>
                  <span>{{ details.suffix }}</span>
                </li>
              </template>

              <!-- Champs communs -->
              <li class="list-group-item">
                <i class="fas fa-volume-up me-3"></i>
                <strong>Phonétique :</strong>
                <span class="phonetic">{{ details.phonetic || "N/A" }}</span>
              </li>
              <li class="list-group-item">
                <i class="fas fa-language me-3"></i>
                <strong>Traduction FR :</strong>
                <span class="translation_fr">{{
                  details.translation_fr || "N/A"
                }}</span>
              </li>
              <li class="list-group-item">
                <i class="fas fa-language me-3"></i>
                <strong>Traduction EN :</strong>
                <span class="translation_en">{{
                  details.translation_en || "N/A"
                }}</span>
              </li>
              <li class="list-group-item">
                <i class="fas fa-user me-3"></i>
                <strong>Auteur :</strong>
                {{ details.author || "Inconnu" }}
              </li>
              <li class="list-group-item">
                <i class="fas fa-calendar-alt me-3"></i>
                <strong>Date de création :</strong>
                <span>{{ formatDate(details.created_at) }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Boutons vers les pages de recherche -->
    <div class="text-center mt-4">
      <nuxt-link to="/search-words" class="btn btn-outline-primary m-2">
        Rechercher des mots
      </nuxt-link>
      <nuxt-link to="/search-verbs" class="btn btn-outline-success m-2">
        Rechercher des verbes
      </nuxt-link>
      <nuxt-link to="/expressions" class="btn btn-outline-secondary m-2">
        Liste de mots & verbes
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useHead } from "@vueuse/head";

const route = useRoute();
const type = route.params.type;
const details = ref({});

// Fonction pour récupérer les détails
const fetchDetails = async () => {
  try {
    const response = await fetch(`/api/details/${type}/${route.params.slug}`);
    const result = await response.json();
    details.value = result;

    // Mise à jour du SEO dynamique
    useHead({
      title: `Détails de ${
        type === "word" ? result.singular : result.name
      } - Lexikongo`,
      meta: [
        {
          name: "description",
          content:
            type === "word"
              ? `Découvrez les détails du mot ${result.singular} avec ses traductions.`
              : `Découvrez les détails du verbe ${result.name} avec ses traductions.`,
        },
        {
          property: "og:title",
          content: `Détails de ${
            type === "word" ? result.singular : result.name
          }`,
        },
        {
          property: "og:description",
          content:
            type === "word"
              ? `Mot : ${result.singular}. Pluriel : ${result.plural || "N/A"}.`
              : `Verbe : ${result.name}. Racine : ${result.root || "N/A"}.`,
        },
        {
          property: "og:image",
          content: "https://www.lexikongo.fr/images/lexikongo_logo@2x.png",
        },
      ],
      script: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": type === "word" ? "DefinedTerm" : "Verb",
            name: type === "word" ? result.singular : result.name,
            description:
              type === "word"
                ? `Mot en Kikongo : ${result.singular}.`
                : `Verbe en Kikongo : ${result.name}.`,
            inLanguage: "kg",
            author: {
              "@type": "Person",
              name: result.author || "Inconnu",
            },
            dateCreated: result.created_at,
          }),
        },
      ],
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des détails :", error);
  }
};

// Fonction pour formater les dates
const formatDate = (dateString) => {
  if (!dateString) return "Inconnue";
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

onMounted(fetchDetails);
</script>

<style scoped>
.card {
  border-radius: 10px;
  box-shadow: var(--box-shadow-default);
}

.card-title {
  font-size: var(--font-lg);
}

.list-group-item {
  border: none;
  font-size: var(--font-md);
}

@media (max-width: 576px) {
  .card-title {
    font-size: var(--font-md);
  }

  .list-group-item {
    font-size: var(--font-sm);
  }
}
</style>
