<template>
  <div>
    <!-- Si des mots sont trouvés -->
    <div v-if="paginatedWords.length">
      <ul class="list-group mt-4">
        <li
          v-for="item in paginatedWords"
          :key="item.slug"
          class="list-group-item"
        >
          <button
            type="button"
            class="list-group-button"
            @click="goToDetails(item.type, item.slug)"
            :aria-label="`Voir les détails de ${itemLabel(item)}`"
          >
            <div>
              <span v-if="item.type === 'word'">
                <small class="notice fw-bold">Sing. - Plur. :</small>
                <span class="searchedExpression">
                  {{ item.singular }} - {{ item.plural }}
                </span>
              </span>

              <span v-else-if="item.type === 'verb'">
                <small class="notice fw-bold">Verbe :</small>
                <span class="searchedExpression">ku {{ item.singular }}</span>
              </span>
            </div>
            <div v-if="item.phonetic">
              <small class="notice fw-bold">Phon. :</small>

              <span class="phonetic">
                {{ item.phonetic }}
              </span>
            </div>
            <div class="translations">
              <div v-if="item.translation_fr">
                <small class="notice text-primary">FR :</small>
                <span class="translation_fr">
                  {{ truncateText(item.translation_fr, 30) }}
                </span>
              </div>
              <div v-if="item.translation_en">
                <small class="notice text-primary">EN :</small>
                <span class="translation_en">
                  {{ truncateText(item.translation_en, 30) }}
                </span>
              </div>
            </div>
          </button>
        </li>
      </ul>
    </div>

    <!-- Si aucun mot n'est trouvé -->
    <div v-else class="mt-4">
      <div class="alert alert-info" role="alert">Aucun mot trouvé.</div>
    </div>
  </div>
</template>

<script setup>
//import { defineProps } from "vue";

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

const truncateText = (text, limit) => {
  if (!text) return "";
  return text.length > limit ? text.slice(0, limit) + "..." : text;
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

/* Styles généraux */
.list-group-item {
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

.notice {
  font-size: 0.85rem;
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

  .notice {
    font-size: 0.8rem;
  }

  .translation_fr,
  .translation_en {
    font-size: 0.85rem;
  }
}
</style>
