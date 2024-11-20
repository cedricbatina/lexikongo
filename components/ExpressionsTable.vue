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
          <th>Phonétique.</th>
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
            <span class="phonetic-text">{{ item.phonetic || " " }}</span>
          </td>
          <td>
            <span class="translation-text">{{
              truncateText(item.translation_fr, 40) || " "
            }}</span>
          </td>
          <td>
            <span class="translation-text">{{
              truncateText(item.translation_en, 40) || " "
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

<style scoped>
/* Pas de styles redondants ici */
/* Nous utilisons uniquement les classes globales définies dans `global.css`. */
</style>
