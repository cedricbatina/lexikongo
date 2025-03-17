<template>
  <div class="table-responsive">
    <table
      class="table table-hover expression-table"
      role="table"
      aria-label="Dernières expressions ajoutées"
    >
      <thead>
        <tr>
          <th>Type</th>
          <th>Singulier/Infinitif</th>
          <th>Pluriel</th>
          <th>Phonétique</th>
          <th>Français</th>
          <th>Anglais</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in expressions"
          :key="item.slug"
          @click="goToDetails(item.type, item.slug)"
          class="link-row"
          tabindex="0"
          role="button"
          aria-label="Voir les détails de {{ item.type === 'word' ? 'mot' : 'verbe' }} {{ item.singular || item.name }}"
        >
          <td>
            <span class="searched-text">{{
              item.type === "word" ? "Mot" : "Verbe"
            }}</span>
          </td>
          <td>
            <span class="searchedExpression">{{
              item.singular || item.name || " "
            }}</span>
          </td>
          <td>
            <span class="searchedExpression">{{ item.plural || " " }}</span>
          </td>
          <td>
            <span class="phonetic-text">{{ item.phonetic || " " }}</span>
          </td>
          <td>
            <span class="translation-text">{{
              truncateText(item.translation_fr, 60) || " "
            }}</span>
          </td>
          <td>
            <span class="translation-text">{{
              truncateText(item.translation_en, 60) || " "
            }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const expressions = ref([]);

// Fonction pour récupérer les dernières expressions
const fetchLastExpressions = async () => {
  try {
    const response = await fetch("/api/last-expressions");
    if (response.ok) {
      const result = await response.json();
      expressions.value = result;
    } else {
      console.error("Erreur lors de la récupération des expressions.");
    }
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API :", error);
  }
};

// Appel de l'API au montage du composant
onMounted(() => {
  fetchLastExpressions();
});

// Redirection vers les détails
const goToDetails = (type, slug) => {
  window.location.href = `/details/${type}/${slug}`;
};

// Fonction pour tronquer le texte
const truncateText = (text, limit) => {
  if (!text) return "-";
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};
</script>

<style scoped>
/* Styles réutilisables pour la table */
.table-responsive {
  overflow-x: auto;
}

.expression-table {
  border-collapse: collapse;
}

.expression-table th {
  color: var(--primary-color);
  font-weight: bold;
}

.expression-table td {
  vertical-align: middle;
  padding: 12px;
  border-top: 1px solid var(--dark-color);
}

.link-row:hover {
  background-color: var(--hover-primary);
  color: #fff;
  cursor: pointer;
}

.searched-text {
  color: var(--primary-color);
  font-weight: 400;
}

.searchedExpression {
  color: var(--secondary-color);
  font-weight: 600;
}

.phonetic-text {
  font-style: italic;
  color: var(--highlight-color);
}

.translation-text {
  color: var(--text-default);
  font-size: 0.8rem;
  font-weight: 500;
}

/* Responsiveness */
@media (max-width: 576px) {
  .expression-table thead {
    display: none;
  }

  .expression-table tbody tr {
    display: block;
    margin-bottom: 1rem;
    border: 1px solid var(--dark-color);
    border-radius: 8px;
    padding: 12px;
  }

  .expression-table tbody tr td {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem;
    text-align: left;
  }

  .expression-table tbody tr td:nth-child(1)::before {
    content: "Type";
  }

  .expression-table tbody tr td:nth-child(2)::before {
    content: "Sing./Inf.";
  }

  .expression-table tbody tr td:nth-child(3)::before {
    content: "Plur.";
  }

  .expression-table tbody tr td:nth-child(4)::before {
    content: "Phon.";
  }

  .expression-table tbody tr td:nth-child(5)::before {
    content: "Fr";
  }

  .expression-table tbody tr td:nth-child(6)::before {
    content: "En";
  }
}
</style>
