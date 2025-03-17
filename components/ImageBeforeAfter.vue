<template>
  <div class="before-after-wrapper">
    <!-- Conteneur flex pour les images avant et après -->
    <div class="before-after-container d-flex justify-content-between">
      <!-- Image avant -->
      <div class="image-column">
        <transition name="fade">
          <div>
            <img
              v-if="currentIndex === 0"
              :src="beforeImages[0]"
              alt="Avant 1"
              class="img-fluid"
            />
            <img
              v-if="currentIndex === 1"
              :src="beforeImages[1]"
              alt="Avant 2"
              class="img-fluid"
            />
            <img
              v-if="currentIndex === 2"
              :src="beforeImages[2]"
              alt="Avant 3"
              class="img-fluid"
            />
          </div>
        </transition>
      </div>

      <!-- Image après -->
      <div class="image-column">
        <transition name="fade">
          <div>
            <img
              v-if="currentIndex === 0"
              :src="afterImages[0]"
              alt="Après 1"
              class="img-fluid"
            />
            <img
              v-if="currentIndex === 1"
              :src="afterImages[1]"
              alt="Après 2"
              class="img-fluid"
            />
            <img
              v-if="currentIndex === 2"
              :src="afterImages[2]"
              alt="Après 3"
              class="img-fluid"
            />
          </div>
        </transition>
      </div>
    </div>

    <!-- Boutons de navigation -->
    <div class="navigation-buttons">
      <button
        class="btn btn-primary"
        @click="prevImage"
        :disabled="currentIndex === 0"
      >
        Précédent
      </button>
      <button
        class="btn btn-primary"
        @click="nextImage"
        :disabled="currentIndex === numberOfImages - 1"
      >
        Suivant
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      beforeImages: [
        "/images/post8.png",
        "/images/am19.jpg",
        "/images/am21.png",
      ],
      afterImages: ["/images/am21.png", "/images/am21.png", "/images/am21.png"],
    };
  },
  computed: {
    numberOfImages() {
      return this.beforeImages.length;
    },
  },
  methods: {
    prevImage() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    nextImage() {
      if (this.currentIndex < this.numberOfImages - 1) {
        this.currentIndex++;
      }
    },
  },
};
</script>

<style scoped>
/* Flexbox pour aligner les images avant et après */
.before-after-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

/* Chaque image occupe 48% de la largeur */
.image-column {
  width: 48%;
}

/* Transition pour un effet de fondu doux lors du changement d'image */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

/* Boutons de navigation bien espacés */
.navigation-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

button {
  min-width: 120px;
}
</style>
