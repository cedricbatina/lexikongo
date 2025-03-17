<template>
  <div class="partners-container">
    <div v-if="partners.length > 0" class="partners-list">
      <div
        v-for="partner in partners"
        :key="partner.id"
        class="partner-item"
        @click="openPartnerLink(partner.website_url)"
        tabindex="0"
        role="button"
        aria-label="Visiter le site de {{ partner.name }}"
      >
        <!-- ✅ Conteneur du logo avec effet au survol -->
        <div class="partner-logo-container">
          <img
            :src="partner.logo_url || '/default-partner-logo.jpg'"
            :alt="'Logo de ' + partner.name"
            class="partner-logo"
          />
          <!-- ✅ Overlay "Découvrir" visible au survol -->
          <div class="overlay">Découvrir</div>
        </div>

        <!-- ✅ Contenu du partenaire -->
        <div class="partner-content">
          <h5 class="partner-title">{{ partner.name }}</h5>
          <p class="partner-description">{{ partner.description }}</p>

          <!-- ✅ Nom du partenaire stylé en bas -->
          <span class="partner-name">{{ partner.partner_name }}</span>
        </div>
      </div>
    </div>

    <div v-else>
      <p class="no-partners">Aucun partenaire enregistré pour le moment.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const partners = ref([]);

// 🔹 Fonction pour récupérer les partenaires depuis l'API
const fetchPartners = async () => {
  try {
    const response = await fetch("/api/partners");
    if (response.ok) {
      partners.value = await response.json();
    } else {
      console.error("Erreur lors de la récupération des partenaires.");
    }
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API des partenaires :", error);
  }
};

// 🔹 Fonction pour ouvrir un lien externe
const openPartnerLink = (url) => {
  if (!url) return;
  window.open(url, "_blank", "noopener,noreferrer");
};

onMounted( async() => {
await fetchPartners();
});
</script>

<style scoped>
.partners-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}

.partners-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.partner-item {
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
  min-height: 300px; /* ✅ Assure une hauteur uniforme */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.partner-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.partner-item:focus {
  outline: 2px solid #007bff;
}

/* ✅ Conteneur fixe du logo avec effet au survol */
.partner-logo-container {
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow: hidden;
  position: relative;
}

/* ✅ Logo uniforme avec `object-fit: contain` */
.partner-logo {
  max-width: 90%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

/* ✅ Effet au survol : léger zoom + overlay */
.partner-item:hover .partner-logo {
  transform: scale(1.05);
  opacity: 0.7;
}

/* ✅ Overlay "Découvrir" */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

/* ✅ Le texte "Découvrir" apparaît au survol */
.partner-item:hover .overlay {
  opacity: 1;
}

/* ✅ Contenu du partenaire */
.partner-content {
  padding: 15px;
  flex-grow: 1;
}

.partner-title {
  font-size: 1.2rem;

  color: #007bff;
  margin-bottom: 8px;
}

.partner-description {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 10px;
  white-space: normal;
  line-height: 1.5;
  min-height: 50px;
}

/* ✅ Nom du partenaire stylé en bas */
.partner-name {
  font-size: 0.85rem;
  color: #fff;
  background-color: #007bff;
  padding: 6px 10px;
  border-radius: 6px;
  display: inline-block;
  font-weight: bold;
  margin-bottom: 10px;
  transition: background 0.3s ease-in-out;
}

.partner-item:hover .partner-name {
  background: #0056b3;
}

.no-partners {
  font-size: 1.2rem;
  color: #555;
}
</style>
