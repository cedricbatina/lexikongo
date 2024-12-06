<template>
  <div class="container mt-5">
    <!-- Tableau des utilisateurs -->
    <div class="table-responsive">
      <table class="table table-hover table-striped align-middle">
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
            class="clickable-row"
          >
            <td>{{ user.user_id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role || "Aucun rôle" }}</td>
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
    </div>

    <!-- Pagination -->
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @pageChange="changePage"
    />
    <section class="text-center">
      <SearchButtons />
      <AdminButtons />
    </section>
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
.table {
  font-size: 0.9rem;
}

.table th {
  color: #007bff;
  font-weight: 600;
}

.clickable-row {
  cursor: pointer;
}

.table-hover tbody tr:hover {
  background-color: #f1f1f1;
}

.text-success {
  font-weight: bold;
}

.text-danger {
  font-weight: bold;
}

.btn {
  min-width: 180px;
}

@media (max-width: 768px) {
  .btn {
    min-width: auto;
    font-size: 0.9rem;
    padding: 0.5rem;
  }
}
</style>
