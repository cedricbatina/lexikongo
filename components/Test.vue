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
          <td data-label="Type">
            <span class="searched-word">{{
              item.type === "word" ? "Subst." : "Verb"
            }}</span>
          </td>
          <td data-label="Sing.">
            <span class="searchedExpression">{{ item.singular }}</span>
          </td>
          <td data-label="Plur.">
            <span class="searchedExpression">{{ item.plural || " " }}</span>
          </td>
          <td data-label="Phon.">
            <span class="phonetic">{{ item.phonetic || "-" }}</span>
          </td>
          <td data-label="Fr.">
            <span class="translation_fr">{{
              truncateText(item.translation_fr, 40) || "-"
            }}</span>
          </td>
          <td data-label="En.">
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

const goToDetails = (type, slug) => {
  window.location.href = `/details/${type}/${slug}`;
};

const truncateText = (text, limit) => {
  if (!text) return "-";
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};
</script>

<style scoped>
.table {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

thead th {
  color: #007bff;
  font-weight: bold;
  text-align: center;
  border-bottom: 2px solid #dee2e6;
}

tbody td {
  text-align: center;
  vertical-align: middle;
  padding: 12px;
  border-top: 1px solid #dee2e6;
}

.clickable-row {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.clickable-row:hover {
  background-color: #f1f1f1;
}

.searched-word {
  color: #007bff;
}

.phonetic {
  font-style: italic;
  color: #28a745;
}

.translation_fr,
.translation_en {
  color: #03080d;
  margin-left: 5px;
}

@media (max-width: 768px) {
  tbody td,
  thead th {
    font-size: 0.875rem;
  }
}

@media (max-width: 576px) {
  .table thead {
    display: none;
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
    color: #007bff;
  }
}
</style>
