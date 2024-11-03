<!-- pages/contact.vue -->
<template>
  <div class="container mt-5">
    <!-- Premier div avec texte et image -->

    <div
      class="col-12 d-flex flex-column align-items-center justify-content-center row"
    >
      <h3 class="text-primary">
        Des Solutions sur Mesure pour Votre Maison ou Votre Entreprise –
        Échangeons dès Maintenant !
      </h3>
      <p class="contact-text">
        Besoin d'un service de qualité pour votre maison ou votre entreprise ?
        Que vous cherchiez des solutions en plomberie, chauffage,
        photovoltaïque, ou climatisation, notre équipe est prête à répondre à
        vos besoins, tant pour des interventions à domicile que pour des projets
        en entreprise.
      </p>
      <p class="contact-paragraph">
        Chez Ambès Cyrille Plomberie, nous offrons une expertise complète pour
        des installations et des maintenances sur mesure. Que vous soyez un
        particulier cherchant à améliorer le confort de votre maison ou une
        entreprise nécessitant des solutions énergétiques efficaces et durables,
        nous avons les compétences et l'expérience pour vous aider.
        Contactez-nous via le formulaire ci-dessous, et nous nous ferons un
        plaisir de discuter de votre projet et de vous fournir des services
        adaptés à vos besoins spécifiques.
      </p>
      <img
        src="/images/life-flower.png"
        alt="Fleur de vie Kongo"
        class="img-fluid mt-3 my-image"
        style="width: 15%"
      />
    </div>

    <!-- Deuxième div avec le formulaire -->
    <div class="row mt-5">
      <div class="col-12 col-md-6 mx-auto">
        <h3 class="text-center text-primary mb-4">Formulaire de Contact</h3>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Nom:</label>
            <input
              type="text"
              v-model="form.name"
              id="name"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              v-model="form.email"
              id="email"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="message">Message:</label>
            <textarea
              v-model="form.message"
              id="message"
              class="form-control"
              rows="5"
              required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-block m-2">
            Envoyer
          </button>
        </form>
      </div>
    </div>
    <div class="container mt-5">
      <h1 class="text-center mb-4 text-primary">Avant/Après</h1>

      <!-- Card Bootstrap pour contenir les images avant/après -->
      <div class="card shadow p-4">
        <div class="card-body d-flex justify-content-center">
          <ImageBeforeAfter>
            <!-- Images pour le slot "before-image" -->
            <template #before-image="{ currentIndex }">
              <div class="img-container me-3">
                <!-- Ajout d'un espacement entre les images -->
                <img
                  v-if="currentIndex === 0"
                  class="img-fluid"
                  src="/images/bata.png"
                  alt="Avant 1"
                />
                <img
                  v-if="currentIndex === 1"
                  class="img-fluid"
                  src="/images/ota.png"
                  alt="Avant 2"
                />
                <img
                  v-if="currentIndex === 2"
                  class="img-fluid"
                  src="/images/sata.png"
                  alt="Avant 3"
                />
              </div>
            </template>

            <!-- Images pour le slot "after-image" -->
            <template #after-image="{ currentIndex }">
              <div class="img-container">
                <img
                  v-if="currentIndex === 0"
                  class="img-fluid"
                  src="/images/nata.png"
                  alt="Après 1"
                />
                <img
                  v-if="currentIndex === 1"
                  class="img-fluid"
                  src="/images/gata.png"
                  alt="Après 2"
                />
                <img
                  v-if="currentIndex === 2"
                  class="img-fluid"
                  src="/images/ita.png"
                  alt="Après 3"
                />
              </div>
            </template>
          </ImageBeforeAfter>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";

const form = ref({
  name: "",
  email: "",
  message: "",
});

const submitForm = async () => {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.value),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'envoi du message");
    }

    alert("Message envoyé avec succès");
  } catch (error) {
    console.error(error);
    alert("Il y a eu un problème lors de l'envoi du message.");
  }
};
// Importez la fonction nécessaire de Nuxt
import { useHead } from "#imports";

// Définissez vos balises SEO
useHead({
  title:
    "Contactez Cyrille Plomberie - Services de Plomberie et Chauffage à Votre Écoute",
  meta: [
    {
      name: "description",
      content:
        "Contactez Ambès Cyrille Plomberie pour des services sur mesure en plomberie, chauffage, climatisation, et installations photovoltaïques. Notre équipe est prête à répondre à tous vos besoins résidentiels et professionnels.",
    },
    // Open Graph meta tags
    {
      property: "og:title",
      content:
        "Contactez Cyrille Plomberie - Services de Plomberie et Chauffage à Votre Écoute",
    },
    {
      property: "og:description",
      content:
        "Contactez Ambès Cyrille Plomberie pour des services sur mesure en plomberie, chauffage, climatisation, et installations photovoltaïques. Notre équipe est prête à répondre à tous vos besoins résidentiels et professionnels.",
    },
    { property: "og:image", content: "~/assets/images/service-3.jpg" }, // Remplacez avec l'URL de votre image de partage
    { property: "og:url", content: "https://cyrille-plomberie/contact" }, // Remplacez avec l'URL de votre page
    { property: "og:type", content: "website" },
    // Twitter Card meta tags
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content:
        "Contactez Cyrille Plomberie - Services de Plomberie et Chauffage à Votre Écoute",
    },
    {
      name: "twitter:description",
      content:
        "Contactez Ambès Cyrille Plomberie pour des services sur mesure en plomberie, chauffage, climatisation, et installations photovoltaïques. Notre équipe est prête à répondre à tous vos besoins résidentiels et professionnels.",
    },
    { name: "twitter:image", content: "~/assets/images/service-3.jpg" }, // Remplacez avec l'URL de votre image de partage
    // Additional SEO meta tags
    {
      name: "keywords",
      content:
        "contact, plomberie, chauffage, climatisation, Cyrille Plomberie, services à domicile",
    },
    { name: "author", content: "Cyrille Plomberie" },
    { name: "robots", content: "index, follow" },
  ],
});
</script>
<style scoped>
.my-image {
  width: 50%;
}
</style>