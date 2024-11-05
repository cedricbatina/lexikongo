<template>
  <div v-if="paginatedWords.length">
    <div class="list-group mt-4">
      <button
        v-for="item in paginatedWords"
        :key="item.id"
        type="button"
        class="list-group-item list-group-item-action"
        @click="goToDetails(item.type, item.id)"
      >
        <span v-if="item.type === 'word'">
          <small class="notice fw-bold">Sing. - Plur. </small>
          <span class="searchedExpression">
            {{ item.singular + " - " + item.plural }}
          </span>
        </span>
        <span v-else-if="item.type === 'verb'">
          <small class="notice fw-bold">Verb : </small>
          ku <span class="searchedExpression">{{ item.singular }}</span>
        </span>
        <br />
        <small class="notice text-primary">FR : </small>
        <span v-if="item.translation_fr" class="translation_fr">
          {{ truncateText(item.translation_fr, 30) }}
        </span>
        <br />
        <small class="notice text-primary">EN : </small>
        <span v-if="item.translation_en" class="translation_en">
          {{ truncateText(item.translation_en, 30) }}
        </span>
      </button>
    </div>
  </div>

  <div v-else class="mt-4">
    <div class="alert alert-info">Aucun mot trouvé.</div>
  </div>
</template>

<script setup>
const props = defineProps({
  paginatedWords: Array,
});

const goToDetails = (type, id) => {
  window.location.href = `/details/${type}/${id}`;
};

const truncateText = (text, limit) => {
  if (!text) return "";
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};
</script>
