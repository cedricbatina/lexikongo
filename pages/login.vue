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

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const login = async () => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.value, password: password.value }),
  });

  const result = await response.json();

  if (result.token) {
    localStorage.setItem("token", result.token);
    const userRole = JSON.parse(atob(result.token.split(".")[1])).role;
    if (userRole === "admin") {
      router.push("/admin");
    } else if (userRole === "contributor") {
      router.push("/contributor");
    } else {
      router.push("/user");
    }
  } else {
    error.value = result.error;
  }
};
</script>
