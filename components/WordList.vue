<template>
  <div class="container mt-4">
    <table class="table table-hover">
      <thead>
        <tr>
          <th class="text-primary">Singulier</th>
          <th class="text-primary">Pluriel</th>
          <th class="text-primary">Phonétique</th>
          <th class="text-primary">Français</th>
          <th class="text-primary">Anglais</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in paginatedWords"
          :key="item.slug"
          @click="goToDetails(item.slug)"
          class="link-row"
        >
          <td>
            <span class="searchedExpression">{{ item.singular }}</span>
          </td>
          <td>
            <span class="searchedExpression">{{ item.plural || "-" }}</span>
          </td>
          <td>
            <span class="phonetic">{{ item.phonetic || "-" }}</span>
          </td>
          <td>
            <span class="translation_fr">{{
              truncateText(item.translation_fr, 30) || "-"
            }}</span>
          </td>
          <td>
            <span class="translation_en">{{
              truncateText(item.translation_en, 30) || "-"
            }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @pageChange="changePage"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Pagination from "@/components/Pagination.vue";

const words = ref([]);
const currentPage = ref(1);
const pageSize = 15; // Nombre d'éléments par page
const router = useRouter();

const fetchWords = async () => {
  try {
    const response = await fetch(`/api/all-words-verbs?type=word`);
    const result = await response.json();
    words.value = result.filter((item) => item.type === "word");
  } catch (error) {
    console.error("Erreur lors de la récupération des mots:", error);
    words.value = [];
  }
};

// Fonction pour troncature du texte
const truncateText = (text, limit) => {
  if (!text) return "-";
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};

const paginatedWords = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return words.value.slice(start, start + pageSize);
});

const totalPages = computed(() => Math.ceil(words.value.length / pageSize));

// Redirection vers la page de détails avec le slug
const goToDetails = (slug) => {
  router.push(`/details/word/${slug}`);
};

const changePage = (page) => {
  currentPage.value = page;
};

onMounted(() => {
  fetchWords();
});
</script>

<style scoped>
/* Styles pour la table */
.table thead th {
  /*text-align: center;*/
  color: #007bff; /* Couleur bleue pour le texte des en-têtes */
  font-weight: bold;
}

.table tbody td {
  /* text-align: center;*/
  vertical-align: middle;
  padding: 12px;
  border-top: 1px solid #dee2e6;
}

/* Hover effect on table rows */
.table tbody tr:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

/* Make the entire row clickable */
.link-row {
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Couleurs des textes */
.text-primary {
  color: #007bff; /* Couleur bleue primaire */
}

.phonetic {
  font-style: italic;
  color: #28a745; /* Vert pour la phonétique */
}

.translation_fr,
.translation_en {
  font-size: 0.8rem;
  color: var(--dark-color);
}

/* Pagination buttons */
.btn-primary {
  background-color: #007bff;
  border: none;
  transition: background-color 0.3s ease;
}
.btn-primary:hover {
  background-color: #0056b3;
}

/* Responsive design */
@media (max-width: 768px) {
  .table thead th,
  .table tbody td {
    font-size: 0.875rem;
  }
}

@media (max-width: 576px) {
  .table thead {
    display: none; /* Masquer l'en-tête sur les petits écrans */
  }

  .table tbody tr {
    display: block;
    margin-bottom: 1rem;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 12px;
  }

  .table tbody tr td {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem;
    text-align: left;
  }

  .table tbody tr td::before {
    content: attr(data-label);
    font-weight: bold;
    color: #007bff;
  }

  /* Labels dynamiques pour les petits écrans */
  .table tbody tr td:nth-child(1)::before {
    content: "Sing.";
  }
  .table tbody tr td:nth-child(2)::before {
    content: "Plur.";
  }
  .table tbody tr td:nth-child(3)::before {
    content: "Phon.";
  }
  .table tbody tr td:nth-child(4)::before {
    content: "FR";
  }
  .table tbody tr td:nth-child(5)::before {
    content: "EN";
  }
}
</style>