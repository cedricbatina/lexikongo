<template>
  <div class="colmd-6 col-sm-12">
    <h1>Liste des Verbes</h1>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Racine</th>
          <th>Phonétique</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="verb in verbs" :key="verb.verb_id">
          <td>{{ verb.verb_id }}</td>
          <td>{{ verb.name }}</td>
          <td>{{ verb.root }}</td>
          <td>{{ verb.phonetic }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth", // Cela utilisera ton middleware auth.js pour la page
});

import { ref, onMounted } from "vue";

const verbs = ref([]);

const fetchVerbs = async () => {
  const response = await fetch("/api/all-words-verbs?type=verb");
  verbs.value = await response.json();
};

onMounted(fetchVerbs);
</script>
