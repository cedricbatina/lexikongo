<template>
  <footer class="footer bg-light text-dark pt-5 mt-5">
    <div class="d-flex justify-content-center mb-4 logo-small">
      <LogoFooter />
    </div>
    <div class="container py-5">
      <div class="row g-5">
        <!-- Nos Services -->
        <div class="col-lg-3 col-md-6">
          <h4 class="mb-4">Nos Services</h4>
          <ul class="list-unstyled">
            <li>
              <nuxt-link class="footer-link" to="/formations"
                >Formations</nuxt-link
              >
            </li>
            <li>
              <nuxt-link class="footer-link" to="/conception"
                >Conception</nuxt-link
              >
            </li>
            <li>
              <nuxt-link class="footer-link" to="/support">Support</nuxt-link>
            </li>
            <li>
              <nuxt-link class="footer-link" to="/advertising"
                >Publicité</nuxt-link
              >
            </li>
          </ul>
        </div>

        <!-- Liens utiles -->
        <div class="col-lg-3 col-md-6">
          <h4 class="mb-4">Liens utiles</h4>
          <ul class="list-unstyled">
            <li>
              <nuxt-link class="footer-link" to="/documentation"
                >Documentation</nuxt-link
              >
            </li>
            <li>
              <nuxt-link class="footer-link" to="/faqs">FAQs</nuxt-link>
            </li>
            <li>
              <nuxt-link class="footer-link" to="/privacy"
                >Mentions Légales</nuxt-link
              >
            </li>
            <li>
              <nuxt-link class="footer-link" to="/admin">Admin</nuxt-link>
            </li>
          </ul>
        </div>

        <!-- Nos Partenaires -->
        <div class="col-lg-3 col-md-6">
          <h4 class="mb-4">Nos Partenaires</h4>
          <ul class="list-unstyled">
            <li>
              <a class="footer-link" href="#" target="_blank">Partner 1</a>
            </li>
            <li>
              <a class="footer-link" href="#" target="_blank">Partner 2</a>
            </li>
            <li>
              <a class="footer-link" href="#" target="_blank">Partner 3</a>
            </li>
          </ul>
        </div>

        <!-- Réseaux sociaux -->
        <div class="col-lg-3 col-md-6">
          <h4 class="mb-4">Réseaux sociaux</h4>
          <p>Suivez-nous sur les réseaux sociaux</p>
          <div class="d-flex pt-2">
            <a
              class="btn btn-outline-primary btn-social m-2"
              href="https://www.facebook.com/100063622961242/"
              target="_blank"
              aria-label="Facebook"
            >
              <i class="fab fa-facebook-f"></i>
            </a>
            <a
              class="btn btn-outline-primary btn-social m-2"
              href="#"
              target="_blank"
              aria-label="Twitter"
            >
              <i class="fab fa-twitter"></i>
            </a>
            <a
              class="btn btn-outline-primary btn-social m-2"
              href="#"
              target="_blank"
              aria-label="YouTube"
            >
              <i class="fab fa-youtube"></i>
            </a>
            <a
              class="btn btn-outline-primary btn-social m-2"
              href="#"
              target="_blank"
              aria-label="LinkedIn"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Bas de page -->
    <div class="container">
      <div
        class="footer-bottom py-3 d-flex flex-column flex-md-row justify-content-between align-items-center"
      >
        <div class="text-center text-md-start mb-3 mb-md-0">
          &copy; {{ currentYear }}
          <a class="footer-brand" href="https://www.lexikongo.fr">Lexikongo</a>
          - Contenus protégés
        </div>
        <div class="text-center text-md-end">
          Site conçu et maintenu par :
          <a
            class="footer-brand"
            href="https://www.artfulbatina.com"
            target="_blank"
            >Artful Batina Creative Studios</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";

const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
/* Variables CSS */
:root {
  --primary-color: #007bff;
  --hover-primary: #0056b3;
  --secondary-color: #a52a2a;
  --dark-color: #2a0600;
  --highlight-color: #28a745;
  --text-default: #03080d;
  --third-color: #ff4500;
}

/* Styles du footer */
.footer {
  background-color: #f8f9fa; /* Couleur de fond claire */
  color: var(--text-default);
  border-top: 1px solid #eaeaea;
}

.footer h4 {
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
}

.footer-link {
  color: var(--text-default);
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  transition: color 0.3s;
}

.footer-link:hover {
  color: var(--primary-color);
}

.btn-social {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
}

.btn-social:hover {
  background-color: var(--primary-color);
  color: #fff;
}

.btn-social i {
  font-size: 1.2rem;
}

.footer-brand {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
}

.footer-brand:hover {
  text-decoration: underline;
}

.footer-bottom {
  border-top: 1px solid #eaeaea;
  margin-top: 2rem;
}
.logo-small {
  width: 35%;
  height: auto;
  margin: auto;
}
@media (max-width: 767.98px) {
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>
