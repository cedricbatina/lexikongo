<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-12">
        <h2 class="text-center mb-4">Liste des Mots</h2>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Singulier</th>
              <th>Pluriel</th>
              <th>Phonétique</th>
              <th>Traduction FR</th>
              <th>Traduction EN</th>
              <th>Détails</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in paginatedWords" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.singular }}</td>
              <td>{{ item.plural || "-" }}</td>
              <td>{{ item.phonetic }}</td>
              <td>{{ item.translation_fr || "-" }}</td>
              <td>{{ item.translation_en || "-" }}</td>
              <td>
                <nuxt-link :to="`/details/word/${item.id}`">
                  <button class="btn btn-primary fw-bold details">+</button>
                </nuxt-link>
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
    </div>

    <div class="row mt-4">
      <div class="col-md-12 d-flex justify-content-between">
        <!-- Bouton retour à l'accueil -->
        <nuxt-link to="/">
          <button class="btn btn-secondary">Retour à l'accueil</button>
        </nuxt-link>
        <!-- Bouton pour afficher les verbes -->
        <nuxt-link to="/verbs">
          <button class="btn btn-primary">Voir les Verbes</button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Pagination from "@/components/Pagination.vue";

const words = ref([]);
const currentPage = ref(1);
const pageSize = 15; // Nombre d'éléments par page

const fetchWords = async () => {
  try {
    const response = await fetch(`/api/all-words-verbs?type=word`);
    const result = await response.json();
    words.value = result.filter((item) => item.type === "word"); // Filtrer pour les mots uniquement
  } catch (error) {
    console.error("Erreur lors de la récupération des mots :", error);
    words.value = [];
  }
};

const paginatedWords = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return words.value.slice(start, start + pageSize);
});

const totalPages = computed(() => Math.ceil(words.value.length / pageSize));

const changePage = (page) => {
  currentPage.value = page;
};

onMounted(() => {
  fetchWords();
});
</script>

<style scoped>
.table th {
  color: #ff8a1d;
  font-weight: 400;
}
.btn-primary {
  background-color: #ff8a1d;
  border: none;
  transition: background-color 0.3s ease;
}
.btn-primary:hover {
  background-color: #e57a1a;
}
</style>
