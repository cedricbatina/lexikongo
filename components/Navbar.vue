<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light row">
    <div class="container-fluid">
      <div class="col-1"></div>
      <div class="col-5">
        <Logo />
      </div>
      <div class="col-1"></div>
      <!-- Le bouton hamburger visible seulement sur les petits écrans -->
      <button
        class="navbar-toggler d-lg-none"
        type="button"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span :class="{ 'navbar-toggler-icon': true, open: isMenuOpen }"></span>
      </button>
      <div class="collapse navbar-collapse" :class="{ show: isMenuOpen }">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 col-5">
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/">Accueil</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/posts">Réalisations</nuxt-link>
          </li>

          <li class="nav-item">
            <nuxt-link class="nav-link" to="/contact">Contact</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/privacy">Mentions</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
};
</script>

<style scoped>
.navbar-toggler {
  border: none;
}

.navbar-toggler-icon {
  position: relative;
  width: 24px;
  height: 2px;
  background-color: #000;
  transition: background-color 0.3s ease;
}

.navbar-toggler-icon::before,
.navbar-toggler-icon::after {
  content: "";
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: #000;
  transition: transform 0.3s ease, top 0.3s ease, bottom 0.3s ease;
}

.navbar-toggler-icon::before {
  top: -6px;
}

.navbar-toggler-icon::after {
  top: 6px;
}

.navbar-toggler-icon.open {
  background-color: transparent;
}

.navbar-toggler-icon.open::before {
  transform: rotate(45deg);
  top: 0;
}

.navbar-toggler-icon.open::after {
  transform: rotate(-45deg);
  top: 0;
}

.collapse.navbar-collapse {
  transition: height 0.3s ease;
}

.show {
  display: block !important;
  height: auto !important;
}
</style>
