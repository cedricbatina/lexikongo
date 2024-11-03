<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Rejeter la Soumission de Mot</h2>
    <p>Veuillez fournir une raison pour le rejet de ce mot :</p>
    <form @submit.prevent="deleteSubmission">
      <div class="mb-3">
        <label for="reason" class="form-label">Raison du rejet</label>
        <textarea
          v-model="reason"
          id="reason"
          rows="4"
          class="form-control"
          placeholder="Exemple : Mot inapproprié, contenu déjà existant, etc."
          required
        ></textarea>
      </div>
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-danger">Confirmer le Rejet</button>
        <button type="button" class="btn btn-secondary ms-3" @click="goBack">
          Annuler
        </button>
      </div>
    </form>
    <div v-if="message" class="alert mt-3" :class="messageClass">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "~/stores/authStore"; // Importation de authStore

const authStore = useAuthStore();
const adminId = authStore.userId; // Récupérer l'admin_id de l'utilisateur connecté

const route = useRoute();
const router = useRouter();
const slug = route.params.slug;
const reason = ref("");
const message = ref("");
const messageClass = ref("");

const deleteSubmission = async () => {
  if (!reason.value.trim()) {
    message.value = "Veuillez fournir une raison pour le rejet.";
    messageClass.value = "alert-danger";
    return;
  }

  try {
    const response = await fetch(`/api/pending-word-submission/${slug}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reason: reason.value,
        admin_id: adminId, // Utilisation de l'admin_id dynamique
      }),
    });

    if (response.ok) {
      message.value = "Soumission rejetée avec succès.";
      messageClass.value = "alert-success";
      setTimeout(() => router.push("/admin/manage-submissions"), 1500);
    } else {
      throw new Error("Erreur lors de la suppression");
    }
  } catch (error) {
    message.value = error.message;
    messageClass.value = "alert-danger";
  }
};

const goBack = () => {
  router.back();
};
</script>
