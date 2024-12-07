<template>
  <div class="advertising-container">
    <div v-if="ads.length > 0" class="ads-list">
      <div v-for="ad in ads" :key="ad.id" class="ad-item">
        <a :href="ad.link_url" target="_blank" rel="noopener noreferrer">
          <img :src="ad.image_url" :alt="ad.title" class="ad-image" />
          <h5 class="ad-title">{{ ad.title }}</h5>
          <p class="ad-description">{{ ad.description }}</p>
          <span class="ad-partner">Partenaire : {{ ad.partner_name }}</span>
        </a>
      </div>
    </div>
    <div v-else>
      <p class="no-ads">Aucune publicité à afficher pour le moment.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const ads = ref([]);

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
}

.ad-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
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
