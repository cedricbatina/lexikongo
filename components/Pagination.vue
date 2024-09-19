<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a
          class="page-link"
          @click="changePage(currentPage - 1)"
          :class="linkClasses"
          :style="cursorStyle"
        >
          Précédent
        </a>
      </li>

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
        >
          {{ page }}
        </a>
      </li>

      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a
          class="page-link"
          @click="changePage(currentPage + 1)"
          :class="linkClasses"
          :style="cursorStyle"
        >
          Suivant
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const props = defineProps({
  currentPage: Number,
  totalPages: Number,
});

const emit = defineEmits(["pageChange"]);

function changePage(page) {
  if (page > 0 && page <= props.totalPages) {
    emit("pageChange", page);
  }
}

// Style pour le curseur pointeur
const cursorStyle = {
  cursor: "pointer", // Assure le curseur en pointeur
};

// Classes pour les liens de pagination
const linkClasses = {
  transition: "background-color 0.3s", // Animation pour hover
};

// Styles spécifiques pour le lien actif
const activeLinkStyles = {
  backgroundColor: "#007bff", // Couleur de fond pour la page active
  color: "#fff", // Texte en blanc pour le lien actif
};
</script>

<style scoped>
.page-link {
  color: #007bff;
  cursor: pointer; /* Ajout direct ici aussi */
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
</style>
