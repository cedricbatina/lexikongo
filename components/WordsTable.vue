<template>
  <div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Id</th>
          <th>Singulier</th>
          <th>Pluriel</th>
          <th>Phonétique</th>
          <th>Français</th>
          <th>Anglais</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in paginatedWords"
          :key="item.id"
          @click="goToDetails(item.id)"
          style="cursor: pointer"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.singular }}</td>
          <td>{{ item.plural || "-" }}</td>
          <td>{{ item.phonetic }}</td>
          <td>{{ truncateText(item.translation_fr, 30) || "-" }}</td>
          <td>{{ truncateText(item.translation_en, 30) || "-" }}</td>
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
import { ref, computed } from "vue";
import Pagination from "@/components/Pagination.vue";
import { useRouter } from "vue-router";

const props = defineProps({
  words: Array,
  currentPage: Number,
  totalPages: Number,
});

const emit = defineEmits(["pageChange"]);

const router = useRouter();

const paginatedWords = computed(() => {
  const start = (props.currentPage - 1) * 15; // 15 éléments par page
  return props.words.slice(start, start + 15);
});

const changePage = (page) => {
  emit("pageChange", page);
};

const goToDetails = (id) => {
  router.push(`/details/word/${id}`);
};

// Fonction de troncature du texte
const truncateText = (text, limit) => {
  if (!text) return "";
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};
</script>

<style scoped>
.table th {
  color: #ff8a1d;
  font-weight: 400;
}
</style>
