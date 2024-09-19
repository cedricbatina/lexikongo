<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-12">
        <h2 class="text-center mb-4">Liste des Verbes</h2>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Singulier</th>
              <th>Phonétique</th>
              <th>Traduction FR</th>
              <th>Traduction EN</th>
              <th>Détails</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in paginatedVerbs" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.singular }}</td>
              <td>{{ item.phonetic }}</td>
              <td>{{ item.translation_fr || "-" }}</td>
              <td>{{ item.translation_en || "-" }}</td>
              <td>
                <nuxt-link :to="`/details/verb/${item.id}`">
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
        <!-- Bouton pour afficher les mots -->
        <nuxt-link to="/words">
          <button class="btn btn-primary">Voir les Mots</button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Pagination from "@/components/Pagination.vue";

const verbs = ref([]);
const currentPage = ref(1);
const pageSize = 15; // Nombre d'éléments par page

const fetchVerbs = async () => {
  try {
    const response = await fetch(`/api/all-words-verbs?type=verb`);
    const result = await response.json();
    verbs.value = result.filter((item) => item.type === "verb"); // Filtrer pour les verbes uniquement
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

onMounted(() => {
  fetchVerbs();
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
