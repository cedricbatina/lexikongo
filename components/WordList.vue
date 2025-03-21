<template>
  <div class="container mt-4">
    <table
      v-if="paginatedWords.length"
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
          :key="item.id"
          @click="goToDetails('word', item.slug)"
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

    <!-- Message en cas de données manquantes -->
    <div v-else class="alert alert-warning text-center mt-4" aria-live="polite">
      Aucun mot trouvé pour le moment.
    </div>

    <!-- Pagination -->
    <Pagination
      v-if="totalPages > 1"
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

// Variables globales
const words = ref([]);
const currentPage = ref(1);
const pageSize = 15; // Nombre d'éléments par page
const router = useRouter();

// Fonction pour récupérer les mots depuis l'API
const fetchWords = async () => {
  try {
    const response = await fetch("/api/all-words-verbs");
    const result = await response.json();

    // Vérifiez que chaque élément possède un slug
    words.value = result
      .filter((item) => item.type === "word" && item.slug)
      .map((item) => ({
        ...item,
        slug: item.slug || null, // Assurez-vous que le slug existe
      }));

    console.log("Mots récupérés :", words.value);
  } catch (error) {
    console.error("Erreur lors de la récupération des mots :", error);
    words.value = [];
  }
};

// Fonction pour tronquer un texte
const truncateText = (text, limit) => {
  if (!text) return "-";
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};

// Pagination
const paginatedWords = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return words.value.slice(start, start + pageSize);
});

const totalPages = computed(() => Math.ceil(words.value.length / pageSize));

// Redirection vers la page de détails avec le type et le slug
const goToDetails = (type, slug) => {
  if (!slug) {
    console.error("Erreur : Slug manquant pour la redirection.");
    return;
  }
  router.push(`/details/${type}/${slug}`);
};

// Gestion du changement de page
const changePage = (page) => {
  currentPage.value = page;
};

// Chargement initial
onMounted(() => {
  fetchWords();
});
</script>

<!--
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
const goToDetails = (type, slug) => {
  router.push(`/details/${type}/${slug}`);
};

const changePage = (page) => {
  currentPage.value = page;
};

onMounted(() => {
  fetchWords();
});
</script>
-->
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
  font-size: 0.8rem;
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
    font-weight: 600;
    color: var(--primary-color);
  }

  .word-list-table tbody td:nth-child(2)::before {
    content: "Pluriel";
    font-weight: 600;
    color: var(--primary-color);
  }

  .word-list-table tbody td:nth-child(3)::before {
    content: "Phonétique";
    font-weight: 600;
    color: var(--primary-color);
  }

  .word-list-table tbody td:nth-child(4)::before {
    content: "Français";
    font-weight: 600;
    color: var(--primary-color);
  }

  .word-list-table tbody td:nth-child(5)::before {
    content: "Anglais";
    font-weight: 600;
    color: var(--primary-color);
  }
}
</style>
