<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <!-- Liste des verbes -->
      <div class="col-lg-10 col-md-12 col-sm-12 mb-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h1 class="card-title text-primary mb-4 text-left">
              <i class="fas fa-list"></i>
              <!-- Icône de liste -->
              Liste des Verbes
            </h1>
            <VerbList />
            <NavButtons />
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
  title: "Liste des Verbes en Kikongo | Lexique Kikongo",
  meta: [
    {
      name: "description",
      content:
        "Découvrez la liste des verbes en Kikongo avec leurs traductions en français et en anglais.",
    },
    {
      property: "og:title",
      content: "Liste des Verbes en Kikongo | Lexique Kikongo",
    },
    {
      property: "og:description",
      content:
        "Explorez notre collection de verbes en Kikongo avec des traductions précises et des informations phonétiques.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://lexikongo.com/verbs",
    },
    {
      property: "og:image",
      content: "https://lexikongo.com/images/verbs.png", // Ajouter une image de prévisualisation
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Liste des Verbes en Kikongo | Lexique Kikongo",
    },
    {
      name: "twitter:description",
      content:
        "Découvrez les verbes en Kikongo avec des traductions et des informations phonétiques.",
    },
    {
      name: "twitter:image",
      content: "https://lexikongo.com/images/verbs.png", // Image pour Twitter card
    },
  ],
});
</script>

<style scoped>
/* Amélioration du design pour la page des verbes */
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
  color: #007bff;
}

.card-body {
  padding: 2rem;
}

.container {
  max-width: 900px;
}

.fas {
  color: #ffffff; /* Couleur blanche pour les icônes des boutons */
}

/* Responsivité pour une meilleure expérience utilisateur sur mobile */
@media (max-width: 768px) {
  .card-title {
    font-size: 1.5rem;
  }

  .card-body {
    padding: 1.5rem;
  }

  .btn-group .btn {
    font-size: 0.875rem;
  }
}
</style>
