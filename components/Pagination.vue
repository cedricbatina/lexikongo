<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <!-- Précédent -->
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a
          class="page-link"
          @click="changePage(currentPage - 1)"
          :class="linkClasses"
          :style="cursorStyle"
          aria-label="Page précédente"
        >
          <span aria-hidden="true">
            <i v-if="isSmallScreen" class="fas fa-chevron-left"></i>
            <span v-else>Précédent</span>
          </span>
        </a>
      </li>

      <!-- Pages -->
      <li
        class="page-item"
        v-for="page in totalPages"
        :key="page"
        :class="{ active: currentPage === page }"
      >
        <a
          class="page-link"
          @click="changePage(page)"
          :class="linkClasses"
          :style="[cursorStyle, currentPage === page ? activeLinkStyles : '']"
          aria-label="Page {{ page }}"
        >
          {{ page }}
        </a>
      </li>

      <!-- Suivant -->
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a
          class="page-link"
          @click="changePage(currentPage + 1)"
          :class="linkClasses"
          :style="cursorStyle"
          aria-label="Page suivante"
        >
          <span aria-hidden="true">
            <i v-if="isSmallScreen" class="fas fa-chevron-right"></i>
            <span v-else>Suivant</span>
          </span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Props : les pages courantes et totales
const props = defineProps({
  currentPage: Number,
  totalPages: Number,
});

// Émettre les changements de page
const emit = defineEmits(["pageChange"]);

function changePage(page) {
  if (page > 0 && page <= props.totalPages) {
    emit("pageChange", page);
  }
}

// Style pour le curseur pointeur
const cursorStyle = {
  cursor: "pointer",
};

// Classes pour les liens de pagination
const linkClasses = {
  transition: "background-color 0.3s",
};

// Styles spécifiques pour le lien actif
const activeLinkStyles = {
  backgroundColor: "#007bff",
  color: "#fff",
  borderColor: "#007bff",
};

// Gestion de la taille de l'écran
const isSmallScreen = ref(false);

const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 576; // Mobile en dessous de 576px
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize); // Ecoute les changements de taille d'écran
});
</script>

<style scoped>
/* Pagination de base */
.page-link {
  color: #007bff;
}

.page-link:hover {
  background-color: #f1f1f1;
  text-decoration: none;
}

.page-item.disabled .page-link {
  cursor: not-allowed;
  color: #6c757d;
}

.page-item.active .page-link {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
}

/* Centrer les éléments */
.pagination {
  justify-content: center;
}

/* Adaptation pour les petits écrans avec icônes */
@media (max-width: 576px) {
  .page-link {
    padding: 0.5rem; /* Réduire la taille des liens de pagination */
    font-size: 0.875rem;
  }

  .page-item {
    margin: 0 2px; /* Espacement réduit pour les petits écrans */
  }
}
</style>
