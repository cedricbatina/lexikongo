<template>
  <div>
    <div class="top-bar d-flex justify-content-between p-2 bg-dark text-white">
      <div class="ml-3"><i class="fas fa-phone"></i> +33 7 48 48 49 02</div>
      <div class="mr-3">
        <i class="fas fa-envelope"></i>
        info@lexikongo.fr
      </div>
    </div>
    <Navbar />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script>
import Navbar from "~/components/Navbar.vue"; // Si l'auto-import ne fonctionne pas
import Footer from "~/components/Footer.vue"; // Si l'auto-import ne fonctionne pas
export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style scoped>
@import "@/assets/css/footer-style.css";

.top-bar {
  background-color: #f8f9fa;
}

.fas {
  color: #ed5717;
}
</style>


