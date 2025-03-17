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
        <!-- ✅ Image avec overlay au survol -->
        <div class="ad-image-container">
          <img
            :src="ad.image_url || '/default-ad-image.jpg'"
            :alt="ad.title"
            class="ad-image"
          />
          <div class="ad-overlay">
            <span class="ad-overlay-text">Découvrir</span>
          </div>
        </div>

        <!-- ✅ Contenu de la publicité -->
        <div class="ad-content">
          <h5 class="ad-title">{{ ad.title }}</h5>
          <p class="ad-description" v-if="ad.description">{{ ad.description }}</p>
          <span class="ad-partner">Partenaire : {{ ad.partner_name }}</span>
        </div>

        <!-- ✅ Bouton CTA -->
        <button class="ad-btn" @click.stop="openAdLink(ad.link_url)">En savoir plus</button>
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

// 🔹 Fonction pour récupérer les publicités depuis l'API
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

// 🔹 Fonction pour ouvrir un lien dans un nouvel onglet
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
  max-width: 320px;
  text-align: center;
  background-color: #fff;
  border: 2px solid #ddd;
  border-radius: 12px;
  padding-bottom: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  position: relative;
}

.ad-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.ad-item:focus {
  outline: 2px solid #007bff;
}

/* ✅ Image pleine largeur avec effet overlay */
.ad-image-container {
  position: relative;
  width: 100%;
  height: 160px;
}

.ad-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.ad-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.ad-item:hover .ad-overlay {
  opacity: 1;
}

.ad-overlay-text {
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  text-transform: uppercase;
}

/* ✅ Contenu des publicités */
.ad-content {
  padding: 15px;
}

.ad-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 8px;
}

.ad-description {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 10px;
}

/* ✅ Partenaire stylisé */
.ad-partner {
  font-size: 0.85rem;
  color: #fff;
  background-color: #007bff;
  padding: 6px 10px;
  border-radius: 6px;
  display: inline-block;
}

/* ✅ Bouton CTA */
.ad-btn {
  background: #007bff;
  color: #fff;
  border: none;
  padding: 8px 14px;
  margin-top: 10px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

.ad-btn:hover {
  background: #0056b3;
}

.no-ads {
  font-size: 1.2rem;
  color: #555;
}
.ad-image-container {
  position: relative;
  width: 100%;
  height: 160px; /* Hauteur fixe pour tous les logos */
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff; /* Fond blanc pour homogénéiser */
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow: hidden;
}

.ad-image {
  max-width: 90%; /* ✅ Pour éviter que l'image touche les bords */
  max-height: 100%;
  object-fit: contain; /* ✅ Garde le ratio de l'image sans la déformer */
}

</style>
