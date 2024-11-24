<template>
  <div>
    <div v-if="results.length" class="table-responsive">
      <table
        class="table table-hover"
        role="table"
        aria-label="Résultats de recherche"
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
            v-for="item in results"
            :key="item.slug"
            @click="goToDetails(item.type, item.slug)"
            class="link-row"
          >
            <td>{{ item.type === "word" ? "Mot" : "Verbe" }}</td>
            <td>{{ item.singular }}</td>
            <td>{{ item.plural || " " }}</td>
            <td>{{ item.phonetic || " " }}</td>
            <td>{{ item.translation_fr || " " }}</td>
            <td>{{ item.translation_en || " " }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="alert alert-info mt-4">Aucun résultat trouvé.</div>
  </div>
</template>

<script setup>
const props = defineProps({
  results: Array,
});

const goToDetails = (type, slug) => {
  window.location.href = `/details/${type}/${slug}`;
};
</script>
