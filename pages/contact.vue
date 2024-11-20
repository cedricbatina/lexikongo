<template>
  <div class="contact-page container mt-5">
    <!-- En-tête principale -->
    <header class="text-center mb-5">
      <h1 class="display-4 text-primary">
        <i class="fas fa-envelope me-2"></i> Contactez-nous
      </h1>
      <p class="lead text-default">
        Vous avez une question, une suggestion ou souhaitez en savoir plus sur
        Lexikongo ? Notre équipe est à votre écoute. Remplissez le formulaire
        ci-dessous et nous vous répondrons rapidement.
      </p>
    </header>

    <!-- Section Contact -->
    <section class="row justify-content-center">
      <div class="col-12 col-md-6">
        <h2 class="text-center text-secondary mb-4">
          <i class="fas fa-pencil-alt me-2"></i> Envoyez-nous un message
        </h2>
        <form @submit.prevent="submitForm">
          <div class="form-group mb-3">
            <label for="name" class="form-label">Nom :</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              class="form-control"
              placeholder="Entrez votre nom"
              required
            />
          </div>
          <div class="form-group mb-3">
            <label for="email" class="form-label">Email :</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="form-control"
              placeholder="Entrez votre adresse email"
              required
            />
          </div>
          <div class="form-group mb-4">
            <label for="message" class="form-label">Message :</label>
            <textarea
              id="message"
              v-model="form.message"
              class="form-control"
              rows="5"
              placeholder="Tapez votre message ici"
              required
            ></textarea>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary btn-lg">
              <i class="fas fa-paper-plane me-2"></i> Envoyer
            </button>
          </div>
        </form>
      </div>
    </section>

    <!-- Section Informations supplémentaires -->
    <section class="mt-5 text-center">
      <h2 class="text-secondary mb-3">
        <i class="fas fa-info-circle me-2"></i> Pourquoi nous contacter ?
      </h2>
      <p>
        Lexikongo est une plateforme collaborative dédiée à la préservation de
        la langue Kikongo. Que vous soyez un contributeur, un utilisateur ou
        simplement curieux, vos retours et suggestions sont précieux pour nous
        aider à améliorer notre mission.
      </p>
      <p>
        Vous pouvez également nous contacter pour toute demande de partenariat,
        collaboration ou assistance technique.
      </p>
      <img
        src="/images/life-flower.png"
        alt="Fleur de vie Kongo"
        class="img-fluid mt-3"
        style="width: 150px"
      />
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useHead } from "nuxt/app";

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

    alert("Votre message a été envoyé avec succès !");
  } catch (error) {
    console.error("Erreur :", error);
    alert("Une erreur est survenue. Veuillez réessayer plus tard.");
  }
};

useHead({
  title: "Contactez-nous - Lexikongo",
  meta: [
    {
      name: "description",
      content:
        "Contactez Lexikongo pour toute question, suggestion ou partenariat. Remplissez notre formulaire de contact et rejoignez-nous pour préserver la langue Kikongo.",
    },
    {
      name: "keywords",
      content:
        "contact, Lexikongo, Kikongo, préservation linguistique, questions, suggestions, partenariat",
    },
    {
      name: "author",
      content: "Lexikongo",
    },
    {
      property: "og:title",
      content: "Contactez-nous - Lexikongo",
    },
    {
      property: "og:description",
      content:
        "Vous avez des questions ou souhaitez contribuer à Lexikongo ? Contactez-nous via notre formulaire en ligne. Rejoignez notre mission pour préserver la langue Kikongo.",
    },
    {
      property: "og:image",
      content: "https://www.lexikongo.fr/images/logo.webp",
    },
    {
      property: "og:url",
      content: "https://www.lexikongo.fr/contact",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Contactez-nous - Lexikongo",
    },
    {
      name: "twitter:description",
      content:
        "Vous avez des questions ou souhaitez contribuer à Lexikongo ? Contactez-nous et participez à notre mission linguistique.",
    },
    {
      name: "twitter:image",
      content: "https://www.lexikongo.fr/images/lexikongo_logo@2x.png",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contactez-nous - Lexikongo",
        description:
          "Page de contact pour poser des questions, envoyer des suggestions ou établir des partenariats avec Lexikongo.",
        url: "https://www.lexikongo.fr/contact",
        mainEntity: {
          "@type": "Organization",
          name: "Lexikongo",
          logo: {
            "@type": "ImageObject",
            url: "https://www.lexikongo.fr/images/lexikongo_logo@2x.png",
            width: 200,
            height: 200,
          },
        },
        potentialAction: {
          "@type": "CommunicateAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://www.lexikongo.fr/contact",
            actionPlatform: [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform",
            ],
          },
        },
      }),
    },
  ],
});
</script>

<style scoped>
.contact-page {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  font-family: "Arial", sans-serif;
}

.form-group {
  margin-bottom: 1.5rem;
}

.btn {
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
}
</style>
