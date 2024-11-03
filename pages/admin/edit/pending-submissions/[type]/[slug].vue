<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Modifier la Soumission</h2>
    <form @submit.prevent="submitEdit">
      <div v-if="type === 'word'">
        <!-- Formulaire pour les mots -->
        <label>Singulier</label>
        <input v-model="formData.singular" type="text" required />

        <label>Pluriel</label>
        <input v-model="formData.plural" type="text" />

        <label>Classe Nominale</label>
        <select v-model="formData.class_id">
          <!-- Options de classes nominales -->
          <option
            v-for="cls in nominalClasses"
            :value="cls.class_id"
            :key="cls.class_id"
          >
            {{ cls.class_name }}
          </option>
        </select>

        <label>Phonétique</label>
        <input v-model="formData.phonetic" type="text" />

        <label>Variabilité du Nombre</label>
        <select v-model="formData.number_variability">
          <option value="singular_only">Singulier uniquement</option>
          <option value="plural_only">Pluriel uniquement</option>
          <option value="invariable">Invariable</option>
          <option value="variable">Variable</option>
        </select>
      </div>

      <div v-else-if="type === 'verb'">
        <!-- Formulaire pour les verbes -->
        <label>Nom (Verbe)</label>
        <input v-model="formData.name" type="text" required />

        <label>Racine</label>
        <input v-model="formData.root" type="text" required />

        <label>Suffixe</label>
        <input v-model="formData.suffix" type="text" />

        <label>Phonétique</label>
        <input v-model="formData.phonetic" type="text" />

        <label>Verbe Actif</label>
        <input type="checkbox" v-model="formData.active_verb" />

        <label>Verbe Dérivé</label>
        <input type="checkbox" v-model="formData.derived_verb" />
      </div>

      <button type="submit" class="btn btn-primary mt-3">Enregistrer</button>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
  requiredRole: "admin",
});
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const type = route.params.type;
const slug = route.params.slug;

const formData = ref({});
const nominalClasses = ref([]);

const fetchSubmissionData = async () => {
  // Charger les données spécifiques du mot ou du verbe à modifier
  // API call en fonction du type de soumission
};

onMounted(() => {
  fetchSubmissionData();
});

const submitEdit = async () => {
  // Envoie les modifications au backend pour mise à jour dans les tables `pending_words_submissions` ou `pending_verbs_submissions`
};
</script>

<style scoped>
/* Style du formulaire */
</style>
