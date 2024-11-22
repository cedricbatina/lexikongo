<template>
  <div class="container mt-4">
    <table
      class="table table-hover verb-list-table"
      role="table"
      aria-label="Liste des verbes"
    >
      <thead>
        <tr>
          <th scope="col" class="text-primary">Verbe</th>
          <th scope="col" class="text-primary">Phonétique</th>
          <th scope="col" class="text-primary">Français</th>
          <th scope="col" class="text-primary">Anglais</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in paginatedVerbs"
          :key="item.slug"
          @click="goToDetails(item.slug)"
          class="link-row"
          role="button"
          :aria-label="`Détails pour le verbe ${item.singular}`"
        >
          <td>
            <span class="ku-prefix">ku</span>
            <span class="searchedExpression ms-1">{{ item.singular }}</span>
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
import Pagination from "@/components/Pagination.vue";
import { useRouter } from "vue-router";

const verbs = ref([]);
const currentPage = ref(1);
const pageSize = 15;
const router = useRouter();

const fetchVerbs = async () => {
  try {
    const response = await fetch(`/api/all-words-verbs?type=verb`);
    const result = await response.json();
    verbs.value = result.filter((item) => item.type === "verb");
  } catch (error) {
    console.error("Erreur lors de la récupération des verbes :", error);
    verbs.value = [];
  }
};

const paginatedVerbs = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return verbs.value.slice(start, start + pageSize);
});

const totalPages = computed(() => Math.ceil(verbs.value.length / pageSize));

const changePage = (page) => {
  currentPage.value = page;
};

const goToDetails = (slug) => {
  router.push(`/details/verb/${slug}`);
};

const truncateText = (text, limit) => {
  if (!text) return "-";
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};

onMounted(() => {
  fetchVerbs();
});
</script>


<style scoped>
.verb-list-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
}

.verb-list-table thead th {
  color: var(--primary-color);
  font-weight: bold;
  text-align: left;
}

.verb-list-table tbody td {
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

.ku-prefix {
  color: black;
  margin-right: 0.1rem;
}

/* Responsive styles for small screens */
@media (max-width: 576px) {
  .verb-list-table thead {
    display: none;
  }

  .verb-list-table tbody tr {
    display: block;
    margin-bottom: 1rem;
    border: 1px solid var(--dark-color);
    border-radius: 8px;
    padding: 0.5rem;
  }

  .verb-list-table tbody td {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    text-align: left;
  }

  .verb-list-table tbody td:nth-child(1)::before {
    content: "Verbe";
    font-weight: bold;
    color: var(--primary-color);
  }

  .verb-list-table tbody td:nth-child(2)::before {
    content: "Phonétique";
    font-weight: bold;
    color: var(--primary-color);
  }

  .verb-list-table tbody td:nth-child(3)::before {
    content: "Français";
    font-weight: bold;
    color: var(--primary-color);
  }

  .verb-list-table tbody td:nth-child(4)::before {
    content: "Anglais";
    font-weight: bold;
    color: var(--primary-color);
  }
}
</style>
