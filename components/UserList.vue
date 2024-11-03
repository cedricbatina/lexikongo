<template>
  <div class="container mt-5">
    <!-- Tableau des utilisateurs -->
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Email</th>
          <th>Rôle</th>
          <th>Date de création</th>
          <th>Email vérifié</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in paginatedUsers"
          :key="user.user_id"
          @click="goToUserDetails(user.user_id)"
          style="cursor: pointer"
        >
          <td>{{ user.user_id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>{{ formatDate(user.created_at) }}</td>
          <td>
            <span v-if="user.email_verified === 1" class="text-success"
              >Oui</span
            >
            <span v-else class="text-danger">Non</span>
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
  <!-- Boutons de navigation -->
  <div class="row mt-4">
    <div class="col-md-12 d-flex justify-content-center">
      <div class="btn-group" role="group" aria-label="Admin actions">
        <nuxt-link to="/admin/admin-add-user">
          <button class="btn btn-primary d-flex align-items-center">
            <i class="fas fa-user-plus me-2"></i> Ajouter un utilisateur
          </button>
        </nuxt-link>

        <nuxt-link to="/">
          <button class="btn btn-secondary d-flex align-items-center">
            <i class="fas fa-home me-2"></i> Retour à l'accueil
          </button>
        </nuxt-link>

        <nuxt-link to="/admin/admin-words">
          <button class="btn btn-primary d-flex align-items-center">
            <i class="fas fa-book me-2"></i> La liste des mots
          </button>
        </nuxt-link>

        <nuxt-link to="/admin/admin-verbs">
          <button class="btn btn-primary d-flex align-items-center">
            <i class="fas fa-pencil-alt me-2"></i> La liste des verbes
          </button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Pagination from "@/components/Pagination.vue";

const users = ref([]); // Tous les utilisateurs
const currentPage = ref(1);
const pageSize = 15; // Nombre d'utilisateurs par page
const router = useRouter(); // Pour la redirection

// Récupérer tous les utilisateurs depuis l'API
const fetchUsers = async () => {
  try {
    const response = await fetch(`/api/get-users`);
    const result = await response.json();
    users.value = result;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
  }
};

// Pagination côté client
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return users.value.slice(start, start + pageSize);
});

const totalPages = computed(() => Math.ceil(users.value.length / pageSize));

const changePage = (page) => {
  currentPage.value = page;
};

// Fonction pour rediriger vers les détails de l'utilisateur
const goToUserDetails = (userId) => {
  router.push(`/admin/user/${userId}`);
};

// Formater la date de création
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Charger les utilisateurs au montage du composant
onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.table th {
  color: #007bff;
  font-weight: 600;
}
.table-hover tbody tr:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}
.text-success {
  font-weight: bold;
}
.text-danger {
  font-weight: bold;
}
</style>
