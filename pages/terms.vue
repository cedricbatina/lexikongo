<template>
  <div class="container mt-5">
    <!-- Titre de la page -->
    <div class="text-center mb-4">
      <h1 class="display-4 text-primary">Tableau de bord Admin</h1>
      <p class="lead">
        Bienvenue, vous avez accès aux fonctionnalités administratives.
      </p>
    </div>

    <!-- Cartes d'accès aux sections -->
    <div class="row text-center">
      <AdminAccessCard
        iconClass="fas fa-book"
        title="Gestion des Mots"
        description="Consultez et modifiez tous les mots du dictionnaire."
        link="/admin/admin-words"
        buttonText="Voir les Mots"
      />
      <AdminAccessCard
        iconClass="fas fa-pencil-alt"
        title="Gestion des Verbes"
        description="Consultez et modifiez tous les verbes du dictionnaire."
        link="/admin/admin-verbs"
        buttonText="Voir les Verbes"
      />
      <AdminAccessCard
        iconClass="fas fa-users"
        title="Gestion des Utilisateurs"
        description="Consultez et gérez tous les utilisateurs de l'application."
        link="/admin/admin-users"
        buttonText="Voir les Utilisateurs"
      />
    </div>

    <!-- Cartes des statistiques -->
    <div class="row">
      <AdminStatsCard
        title="Utilisateurs"
        :value="totalUsers"
        description="Nombre total d'utilisateurs inscrits."
        bgColor="primary"
      />
      <AdminStatsCard
        title="Mots"
        :value="totalWords"
        description="Nombre total de mots enregistrés."
        bgColor="success"
      />
      <AdminStatsCard
        title="Verbes"
        :value="totalVerbs"
        description="Nombre total de verbes enregistrés."
        bgColor="info"
      />
    </div>

    <!-- Graphique -->
    <div class="row">
      <div class="col-md-12">
        <AdminChart />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import AdminAccessCard from "@/components/AdminAccessCard.vue";
import AdminStatsCard from "@/components/AdminStatsCard.vue";
import AdminChart from "@/components/AdminChart.vue";

const router = useRouter();

const totalUsers = ref(0);
const totalWords = ref(0);
const totalVerbs = ref(0);

const fetchStatistics = async () => {
  try {
    // Un seul appel API pour récupérer toutes les statistiques
    const response = await fetch("/api/total-statistics");
    const data = await response.json();

    // Assure-toi que les données sont bien récupérées
    console.log("Statistiques:", data);

    totalUsers.value = data.totalUsers;
    totalWords.value = data.totalWords;
    totalVerbs.value = data.totalVerbs;
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques :", error);
  }
};

onMounted(async () => {
  await fetchStatistics();
});

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};

// Simuler la récupération de statistiques réelles à partir d'une API
onMounted(() => {
  // Appels d'API pour récupérer les statistiques réelles
});
</script>
