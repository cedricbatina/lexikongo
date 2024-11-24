<template>
  <div v-if="data.length" class="table-responsive mt-4">
    <table
      class="table table-hover"
      role="table"
      aria-label="Résultats de recherche"
    >
      <thead>
        <tr>
          <th scope="col">Type</th>
          <th scope="col">Singulier</th>
          <th scope="col">Pluriel</th>
          <th scope="col">Phonétique</th>
          <th scope="col">Français</th>
          <th scope="col">Anglais</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in data"
          :key="item.slug"
          @click="goToDetails(item.type, item.slug)"
          role="button"
          tabindex="0"
          class="link-row"
        >
          <td>
            <span class="searched-text">{{
              item.type === "word" ? "Mot" : "Verbe"
            }}</span>
          </td>
          <td>
            <span class="searchedExpression">{{ item.singular || " " }}</span>
          </td>
          <td>
            <span class="searchedExpression">{{ item.plural || " " }}</span>
          </td>
          <td>
            <span class="phonetic">{{ item.phonetic || " " }}</span>
          </td>
          <td>
            <span class="translation_fr">{{ item.translation_fr || " " }}</span>
          </td>
          <td>
            <span class="translation_en">{{ item.translation_en || " " }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-else class="alert alert-info mt-4 text-center">
    Aucun résultat trouvé. Essayez une autre recherche.
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const goToDetails = (type, slug) => {
  // Navigation vers la page des détails
  if (slug) {
    window.location.href = `/details/${type}/${slug}`;
  }
};
</script>

<style scoped>
.table {
  width: 100%;
}

.link-row {
  cursor: pointer;
}

.link-row:hover {
  background-color: #f8f9fa; /* Effet hover */
}
</style>
