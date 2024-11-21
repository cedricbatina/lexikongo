<template>
  <div class="container mt-4">
    <table class="table table-hover" role="table" aria-label="Liste des mots">
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
            <span class="searchedExpression">{{ item.singular }}</span>
          </td>
          <td v-if="item.plural">
            <span class="searchedExpression">{{ item.plural }}</span>
          </td>
          <td v-else>
            <span class="text-muted">-</span>
          </td>
          <td v-if="item.phonetic">
            <span class="phonetic">{{ item.phonetic }}</span>
          </td>
          <td v-else>
            <span class="text-muted">-</span>
          </td>
          <td>
            <span class="translation_en">{{
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
/* Responsiveness and table-specific styles are now in global.css */
</style>