<template>
  <div v-if="paginatedWords.length">
    <div class="list-group mt-4">
      <button
        v-for="item in paginatedWords"
        :key="item.slug"
        type="button"
        class="list-group-item list-group-item-action"
        @click="goToDetails(item.type, item.slug)"
      >
        <span v-if="item.type === 'word'">
          <small class="notice fw-bold">Sing. - Plur. :</small>
          <span class="searchedExpression">
            {{ item.singular + " - " + (item.plural || "-") }}
          </span>
          <br />
          <small class="notice fw-bold">Phon. :</small>
          <span class="phonetic">{{ item.phonetic || "-" }}</span>
        </span>

        <span v-else-if="item.type === 'verb'">
          <small class="notice fw-bold">Verbe : </small>
          <span class="ku-prefix">ku</span>
          <span class="searchedExpression">{{ item.singular }}</span> <br />
          <small class="notice fw-bold">Phon :</small>

          <span class="phonetic">{{ item.phonetic }}</span>
        </span>

        <!-- Traductions -->
        <div class="mt-2">
          <small class="notice text-primary">FR :</small>
          <span>{{ item.translation_fr || "-" }}</span>
        </div>
        <div class="mt-1">
          <small class="notice text-primary">EN :</small>
          <span>{{ item.translation_en || "-" }}</span>
        </div>
      </button>
    </div>
  </div>

  <div v-else class="mt-4">
    <div class="alert alert-info">Aucun résultat trouvé.</div>
  </div>
</template>

<script setup>
const props = defineProps({
  paginatedWords: Array,
});

const goToDetails = (type, slug) => {
  window.location.href = `/details/${type}/${slug}`;
};
</script>


<style scoped>
/* Style pour les résultats de recherche */
.list-group-item {
  transition: background-color 0.3s ease;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 15px;
}

.list-group-item:hover {
  background-color: #f1f1f1;
}

/* Style pour les traductions */
.translation_fr,
.translation_en {
  color: #6c757d; /* Couleur gris neutre */
  font-weight: 400;
}

/* Effet de texte */
.searchedExpression {
  font-weight: bold;
  margin-left: 5px;
}

/* Style pour les étiquettes */
.notice {
  color: #007bff; /* Couleur bleue primaire */
  font-size: 0.9rem;
}

.phonetic {
  font-style: italic;
  color: #28a745; /* Couleur verte pour la phonétique */
  margin-left: 5px;
}

/* Style spécifique pour le préfixe "ku" */
.ku-prefix {
  color: black;
  margin-right: 0.25rem; /* Espacement entre "ku" et le verbe */
}

/* Responsive design for small screens */
@media (max-width: 576px) {
  .searchedExpression {
    font-size: 0.9rem;
  }
  .notice {
    font-size: 0.8rem;
  }
}
</style>
