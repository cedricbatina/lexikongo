<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Rejeter la Soumission de Verbe</h2>
    <form @submit.prevent="submitRejection">
      <div class="form-group">
        <label for="reason">Raison du Rejet :</label>
        <textarea
          id="reason"
          v-model="reason"
          class="form-control"
          required
          placeholder="Expliquez la raison du rejet"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-danger mt-3">
        Rejeter la Soumission
      </button>
    </form>

    <!-- Message de confirmation -->
    <div v-if="message" class="alert mt-3 text-center" :class="messageClass">
      {{ message }}
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const slug = route.params.slug; // Récupération du slug depuis la route
const reason = ref("");
const message = ref("");
const messageClass = ref("");

const submitRejection = async () => {
  try {
    const response = await fetch(`/api/pending-verb-submission/${slug}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        admin_id: 1, // Assurez-vous de fournir un admin_id valide ici
        reason: reason.value,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      message.value = "La soumission a été rejetée avec succès.";
      messageClass.value = "alert-success";
      setTimeout(() => router.push("/admin/manage-submissions"), 4000); // Redirection après 4 secondes
    } else {
      throw new Error(result.error || "Erreur lors du rejet de la soumission.");
    }
  } catch (error) {
    message.value = error.message;
    messageClass.value = "alert-danger";
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}
</style>
