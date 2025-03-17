<template>
  <div>
    <h1>Vérification de l'email</h1>
    <p v-if="successMessage">{{ successMessage }}</p>
    <p v-else>{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const successMessage = ref("");
const errorMessage = ref("");

onMounted(async () => {
  const token = route.query.token;

  try {
    const response = await fetch(`/api/verify-email?token=${token}`);
    const result = await response.json();

    if (result.success) {
      successMessage.value = result.message;
    } else {
      errorMessage.value = result.message;
    }
  } catch (error) {
    errorMessage.value = "Erreur lors de la vérification de l'email.";
  }
});
</script>
