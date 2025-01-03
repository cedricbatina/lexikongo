<template>
  <div class="advertising-container">
    <div v-if="ads.length > 0" class="ads-list">
      <div
        v-for="ad in ads"
        :key="ad.id"
        class="ad-item"
        @click="openAdLink(ad.link_url)"
        tabindex="0"
        role="button"
        aria-label="Voir la publicité {{ ad.title }}"
      >
        <!-- Image -->
        <img
          :src="ad.image_url || '/default-ad-image.jpg'"
          :alt="ad.title"
          class="ad-image"
        />
        <!-- Titre -->
        <h5 class="ad-title">{{ ad.title }}</h5>
        <!-- Description -->
        <p class="ad-description" v-if="ad.description">{{ ad.description }}</p>
        <!-- Partenaire -->
        <span class="ad-partner">Partenaire : {{ ad.partner_name }}</span>
      </div>
    </div>
    <div v-else>
      <p class="no-ads">Aucune publicité à afficher pour le moment.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const ads = ref([]); // Liste des publicités

// Fonction pour récupérer les publicités depuis l'API
const fetchAds = async () => {
  try {
    const response = await fetch("/api/advertisements");
    if (response.ok) {
      ads.value = await response.json();
    } else {
      console.error("Erreur lors de la récupération des publicités.");
    }
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API des publicités :", error);
  }
};

// Fonction pour ouvrir un lien dans une nouvelle fenêtre
const openAdLink = (url) => {
  if (!url) return;
  window.open(url, "_blank", "noopener,noreferrer");
};

onMounted(() => {
  fetchAds();
});
</script>

<style scoped>
.advertising-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}

.ads-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.ad-item {
  max-width: 300px;
  text-align: center;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.ad-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.ad-item:focus {
  outline: 2px solid #007bff;
}

.ad-image {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
}

.ad-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 8px;
  text-decoration: none;
}

.ad-description {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 10px;
}

.ad-partner {
  font-size: 0.8rem;
  color: #888;
}

.no-ads {
  font-size: 1.2rem;
  color: #555;
}
</style>
