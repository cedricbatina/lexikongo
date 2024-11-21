<template>
  <div class="container mt-4">
    <table class="table table-hover" role="table" aria-label="Liste des verbes">
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
            <span class="phonetic">{{ item.phonetic || " " }}</span>
          </td>
          <td>
            <span class="translation_fr">{{
              truncateText(item.translation_fr, 30) || " "
            }}</span>
          </td>
          <td>
            <span class="translation_en">{{
              truncateText(item.translation_en, 30) || " "
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
  if (!text) return " ";
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};

onMounted(() => {
  fetchVerbs();
});
</script>

<style scoped>
/* Styles spécifiques */
.ku-prefix {
  color: black;
  margin-right: 0.25rem;
}

/* Les autres styles globaux comme .phonetic, .searchedExpression, etc., sont dans le fichier global */
</style>