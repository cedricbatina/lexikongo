<template>
  <nav aria-label="Pagination">
    <ul class="pagination justify-content-center mt-4 mb-4">
      <!-- Précédent -->
      <li class="page-item" :class="{ disabled: isFirstPage }">
        <a
          class="page-link"
          :href="prevPageUrl"
          @click.prevent="changePage(currentPage - 1)"
          rel="prev"
          :aria-disabled="isFirstPage"
          :class="linkClasses"
          :style="isFirstPage ? disabledStyle : cursorStyle"
          aria-label="Page précédente"
        >
          <span aria-hidden="true">
            <i v-if="isSmallScreen" class="fas fa-chevron-left"></i>
            <span v-else>Précédent</span>
          </span>
        </a>
      </li>

      <!-- Affichage sous forme "1 / 5" -->
      <li class="page-item disabled">
        <span class="page-link">
          {{ currentPage }} / {{ totalPages }}
        </span>
      </li>

      <!-- Suivant -->
      <li class="page-item" :class="{ disabled: isLastPage }">
        <a
          class="page-link"
          :href="nextPageUrl"
          @click.prevent="changePage(currentPage + 1)"
          rel="next"
          :aria-disabled="isLastPage"
          :class="linkClasses"
          :style="isLastPage ? disabledStyle : cursorStyle"
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
import { ref, computed, onMounted } from "vue";

// 🔹 Définition des propriétés
const props = defineProps({
  currentPage: Number,
  totalPages: Number,
});

const emit = defineEmits(["pageChange"]);

// 🔹 Vérifications de la pagination
const isFirstPage = computed(() => props.currentPage === 1);
const isLastPage = computed(() => props.currentPage === props.totalPages);

// 🔹 URLs SEO-Friendly pour Google
const prevPageUrl = computed(() =>
  props.currentPage > 1 ? `/course?page=${props.currentPage - 1}` : "#"
);
const nextPageUrl = computed(() =>
  props.currentPage < props.totalPages ? `/course?page=${props.currentPage + 1}` : "#"
);

// 🔹 Fonction pour changer de page
function changePage(page) {
  if (page > 0 && page <= props.totalPages) {
    emit("pageChange", page);
  }
}

// 🔹 Styles pour les liens
const cursorStyle = { cursor: "pointer" };
const disabledStyle = { pointerEvents: "none", opacity: "0.5" };
const linkClasses = { transition: "background-color 0.3s" };

// 🔹 Gestion du responsive
const isSmallScreen = ref(false);
const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 576;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
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
  pointer-events: none;
  opacity: 0.5;
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

/* Affichage centré du format "1 / 5" */
.page-item.disabled .page-link {
  font-weight: bold;
  background: none;
  border: none;
  color: #333;
}

/* Adaptation pour les petits écrans avec icônes */
@media (max-width: 576px) {
  .page-link {
    padding: 0.5rem;
    font-size: 0.875rem;
  }

  .page-item {
    margin: 0 2px;
  }
}
</style>
