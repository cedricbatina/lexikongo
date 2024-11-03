<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <!-- Colonne avec les détails stylisés -->
      <div class="col-lg-6 col-md-8 col-sm-12">
        <div class="card shadow-sm border-0">
          <div class="card-body p-4">
            <h2 class="card-title text-left mb-4 text-primary">
              <i class="fas fa-info-circle me-2"></i>
              {{ type === "word" ? "Détails du Mot" : "Détails du Verbe" }}
            </h2>
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex align-items-center">
                <i class="fas fa-font me-3"></i>
                Singulier :
                <span class="searchedExpression">{{ details.singular }}</span>
              </li>
              <li
                class="list-group-item d-flex align-items-center"
                v-if="details.plural"
              >
                <i class="fas fa-spell-check me-1"></i>
                Pluriel :
                <span class="searchedExpression">{{ details.plural }}</span>
              </li>
              <li class="list-group-item d-flex align-items-center">
                <i class="fas fa-volume-up me-3"></i>
                Phonétique :
                <span class="phonetic">{{ details.phonetic }}</span>
              </li>
              <li
                class="list-group-item d-flex align-items-center"
                v-if="details.root"
              >
                <i class="fas fa-tree me-3"></i>
                Dérivé de :
                <span class="fw-bold">{{ details.root }}</span>
              </li>
              <li
                class="list-group-item d-flex align-items-center"
                v-if="details.nominal_class"
              >
                <i class="fas fa-layer-group me-3"></i>
                Classe nominale :
                <span class="text-primary">{{ details.nominal_class }}</span>
              </li>
              <li class="list-group-item d-flex align-items-center">
                <i class="fas fa-language me-3"></i>
                Traduction FR :
                <span class="translation_fr fw-bold">{{
                  details.translation_fr
                }}</span>
              </li>
              <li class="list-group-item d-flex align-items-center">
                <i class="fas fa-language me-3"></i>
                Traduction EN :
                <span class="translation_en fw-bold">{{
                  details.translation_en
                }}</span>
              </li>
              <li
                class="list-group-item d-flex align-items-center"
                v-if="details.derived_word"
              >
                <i class="fas fa-arrow-right me-3 text-primary"></i>
                Mot dérivé : Oui
              </li>
              <li
                class="list-group-item d-flex align-items-center"
                v-if="details.derived_from_word"
              >
                <i class="fas fa-long-arrow-alt-right me-3 text-primary"></i>
                Dérivé du mot :
                {{ details.derived_from_word }}
              </li>
              <li
                class="list-group-item d-flex align-items-center"
                v-if="details.derived_from_verb"
              >
                <i class="fas fa-long-arrow-alt-right me-3"></i>
                Dérivé du verbe :
                {{ details.derived_from_verb }}
              </li>
              <li class="list-group-item d-flex align-items-center">
                <i class="fas fa-exchange-alt me-3"></i>
                Variabilité :
                {{ details.number_variability || "Inconnue" }}
              </li>

              <li class="list-group-item d-flex align-items-center">
                <i class="fas fa-user me-3"></i>
                Auteur : {{ details.author || "Inconnu" }}
              </li>
              <li class="list-group-item d-flex align-items-center">
                <i class="fas fa-calendar-alt me-3"></i>
                Date de création :
                <span class="text-sm">{{
                  formatDate(details.created_at)
                }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Boutons en bas de la carte -->
        <div class="d-flex justify-content-between mt-4">
          <nuxt-link to="/" class="btn btn-outline-secondary">
            <i class="fas fa-home me-2"></i> Retour à l'accueil
          </nuxt-link>
          <nuxt-link to="/words" class="btn btn-outline-primary">
            <i class="fas fa-book me-2"></i> Voir les Mots
          </nuxt-link>
          <nuxt-link to="/verbs" class="btn btn-outline-primary">
            <i class="fas fa-pencil-alt me-2"></i> Voir les Verbes
          </nuxt-link>
        </div>
      </div>
    </div>

    <!-- Boutons d'administration -->
    <div class="row mt-4">
      <div class="col-md-12 d-flex justify-content-center">
        <div class="btn-group" role="group">
          <nuxt-link to="/admin/admin-add-word">
            <button class="btn btn-primary btn-sm mx-2">
              <i class="fa-solid fa-plus me-1"></i> Ajouter un mot
            </button>
          </nuxt-link>
          <nuxt-link to="/admin/admin-add-verb">
            <button class="btn btn-primary btn-sm mx-2">
              <i class="fa-solid fa-plus me-1"></i> Ajouter un verbe
            </button>
          </nuxt-link>
          <nuxt-link to="/admin/admin-add-user">
            <button class="btn btn-primary btn-sm mx-2">
              <i class="fa-solid fa-user-plus me-1"></i> Ajouter un utilisateur
            </button>
          </nuxt-link>
          <nuxt-link to="/">
            <button class="btn btn-secondary btn-sm mx-2">
              <i class="fas fa-home me-2"></i> Retour à l'accueil
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useHead } from "@vueuse/head"; // Pour le SEO

const route = useRoute();
const details = ref({});
const type = ref(route.params.type);

// Fonction pour mettre à jour les métadonnées SEO après la récupération des détails
const updateSEO = () => {
  useHead({
    title: `${type.value === "word" ? "Détails du mot" : "Détails du verbe"} ${
      details.value.singular || ""
    } - Lexikongo`,
    meta: [
      {
        name: "description",
        content: `Découvrez les détails du ${
          type.value === "word" ? "mot" : "verbe"
        } ${details.value.singular || ""}.`,
      },
      {
        name: "og:title",
        content: `Détails du ${type.value === "word" ? "mot" : "verbe"} ${
          details.value.singular || ""
        } - Lexikongo`,
      },
    ],
  });
};

const fetchDetails = async () => {
  try {
    const response = await fetch(
      `/api/details/${route.params.type}/${route.params.slug}`
    );
    const result = await response.json();
    details.value = result;

    // Appeler la mise à jour du SEO après avoir récupéré les détails
    updateSEO();
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

// Surveille la récupération des détails et mets à jour le SEO lorsque le contenu est prêt
onMounted(fetchDetails);
</script>


<style scoped>
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

.btn-outline-primary,
.btn-outline-secondary {
  font-size: 16px;
  padding: 10px 20px;
}

.btn-outline-primary i,
.btn-outline-secondary i {
  margin-right: 5px;
}

.fas {
  color: #ff8a1d;
}

/* Responsive design */
@media (max-width: 768px) {
  .card-title {
    font-size: 1.5rem;
  }
  .list-group-item {
    font-size: 14px;
  }
  .btn-outline-primary,
  .btn-outline-secondary {
    font-size: 14px;
    padding: 8px 15px;
  }
}
</style>
