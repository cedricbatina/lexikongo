<template>
  <div>
    <h1>Tableau de bord Utilisateur</h1>
    <p>Bienvenue, vous pouvez consulter les mots et verbes.</p>
    <ul>
      <li><nuxt-link to="/user/user-words">Voir les mots</nuxt-link></li>
      <li><nuxt-link to="/user/user-verbs">Voir les verbes</nuxt-link></li>
    </ul>
    <button @click="logout">Se déconnecter</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
definePageMeta({
  middleware: "auth",
});
</script>
