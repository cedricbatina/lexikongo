<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-6 col-md-8">
        <div class="card shadow-sm border-0">
          <div class="card-body p-4">
            <h2 class="card-title text-left mb-4 text-primary">
              <i class="fas fa-info-circle me-2"></i>

              {{ type === "word" ? "Détails du Mot" : "Détails du Verbe" }}
            </h2>

            <ul class="list-group list-group-flush">
              <!-- Affichage pour les mots -->
              <template v-if="type === 'word'">
                <li class="list-group-item d-flex align-items-center">
                  <i class="fas fa-font me-3"></i> Singulier :
                  {{ details.id }} -
                  <span class="searchedExpression">{{ details.singular }}</span>
                </li>

                <li
                  v-if="details.plural"
                  class="list-group-item d-flex align-items-center"
                >
                  <i class="fas fa-spell-check me-3"></i> Pluriel :
                  <span class="searchedExpression">{{ details.plural }}</span>
                </li>

                <li
                  v-if="details.root"
                  class="list-group-item d-flex align-items-center"
                >
                  <i class="fas fa-tree me-3"></i> Racine :
                  <span class="fw-bold">{{ details.root }}</span>
                </li>

                <li
                  v-if="details.derived_from_word"
                  class="list-group-item d-flex align-items-center"
                >
                  <i class="fas fa-arrow-right me-3 text-primary"></i> Dérivé du
                  mot :
                  <span class="fw-bold">{{ details.derived_from_word }}</span>
                </li>

                <li
                  v-if="details.derived_from_verb"
                  class="list-group-item d-flex align-items-center"
                >
                  <i class="fas fa-arrow-right me-3 text-primary"></i> Dérivé du
                  verbe :
                  <span class="fw-bold">{{ details.derived_from_verb }}</span>
                </li>

                <li class="list-group-item d-flex align-items-center">
                  <i class="fas fa-layer-group me-3"></i> Classe nominale :
                  <span class="text-primary">{{ details.nominal_class }}</span>
                </li>

                <li class="list-group-item d-flex align-items-center">
                  <i class="fas fa-exchange-alt me-3"></i> Variabilité :
                  {{ details.number_variability || "Inconnue" }}
                </li>
              </template>

              <!-- Affichage pour les verbes -->
              <template v-if="type === 'verb'">
                <li class="list-group-item d-flex align-items-center">
                  <i class="fas fa-font me-3"></i> Nom du Verbe :
                  <span class="searchedExpression">{{ details.name }}</span>
                </li>

                <li
                  v-if="details.root"
                  class="list-group-item d-flex align-items-center"
                >
                  <i class="fas fa-tree me-3"></i> Racine :
                  <span class="fw-bold">{{ details.root }}</span>
                </li>

                <li
                  v-if="details.suffix"
                  class="list-group-item d-flex align-items-center"
                >
                  <i class="fas fa-file-alt me-3"></i> Suffixe :
                  <span>{{ details.suffix }}</span>
                </li>

                <li
                  v-if="details.derived_verb"
                  class="list-group-item d-flex align-items-center"
                >
                  <i class="fas fa-arrow-right me-3 text-primary"></i> Verbe
                  dérivé : Oui
                </li>

                <li
                  v-if="details.derived_from"
                  class="list-group-item d-flex align-items-center"
                >
                  <i class="fas fa-arrow-right me-3 text-primary"></i> Dérivé du
                  verbe :
                  {{ details.derived_from }}
                </li>

                <li
                  v-if="details.derived_verb_type_id"
                  class="list-group-item d-flex align-items-center"
                >
                  <i class="fas fa-tags me-3"></i> Type de Verbe Dérivé :
                  {{ details.derived_verb_type_id }}
                </li>
              </template>

              <!-- Champs communs aux mots et aux verbes -->
              <li class="list-group-item d-flex align-items-center">
                <i class="fas fa-volume-up me-3"></i> Phonétique :
                <span class="phonetic">{{ details.phonetic }}</span>
              </li>

              <li class="list-group-item d-flex align-items-center">
                <i class="fas fa-language me-3"></i> Traduction FR :
                <span class="translation_fr fw-bold">{{
                  details.translation_fr
                }}</span>
              </li>

              <li class="list-group-item d-flex align-items-center">
                <i class="fas fa-language me-3"></i> Traduction EN :
                <span class="translation_en fw-bold">{{
                  details.translation_en
                }}</span>
              </li>

              <li class="list-group-item d-flex align-items-center">
                <i class="fas fa-user me-3"></i> Auteur :
                {{ details.author || "Inconnu" }}
              </li>

              <li class="list-group-item d-flex align-items-center">
                <i class="fas fa-calendar-alt me-3"></i> Date de création :
                <span class="text-sm">{{
                  formatDate(details.created_at)
                }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Boutons vers les pages de recherche -->
      <div v-if="authStore.userRole.includes('admin')" class="nav-item">
        <nuxt-link to="/edit/[type]/${id}" class="btn btn-outline-warning m-2">
          Modifier
        </nuxt-link>
      </div>
      <div class="text-center mb-5 mt-5">
        <nuxt-link to="/edit/[type]/${id}" class="btn btn-outline-warning m-2">
          Modifier
        </nuxt-link>
        <nuxt-link to="/search-words" class="btn btn-outline-primary m-2">
          Rechercher des mots
        </nuxt-link>
        <nuxt-link to="/search-verbs" class="btn btn-outline-success m-2">
          Rechercher des verbes
        </nuxt-link>
        <nuxt-link to="/verbs" class="btn btn-outline-secondary m-2">
          Liste des verbes
        </nuxt-link>
        <nuxt-link to="/expressions" class="btn btn-outline-secondary m-2">
          Liste de mots & verbes
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useHead } from "@vueuse/head"; // Pour gérer les balises meta dynamiquement
// Définir les variables réactives pour l'état de connexion, le rôle et le nom d'utilisateur

const route = useRoute();
const router = useRouter();
const details = ref({});
const type = ref(route.params.type);

// Fonction pour récupérer les détails avec le slug
const fetchDetails = async () => {
  try {
    const response = await fetch(
      `/api/details/${route.params.type}/${route.params.slug}`
    );
    const result = await response.json();
    details.value = result;

    // SEO et meta tags dynamiques
    useHead({
      title: `Détails de ${
        type.value === "word" ? details.value.singular : details.value.name
      } - Lexique Kikongo`,
      meta: [
        {
          name: "description",
          content:
            type.value === "word"
              ? `Découvrez les détails du mot ${details.value.singular} et ses traductions en Kikongo.`
              : `Découvrez les détails du verbe ${details.value.name} et ses traductions en Kikongo.`,
        },
        {
          property: "og:title",
          content: `Détails de ${
            type.value === "word" ? details.value.singular : details.value.name
          }`,
        },
        {
          property: "og:description",
          content:
            type.value === "word"
              ? `Détails du mot ${details.value.singular}, pluriel ${details.value.plural}, phonétique et traductions.`
              : `Détails du verbe ${details.value.name}, racine ${details.value.root}, phonétique et traductions.`,
        },
        {
          property: "og:type",
          content: "article",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
      ],
      script: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": type.value === "word" ? "DefinedTerm" : "Verb",
            name:
              type.value === "word"
                ? details.value.singular
                : details.value.name,
            description:
              type.value === "word"
                ? `Mot en Kikongo : ${details.value.singular}. Pluriel : ${details.value.plural}. Phonétique : ${details.value.phonetic}.`
                : `Verbe en Kikongo : ${details.value.name}. Racine : ${details.value.root}. Phonétique : ${details.value.phonetic}.`,
            inLanguage: "kg",
            author: {
              "@type": "Person",
              name: details.value.author || "Inconnu",
            },
            dateCreated: details.value.created_at,
          }),
        },
      ],
    });
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

<style scoped>
.fas {
  color: #007bff;
}
.card {
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 28px;
  color: #007bff;
}

.list-group-item {
  border: none;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.list-group-item i {
  margin-right: 10px;
  font-size: 20px;
}

.phonetic {
  color: #28a745;
  font-style: italic;
}

.translation_fr,
.translation_en {
  color: #6c757d;
}

@media (max-width: 576px) {
  .card-title {
    font-size: 18px;
  }

  .list-group-item {
    font-size: 12px;
  }
}
</style>
