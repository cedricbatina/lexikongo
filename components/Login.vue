<template>
  <div class="login-container">
    <h1>Connexion</h1>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label>Email</label>
        <input
          v-model="email"
          type="email"
          required
          placeholder="Entrez votre email"
        />
      </div>

      <div class="form-group">
        <label>Mot de passe</label>
        <div class="password-wrapper">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            required
            placeholder="Entrez votre mot de passe"
          />
          <button type="button" class="toggle-password" @click="togglePassword">
            {{ showPassword ? "Cacher" : "Voir" }}
          </button>
        </div>
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-primary">Connexion</button>
      </div>

      <div v-if="error" class="error">{{ error }}</div>

      <div class="form-links">
        <nuxt-link to="/register">Créer un compte</nuxt-link> |
        <nuxt-link to="/forgot-password">Mot de passe oublié ?</nuxt-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/authStore";

const email = ref("");
const password = ref("");
const showPassword = ref(false); // Pour basculer entre voir/cacher le mot de passe
const error = ref("");
const router = useRouter();
const authStore = useAuthStore();

const login = async () => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    const result = await response.json();

    if (result.token) {
      authStore.login(result.token);
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
  } catch (err) {
    console.error("Erreur lors de la tentative de connexion :", err);
    error.value = "Une erreur est survenue lors de la connexion.";
  }
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.login-container h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.password-wrapper {
  position: relative;
}

.password-wrapper input {
  width: 100%;
  padding-right: 60px;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
}

.btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  text-align: center;
  margin-top: 1rem;
}

.form-links {
  margin-top: 1rem;
  text-align: center;
}

.form-links a {
  color: #007bff;
  text-decoration: none;
}

.form-links a:hover {
  text-decoration: underline;
}
</style>
