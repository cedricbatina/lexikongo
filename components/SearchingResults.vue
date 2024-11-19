<template>
  <div>
    <!-- Si des mots ou verbes sont trouvés -->
    <div v-if="paginatedWords.length">
      <table class="table table-hover">
        <thead>
          <tr>
            <th class="text-primary">Type</th>
            <th class="text-primary">Singulier</th>
            <th class="text-primary">Pluriel</th>
            <th class="text-primary">Phonétique</th>
            <th class="text-primary">Français</th>
            <th class="text-primary">Anglais</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in paginatedWords"
            :key="item.slug"
            @click="goToDetails(item.type, item.slug)"
            @keydown.enter="goToDetails(item.type, item.slug)"
            @keydown.space.prevent="goToDetails(item.type, item.slug)"
            tabindex="0"
            role="button"
            :aria-label="`Voir les détails de ${itemLabel(item)}`"
            class="link-row"
          >
            <td>{{ item.type === "word" ? "Mot" : "Verbe" }}</td>
            <td class="searchedExpression">{{ item.singular }}</td>
            <td class="searchedExpression">{{ item.plural || "-" }}</td>
            <td class="phonetic">{{ item.phonetic || "-" }}</td>
            <td class="translation_fr">{{ item.translation_fr || "-" }}</td>
            <td class="translation_en">{{ item.translation_en || "-" }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Si aucun mot ou verbe n'est trouvé -->
    <div v-else class="mt-4">
      <div class="alert alert-info" role="alert">Aucun résultat trouvé.</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  paginatedWords: {
    type: Array,
    default: () => [],
  },
});

const goToDetails = (type, slug) => {
  if (!slug) {
    console.error("Slug est indéfini pour cet élément:", type);
    return;
  }
  window.location.href = `/details/${type}/${slug}`;
};

// Fonction pour générer un libellé pour l'accessibilité
const itemLabel = (item) => {
  if (item.type === "word") {
    return `${item.singular} - ${item.plural}`;
  } else if (item.type === "verb") {
    return `ku ${item.singular}`;
  }
  return "";
};
</script>




<style scoped>
/* Variables CSS */
:root {
  --primary-color: #007bff;
  --hover-primary: #0056b3;
  --secondary-color: #a52a2a;
  --dark-color: #2a0600;
  --highlight-color: #28a745;
  --text-default: #03080d;
  --third-color: #ff4500;
}

/*.list-group-item {
  border: none;
  padding: 0;
  background-color: transparent;
}

.list-group-button {
  width: 100%;
  text-align: left;
  border: 1px solid #e0e0e0;
  padding: 1rem;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: block;
}

.list-group-button:hover {
  background-color: #f9f9f9;
}

.searchedExpression {
  color: var(--secondary-color);
  font-weight: 500;
}

.translation_fr,
.translation_en {
  font-weight: 400;
  font-size: 0.9rem;
  color: var(--text-default);
}
*/
.notice {
  font-size: 0.75rem;
  margin-right: 0.25rem;
}

.translations {
  margin-top: 0.5rem;
}

.alert {
  font-size: 1rem;
}

/* Responsivité */
@media (max-width: 576px) {
  .list-group-button {
    padding: 0.75rem;
  }

  .translation_fr,
  .translation_en {
    font-size: 0.85rem;
  }
}
</style>
