<template>
  <div class="container mt-5">
    <h1>Profil de {{ userInfo.username }}</h1>
    <ul class="list-group mt-3">
      <li class="list-group-item">
        <strong>Email:</strong> {{ userInfo.email }}
      </li>
      <li class="list-group-item">
        <strong>Date de création:</strong> {{ formatDate(userInfo.created_at) }}
      </li>
      <li class="list-group-item">
        <strong>Nombre de mots créés:</strong> {{ stats.wordsCreated }}
      </li>
      <li class="list-group-item">
        <strong>Nombre de verbes créés:</strong> {{ stats.verbsCreated }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const userInfo = ref({});
const stats = ref({
  wordsCreated: 0,
  verbsCreated: 0,
});

const fetchUserProfile = async () => {
  try {
    const response = await fetch("/api/user/profil");
    const result = await response.json();

    if (result.error) {
      console.error(result.error);
    } else {
      userInfo.value = result.user;
      stats.value.wordsCreated = result.wordsCreated;
      stats.value.verbsCreated = result.verbsCreated;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du profil :", error);
  }
};

// Function to format the date
const formatDate = (dateString) => {
  if (!dateString) return "Inconnue";
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

onMounted(() => {
  fetchUserProfile();
});
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}

.list-group-item {
  font-size: 18px;
}
</style>
