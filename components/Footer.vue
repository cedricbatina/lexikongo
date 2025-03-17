<template>
  <footer class="footer bg-light text-dark pt-5 mt-5">
    <!-- Logo -->
    <div class="d-flex justify-content-center mb-4">
      <LogoFooter class="logo-footer" />
    </div>

    <div class="container py-5">
      <div class="row g-4">
        <!-- Nos Services -->
        <div class="col-lg-3 col-md-6">
          <h4 class="footer-title">Nos Services</h4>
          <ul class="list-unstyled">
            <li><nuxt-link class="footer-link" to="/formations">Formations</nuxt-link></li>
            <li><nuxt-link class="footer-link" to="/conception">Conception</nuxt-link></li>
            <li><nuxt-link class="footer-link" to="/support">Support</nuxt-link></li>
            <li><nuxt-link class="footer-link" to="/advertising">Publicité</nuxt-link></li>
          </ul>
        </div>

        <!-- Liens utiles -->
        <div class="col-lg-3 col-md-6">
          <h4 class="footer-title">Liens utiles</h4>
          <ul class="list-unstyled">
            <li><nuxt-link class="footer-link" to="/documentation">Documentation</nuxt-link></li>
            <li><nuxt-link class="footer-link" to="#">FAQs</nuxt-link></li>
            <li><nuxt-link class="footer-link" to="/privacy">Mentions Légales</nuxt-link></li>
            <li><nuxt-link class="footer-link" to="/">Admin</nuxt-link></li>
          </ul>
        </div>

        <!-- Nos Partenaires -->
        <div class="col-lg-3 col-md-6">
          <h4 class="footer-title">Nos Partenaires</h4>
          <div class="footer-partners">
            <p><a href="https://longoka.fr" class="footer-link" target="_blank"><span class="fw-bold">Longoka</span> <br /><small>Partage de compétences</small></a></p>
            <p><a href="https://fr.wikikongo.net/index.php/Accueil" class="footer-link" target="_blank"><span class="fw-bold">Wikikongo</span> <br /><small>Encyclopédie libre</small></a></p>
            <p><a href="https://goseneye.com" class="footer-link" target="_blank"><span class="fw-bold">Gosen'Eye</span> <br /><small>Vidéaste, Réalisateur</small></a></p>
            <p><a href="https://cyrille-plomberie.fr" class="footer-link" target="_blank"><span class="fw-bold">Ambès Cyrille Plomberie</span> <br /><small>Installation, Maintenance, Réparation</small></a></p>
            <p><a href="https://www.keratotherapeute-bordeaux.com" class="footer-link" target="_blank"><span class="fw-bold">Mélanie Decarsin</span> <br /><small>Kératothérapeute et Facialiste</small></a></p>
          </div>
        </div>

        <!-- Réseaux sociaux -->
        <div class="col-lg-3 col-md-6  ">
          <h4 class="footer-title">Réseaux sociaux</h4>
          <p>Suivez-nous sur :</p>
          <div class="d-flex justify-content-start gap-2 socials">
            <a class="btn btn-outline-primary btn-social" href="#" target="_blank" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a class="btn btn-outline-primary btn-social" href="#" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
            <a class="btn btn-outline-primary btn-social" href="#" target="_blank" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
            <a class="btn btn-outline-primary btn-social" href="#" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
    </div>

    <!-- Bas de page -->
    <div class="container">
      <div class="footer-bottom">
        <div class="text-center text-md-start">
          &copy; {{ currentYear }} <a class="footer-brand" href="https://lexikongo.fr">Lexikongo</a> - Contenus protégés
        </div>
        <div class="text-center text-md-end">
          Site conçu et maintenu par : <a class="footer-brand" href="https://artfulbatinacreativestudios.fr" target="_blank">Artful Batina Creative Studios</a>
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

/* Footer styling */
.footer {
  background-color: #f8f9fa;
  color: var(--text-default);
  border-top: 1px solid #eaeaea;
  padding-top: 20px;
}

.footer-title {
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

/* Liens du footer */
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

/* Icônes réseaux sociaux */
.btn-social {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  font-size: 1.2rem;
  transition: all 0.3s ease-in-out;
}

.btn-social:hover {
  background-color: var(--primary-color);
  color: white;
}

/* Footer Partners */
.footer-partners p {
  margin-bottom: 0.8rem;
}

/* Footer Bottom */
.footer-bottom {
  border-top: 1px solid #eaeaea;
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

@media (min-width: 768px) {
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
  }
}

/* Logo Footer */
.logo-footer {
  width: 150px;
  height: auto;
}

@media (max-width: 768px) {
  .footer {
    text-align: center;
  }
  .footer-partners p {
    font-size: 0.9rem;
  }
  .socials {
    text-align: center;
    margin: auto;
  }
}
</style>
