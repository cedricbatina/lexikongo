<template>
  <div>
    <h1>Connexion</h1>
    <form @submit.prevent="login">
      <div>
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>
      <div>
        <label>Mot de passe</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit">Connexion</button>
    </form>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

// login.vue
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/authStore";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();
const authStore = useAuthStore();

const login = async () => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.value, password: password.value }),
  });

  const result = await response.json();

  if (result.token) {
    authStore.login(result.token); // Utilise le store Pinia pour gérer le login
    if (authStore.userRole === "admin") {
      router.push("/admin");
    } else if (authStore.userRole === "contributor") {
      router.push("/contributor");
    } else {
      router.push("/user");
    }
  } else {
    error.value = result.error;
  }
};
</script>
