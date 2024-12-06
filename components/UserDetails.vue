<template>
  <div class="user-details container mt-5">
    <!-- Vérification si l'utilisateur est trouvé -->
    <div v-if="user">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10 col-sm-12">
          <div class="card shadow-sm">
            <div class="card-body">
              <h4 class="text-center text-primary mb-4">
                <i class="fas fa-user"></i> Détails de l'utilisateur
              </h4>
              <ul class="list-group">
                <li class="list-group-item">
                  <strong>ID :</strong> {{ user.user_id }}
                </li>
                <li class="list-group-item">
                  <strong>Nom :</strong> {{ user.username }}
                </li>
                <li class="list-group-item">
                  <strong>Email :</strong> {{ user.email }}
                </li>
                <li class="list-group-item">
                  <strong>Rôles :</strong>
                  <span v-if="user.roles.length > 0">
                    <span
                      v-for="role in user.roles"
                      :key="role"
                      class="badge bg-secondary me-2"
                    >
                      {{ role }}
                    </span>
                  </span>
                  <span v-else>Aucun rôle attribué</span>
                </li>
                <li class="list-group-item">
                  <strong>Date de création :</strong>
                  {{ formatDate(user.created_at) }}
                </li>
                <li class="list-group-item">
                  <strong>Email vérifié :</strong>
                  <span v-if="user.email_verified === 1" class="text-success"
                    >Oui</span
                  >
                  <span v-else class="text-danger">Non</span>
                </li>
              </ul>
              <section class="text-center">
                <div
                  class="action-buttons d-flex justify-content-center flex-wrap mt-4"
                >
                  <nuxt-link
                    :to="`/admin/edit/user/${user.user_id}`"
                    class="btn btn-outline-warning me-2 mb-2"
                  >
                    <i class="fas fa-edit"></i> Modifier l'utilisateur
                  </nuxt-link>
                  <button
                    @click="confirmDelete"
                    class="btn btn-outline-danger me-2 mb-2"
                  >
                    <i class="fas fa-trash-alt"></i> Supprimer l'utilisateur
                  </button>
                  <nuxt-link
                    to="/admin/admin-users"
                    class="btn btn-outline-primary mb-2"
                  >
                    <i class="fas fa-arrow-left"></i> Retour à la liste
                  </nuxt-link>
                </div>
                <AdminButtons />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Cas où l'utilisateur n'est pas trouvé -->
    <div v-else>
      <p class="text-danger text-center mt-4">Utilisateur non trouvé</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const user = ref(null);
const route = useRoute();
const router = useRouter();

const fetchUserDetails = async () => {
  try {
    const response = await fetch(`/api/details/user/${route.params.id}`);
    if (response.ok) {
      const result = await response.json();
      user.value = {
        ...result,
        roles: result.roles ? result.roles.split(",") : [], // Transformer les rôles en tableau
      };
    } else {
      console.error(
        "Erreur lors de la récupération des détails de l'utilisateur."
      );
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails de l'utilisateur :",
      error
    );
  }
};

const confirmDelete = async () => {
  if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
    try {
      const response = await fetch(`/api/delete-user/${user.value.user_id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Utilisateur supprimé avec succès !");
        router.push("/admin/admin-users");
      } else {
        const result = await response.json();
        alert(result.error || "Erreur lors de la suppression.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Erreur lors de la suppression.");
    }
  }
};

onMounted(() => {
  fetchUserDetails();
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
</script>

<style scoped>
.user-details {
  max-width: 900px;
  margin: auto;
}
.card {
  border-radius: 12px;
  border: none;
}
.card-body {
  padding: 2rem;
}
.list-group-item {
  font-size: 1rem;
}
.text-success {
  color: green;
  font-weight: bold;
}
.text-danger {
  color: red;
  font-weight: bold;
}
.badge {
  font-size: 0.9rem;
}
.action-buttons .btn {
  min-width: 180px;
  text-align: center;
}
</style>
