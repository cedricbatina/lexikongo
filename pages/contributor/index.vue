<template>
  <div>
    <h1>Tableau de bord Contributeur</h1>
    <p>Bienvenue, vous pouvez ajouter et modifier des mots et verbes.</p>
    <ul>
      <li><nuxt-link to="/contributor/words">Ajouter un mot</nuxt-link></li>
      <li><nuxt-link to="/contributor/verbs">Ajouter un verbe</nuxt-link></li>
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
