<template>
  <div v-if="user">
    <h4 class="text-left text-primary mb-4">Détails de l'utilisateur</h4>
    <ul class="list-group">
      <li class="list-group-item"><strong>ID :</strong> {{ user.user_id }}</li>
      <li class="list-group-item">
        <strong>Nom :</strong> {{ user.username }}
      </li>
      <li class="list-group-item"><strong>Email :</strong> {{ user.email }}</li>
      <li class="list-group-item"><strong>Rôle :</strong> {{ user.role }}</li>
      <li class="list-group-item">
        <strong>Date de création :</strong> {{ formatDate(user.created_at) }}
      </li>
      <li class="list-group-item">
        <strong>Email vérifié :</strong>
        <span v-if="user.email_verified === 1" class="text-success">Oui</span>
        <span v-else class="text-danger">Non</span>
      </li>
    </ul>

    <div class="mt-4">
      <nuxt-link
        :to="`/admin/edit/user/${user.user_id}`"
        class="btn btn-warning me-2"
      >
        <i class="fas fa-edit"></i> Modifier l'utilisateur
      </nuxt-link>
      <button @click="confirmDelete" class="btn btn-danger">
        <i class="fas fa-trash-alt"></i> Supprimer l'utilisateur
      </button>
    </div>

    <nuxt-link to="/admin/admin-users" class="btn btn-primary mt-4"
      >Retour à la liste des utilisateurs</nuxt-link
    >
  </div>
  <div v-else>
    <p class="text-danger">Utilisateur non trouvé</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const user = ref(null);
const route = useRoute();
const router = useRouter();

// Récupération des détails de l'utilisateur
const fetchUserDetails = async () => {
  try {
    const response = await fetch(`/api/details/user/${route.params.id}`);
    const result = await response.json();
    user.value = result;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails de l'utilisateur :",
      error
    );
  }
};

// Fonction de confirmation de suppression
const confirmDelete = async () => {
  if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
    try {
      const response = await fetch("/api/delete-user", {
        method: "DELETE",
      });
      const result = await response.json();
      if (response.ok) {
        alert("Utilisateur supprimé avec succès !");
        router.push("/details/user/[id]");
      } else {
        console.error(result.error);
        alert("Erreur lors de la suppression.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Erreur lors de la suppression.");
    }
  }
};

// Appeler la fonction pour récupérer les détails de l'utilisateur au montage
onMounted(() => {
  fetchUserDetails();
});

// Formater la date
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
.text-success {
  color: green;
  font-weight: bold;
}
.text-danger {
  color: red;
  font-weight: bold;
}
.container {
  margin-top: 20px;
}
</style>
