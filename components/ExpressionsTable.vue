<template>
  <div class="table-responsive">
    <table class="table table-hover">
      <thead>
        <tr>
          <th class="text-primary">Type</th>
          <th class="text-primary">Sing.</th>
          <th class="text-primary">Plur.</th>
          <th class="text-primary">Phon.</th>
          <th class="text-primary">Fr.</th>
          <th class="text-primary">En.</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in paginatedAllWordsVerbs"
          :key="item.slug"
          @click="goToDetails(item.type, item.slug)"
          class="clickable-row"
        >
          <td>
            <span class="searched-word">{{
              item.type === "word" ? "Subst." : "Verb"
            }}</span>
          </td>
          <td>
            <span class="searchedExpression">{{ item.singular }}</span>
          </td>
          <td>
            <span class="searchedExpression">{{ item.plural || " " }}</span>
          </td>
          <td>
            <span class="phonetic">{{ item.phonetic || "-" }}</span>
          </td>
          <td>
            <span class="translation_fr">{{
              truncateText(item.translation_fr, 40) || "-"
            }}</span>
          </td>
          <td>
            <span class="translation_en">{{
              truncateText(item.translation_en, 40) || "-"
            }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  paginatedAllWordsVerbs: Array,
});

// Log pour vérifier les données reçues
console.log(
  "Données reçues dans ExpressionTable:",
  props.paginatedAllWordsVerbs
);

// Rediriger vers la page de détails avec le slug
const goToDetails = (type, slug) => {
  window.location.href = `/details/${type}/${slug}`;
};

// Fonction pour tronquer le texte si trop long
const truncateText = (text, limit) => {
  if (!text) return "-";
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};
</script>


<style scoped>
/* Style général de la table */
.table {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

/* Style pour les en-têtes */
thead th {
  color: #007bff; /* Utilisation de la couleur text-primary */
  font-weight: bold;
  text-align: center;
  border-bottom: 2px solid #dee2e6;
}

/* Style pour les cellules du tableau */
tbody td {
  text-align: center;
  vertical-align: middle;
  padding: 12px;
  border-top: 1px solid #dee2e6;
}

/* Style pour les lignes cliquables */
.clickable-row {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

/* Effet hover sur les lignes */
.clickable-row:hover {
  background-color: #f1f1f1; /* Couleur d'arrière-plan sur hover */
}

/* Couleurs pour les différents types d'expressions */
.searched-word {
  color: #007bff; /* Texte important en bleu */
}

.phonetic {
  font-style: italic;
  color: #28a745; /* Vert pour la phonétique */
}

.translation_fr,
.translation_en {
  color: #03080d; /* Texte gris pour les traductions */
  margin-left: 5px; /* Espacement entre les éléments */
}

/* Style responsive pour petits écrans */
@media (max-width: 768px) {
  tbody td,
  thead th {
    font-size: 0.875rem; /* Réduction de la taille du texte pour tablettes */
  }
}

@media (max-width: 576px) {
  .table thead {
    display: none; /* Masquer l'en-tête sur les très petits écrans */
  }

  .table tbody tr {
    display: block;
    margin-bottom: 1rem;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 12px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
  }

  .table tbody tr td {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem;
    text-align: left;
  }

  .table tbody tr td::before {
    content: attr(data-label);
    font-weight: bold;
    color: #007bff; /* Bleu pour les étiquettes */
  }

  /* Ajouter des labels dynamiques pour chaque colonne */
  .table tbody tr td:nth-child(1)::before {
    content: "Type";
  }
  .table tbody tr td:nth-child(2)::before {
    content: "Sing.";
  }
  .table tbody tr td:nth-child(3)::before {
    content: "Plur.";
  }
  .table tbody tr td:nth-child(4)::before {
    content: "Phon.";
  }
  .table tbody tr td:nth-child(5)::before {
    content: "Fr.";
  }
  .table tbody tr td:nth-child(6)::before {
    content: "En.";
  }
}
</style>
