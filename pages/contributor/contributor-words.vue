<template>
  <div>
    <h1>Liste des Mots</h1>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Singulier</th>
          <th>Pluriel</th>
          <th>Classe Nominale</th>
          <th>Phonétique</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="word in words" :key="word.word_id">
          <td>{{ word.word_id }}</td>
          <td>{{ word.singular }}</td>
          <td>{{ word.plural || "-" }}</td>
          <td>{{ word.nominal_class || "-" }}</td>
          <td>{{ word.phonetic }}</td>
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

const words = ref([]);

const fetchWords = async () => {
  const response = await fetch("/api/all-words-verbs?type=word");
  words.value = await response.json();
};

onMounted(fetchWords);
</script>
