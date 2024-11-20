<template>
  <div class="table-responsive">
    <table
      class="table table-hover"
      role="table"
      aria-label="Liste des expressions"
    >
      <thead>
        <tr>
          <th>Type</th>
          <th>Singulier</th>
          <th>Pluriel</th>
          <th>Phonétique</th>
          <th>Français</th>
          <th>Anglais</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in paginatedAllWordsVerbs"
          :key="item.slug"
          @click="goToDetails(item.type, item.slug)"
          class="link-row"
          tabindex="0"
          role="button"
          aria-label="Voir les détails de {{ item.type === 'word' ? 'mot' : 'verbe' }} {{ item.singular }}"
        >
          <td>
            <span class="searched-text">{{
              item.type === "word" ? "Mot" : "Verbe"
            }}</span>
          </td>
          <td>
            <span class="searchedExpression">{{ item.singular }}</span>
          </td>
          <td>
            <span class="searchedExpression">{{ item.plural || " " }}</span>
          </td>
          <td>
            <span class="phonetic">{{ item.phonetic || " " }}</span>
          </td>
          <td>
            <span class="translation_fr">{{
              truncateText(item.translation_fr, 60) || " "
            }}</span>
          </td>
          <td>
            <span class="translation_en">{{
              truncateText(item.translation_en, 60) || " "
            }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  paginatedAllWordsVerbs: {
    type: Array,
    required: true,
  },
});

// Rediriger vers la page de détails avec le slug
const goToDetails = (type, slug) => {
  window.location.href = `/details/${type}/${slug}`;
};

// Fonction pour tronquer le texte si trop long
const truncateText = (text, limit) => {
  if (!text) return " ";
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};
</script>

