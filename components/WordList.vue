<template>
  <div class="container mt-4">
    <table
      class="table table-hover word-list-table"
      role="table"
      aria-label="Liste des mots"
    >
      <thead>
        <tr>
          <th scope="col" class="text-primary">Singulier</th>
          <th scope="col" class="text-primary">Pluriel</th>
          <th scope="col" class="text-primary">Phonétique</th>
          <th scope="col" class="text-primary">Français</th>
          <th scope="col" class="text-primary">Anglais</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in paginatedWords"
          :key="item.slug"
          @click="goToDetails(item.slug)"
          class="link-row"
          role="button"
          :aria-label="`Détails pour ${item.singular}`"
        >
          <td>
            <span class="searchedExpression">{{ item.singular || "-" }}</span>
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
.word-list-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
}

.word-list-table thead th {
  color: var(--primary-color);
  font-weight: bold;
  text-align: left;
}

.word-list-table tbody td {
  vertical-align: middle;
  padding: 0.75rem;
  border-top: 1px solid var(--dark-color);
}

.link-row {
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.link-row:hover {
  background-color: var(--hover-primary);
  color: #fff;
}

.searchedExpression {
  color: var(--secondary-color);
  font-weight: 600;
}

.phonetic {
  font-style: italic;
  color: var(--highlight-color);
}

.translation_fr,
.translation_en {
  color: var(--text-default);
  font-size: 0.9rem;
}

/* Responsive styles for small screens */
@media (max-width: 576px) {
  .word-list-table thead {
    display: none;
  }

  .word-list-table tbody tr {
    display: block;
    margin-bottom: 1rem;
    border: 1px solid var(--dark-color);
    border-radius: 8px;
    padding: 0.5rem;
  }

  .word-list-table tbody td {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    text-align: left;
  }

  .word-list-table tbody td:nth-child(1)::before {
    content: "Singulier";
    font-weight: bold;
    color: var(--primary-color);
  }

  .word-list-table tbody td:nth-child(2)::before {
    content: "Pluriel";
    font-weight: bold;
    color: var(--primary-color);
  }

  .word-list-table tbody td:nth-child(3)::before {
    content: "Phonétique";
    font-weight: bold;
    color: var(--primary-color);
  }

  .word-list-table tbody td:nth-child(4)::before {
    content: "Français";
    font-weight: bold;
    color: var(--primary-color);
  }

  .word-list-table tbody td:nth-child(5)::before {
    content: "Anglais";
    font-weight: bold;
    color: var(--primary-color);
  }
}
</style>
