<template>
  <div>
    <!-- Si des mots ou verbes sont trouvés -->
    <div v-if="paginatedWords.length" class="table-responsive">
      <table
        class="table table-hover"
        role="table"
        aria-label="Résultats de recherche"
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
            <td>
              <span class="searched-text">{{
                item.type === "word" ? "Mot" : "Verbe"
              }}</span>
            </td>
            <td>
              <span class="searchedExpression">{{ item.singular }}</span>
            </td>
            <td>
              <span class="searchedExpression">{{ item.plural || "-" }}</span>
            </td>
            <td>
              <span class="phonetic-text">{{ item.phonetic || "-" }}</span>
            </td>
            <td>
              <span class="translation-text">{{
                item.translation_fr || "-"
              }}</span>
            </td>
            <td>
              <span class="translation-text">{{
                item.translation_en || "-"
              }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Si aucun mot ou verbe n'est trouvé -->
    <div v-else class="mt-4 text-center">
      <div class="alert alert-info" role="alert">
        Aucun résultat trouvé. Essayez une autre recherche.
      </div>
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

// Fonction pour rediriger vers les détails
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
/* Aucun style redondant ici, tout repose sur le `global.css` */

/* Nous laissons les styles globaux gérer les couleurs, polices, et responsivité */
</style>
