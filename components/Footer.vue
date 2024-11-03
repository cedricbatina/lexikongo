<template>
  <div
    class="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn"
    data-wow-delay="0.1s"
  >
    <div class="container py-5">
      <div class="row g-5">
        <div class="col-lg-3 col-md-6">
          <h4 class="text-light mb-4">Adresse</h4>
          <p class="mb-2">
            <i class="fa fa-map-marker-alt me-3"></i>Barthez 4, 33170 Gradignan
          </p>
          <p class="mb-2">
            <i class="fa fa-phone-alt me-3"></i>+33 7 48 48 49 02
          </p>
          <p class="mb-2">
            <i class="fa fa-envelope me-3"></i>info@lexikongo.fr
          </p>
        </div>
        <div class="col-lg-2 col-md-6">
          <h4 class="text-light mb-4">Horaires</h4>
          <h6 class="text-light">Lundi - Vendredi:</h6>
          <p class="mb-4">7h00 - 20h00</p>
          <h6 class="text-light">Samedi - Dimanche:</h6>
          <p class="mb-0">Fermé</p>
        </div>
        <div class="col-lg-4 col-md-6">
          <h4 class="text-light mb-4">Liens</h4>
          <a class="btn btn-link" href="#"
            >Apprenez les bases du Kikongo classique</a
          >
          <a class="btn btn-link" href="#">Apprenez les bases du Lingala</a>
          <a class="btn btn-link" href="#">Apprenez l'écriture Natikongo</a>
          <a class="btn btn-link" href="#">Apprenez l'écriture Mandombé</a>
          <a class="btn btn-link" href="#"
            >Longoka, partage de compétences en ligne</a
          >
          <a class="btn btn-link" href="#">Mélanie Descarsin</a>

          <a class="btn btn-link" href="#">Kesa Art</a>
          <a class="btn btn-link" href="#">Pour les développeurs</a>
        </div>
        <div class="col-lg-3 col-md-6">
          <h4 class="text-light mb-4">Réseaux sociaux</h4>
          <p>Suivez-nous sur Facebook</p>
          <div class="d-flex pt-2">
            <a
              class="btn btn-outline-light btn-social m-2"
              href="https://www.facebook.com/100063622961242/"
              target="_blank"
            >
              <i class="fab fa-facebook-f m-2"></i>
            </a>
            <a class="btn btn-outline-light btn-social m-2" href="#">
              <i class="fab fa-twitter m-2"></i>
            </a>
            <a class="btn btn-outline-light btn-social m-2" href="#">
              <i class="fab fa-youtube m-2"></i>
            </a>
            <a class="btn btn-outline-light btn-social m-2" href="#">
              <i class="fab fa-linkedin-in m-2"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="copyright">
        <div class="row">
          <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <a
              class="border-bottom btn button-link fw-bold"
              href="https://www.lexikongo.fr"
              >Lexikongo</a
            >
            {{ currentYear }} - &copy; Contenus protégés
          </div>
          <div class="col-md-6 text-center text-md-end fw-bold">
            <div class="row">
              <p>
                Site conçu et maintenu par:
                <a
                  class="border-bottom btn button-link fw-bold"
                  href="https://www.kesa-art.fr"
                  target="_blank"
                  >Kesa Art</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style src="~/assets/css/footer-style.css"></style>
