<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <h2 class="text-center text-primary mb-4">Modifier l'utilisateur</h2>
        <form @submit.prevent="updateUser">
          <div class="mb-3">
            <label for="username" class="form-label">Nom d'utilisateur</label>
            <input
              type="text"
              v-model="user.username"
              class="form-control"
              id="username"
              required
            />
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              v-model="user.email"
              class="form-control"
              id="email"
              required
            />
          </div>

          <div class="mb-3">
            <label for="role" class="form-label">Rôle</label>
            <select v-model="user.role" class="form-select" id="role" required>
              <option value="admin">Admin</option>
              <option value="contributor">Contributeur</option>
              <option value="user">Utilisateur</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary">Mettre à jour</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const user = ref({
  username: "",
  email: "",
  role: "user",
});

// Récupération des détails de l'utilisateur
const fetchUserDetails = async () => {
  try {
    const response = await fetch(`/api/admin/details/user/${route.params.id}`);
    const result = await response.json();
    user.value = result;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
  }
};

// Mise à jour de l'utilisateur
const updateUser = async () => {
  try {
    console.log("Données envoyées :", user.value); // Log des données envoyées

    const response = await fetch(`/api/update-user/${route.params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.value.username,
        email: user.value.email,
        role: user.value.role,
      }),
    });

    console.log("Réponse complète de l'API :", response); // Affiche toute la réponse de l'API

    const result = await response.json();
    console.log("Résultat de l'API :", result); // Affiche le résultat JSON renvoyé

    if (response.ok) {
      alert("Utilisateur mis à jour avec succès !");
      router.push("/admin/admin-users"); // Redirige après succès
    } else {
      console.error("Erreur lors de la mise à jour :", result.error);
      alert("Une erreur est survenue lors de la mise à jour.");
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    alert("Une erreur s'est produite lors de la mise à jour.");
  }
};

onMounted(fetchUserDetails);
</script>


<style scoped>
.container {
  margin-top: 30px;
}
</style>
