<template>
  <div>
    <h1>Tableau de bord Admin</h1>
    <p>Bienvenue, vous avez accès aux fonctionnalités administratives.</p>
    <ul>
      <li>
        <nuxt-link to="/admin/words"
          ><button>Voir tous les mots</button></nuxt-link
        >
      </li>
      <li><nuxt-link to="/admin/verbs">Voir tous les verbes</nuxt-link></li>
      <li>
        <nuxt-link to="/admin/users">Voir tous les utilisateurs</nuxt-link>
      </li>
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
