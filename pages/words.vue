<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <!-- Liste des mots -->
      <div class="col-lg-10 col-md-12 col-sm-12 mb-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h1 class="card-title text-primary mb-4 text-center">
              <i class="fas fa-list"></i>
              <!-- Icône de liste -->
              Liste des Mots
            </h1>
            <WordList />
            <ContributorButtons />
            <AdminButtons />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from "@vueuse/head";

// SEO pour cette page
useHead({
  title: "Liste des Mots en Kikongo | Lexique Kikongo",
  meta: [
    {
      name: "description",
      content:
        "Explorez la liste des mots en Kikongo avec leurs traductions en français et en anglais.",
    },
    {
      property: "og:title",
      content: "Liste des Mots en Kikongo | Lexique Kikongo",
    },
    {
      property: "og:description",
      content:
        "Découvrez notre collection de mots en Kikongo avec des traductions précises et des informations phonétiques.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://lexikongo.com/words",
    },
    {
      property: "og:image",
      content: "https://lexikongo.com/images/words.png", // Ajouter une image de prévisualisation
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Liste des Mots en Kikongo | Lexique Kikongo",
    },
    {
      name: "twitter:description",
      content:
        "Découvrez les mots en Kikongo avec des traductions et des informations phonétiques.",
    },
    {
      name: "twitter:image",
      content: "https://lexikongo.com/images/words.png", // Image pour Twitter card
    },
  ],
});
</script>

<style scoped>
/* Styles améliorés pour une présentation plus professionnelle */
.card {
  border-radius: 8px;
  transition: box-shadow 0.3s ease-in-out;
  border: none;
}

.card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.75rem;
  color: #007bff; /* Couleur bleue primaire */
}

.card-body {
  padding: 2rem;
}

.container {
  max-width: 900px; /* Centrage et limitation de la largeur */
}

.btn-group .btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
}

.btn-danger {
  background-color: #dc3545;
  border: none;
  transition: background-color 0.3s ease;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-secondary {
  background-color: #6c757d;
  border: none;
  transition: background-color 0.3s ease;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.fas {
  color: #ffffff; /* Couleur blanche pour les icônes des boutons */
}

/* Styles responsifs pour une meilleure expérience sur mobile */
@media (max-width: 768px) {
  .card-title {
    font-size: 1.5rem;
  }

  .card-body {
    padding: 1.5rem;
  }

  .btn-group .btn {
    font-size: 0.875rem; /* Réduction de la taille des boutons sur petits écrans */
  }
}
</style>
