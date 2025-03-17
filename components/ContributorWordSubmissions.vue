<template>
  <div class="word-submissions">
    <h4 class="section-title">Mes Soumissions de Mots</h4>

    <!-- Tableau des mots approuvés -->
    <div v-if="approvedWords.length > 0" class="submission-list mt-4">
      <h5 class="table-title">Mots Approuvés</h5>
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Singulier</th>
            <th>Pluriel</th>
            <th>Classe Nominale</th>
            <th>Phonétique</th>
            <th>Traduction FR</th>
            <th>Traduction EN</th>
            <th>Date d'Approbation</th>
            <th>Approuvé par</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(submission, index) in approvedWords"
            :key="submission.archived_id"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ submission.singular }}</td>
            <td>{{ submission.plural || "N/A" }}</td>
            <td>{{ submission.nominal_class || "N/A" }}</td>
            <td>{{ submission.phonetic || "N/A" }}</td>
            <td>{{ submission.translation_fr || "Non spécifié" }}</td>
            <td>{{ submission.translation_en || "Not specified" }}</td>
            <td>{{ formatDate(submission.archived_at) }}</td>
            <td>{{ submission.admin_username || "Non spécifié" }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Tableau des mots en attente -->
    <div v-if="pendingWords.length > 0" class="submission-list mt-4">
      <h5 class="table-title">Mots en Attente</h5>
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Singulier</th>
            <th>Pluriel</th>
            <th>Classe Nominale</th>
            <th>Phonétique</th>
            <th>Traduction FR</th>
            <th>Traduction EN</th>
            <th>Date de Soumission</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(submission, index) in pendingWords"
            :key="submission.submission_id"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ submission.singular }}</td>
            <td>{{ submission.plural || "N/A" }}</td>
            <td>{{ submission.nominal_class || "N/A" }}</td>
            <td>{{ submission.phonetic || "N/A" }}</td>
            <td>{{ submission.translation_fr || "Non spécifié" }}</td>
            <td>{{ submission.translation_en || "Not specified" }}</td>
            <td>{{ formatDate(submission.created_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Tableau des mots rejetés -->
    <div v-if="rejectedWords.length > 0" class="submission-list mt-4">
      <h5 class="table-title">Mots Rejetés</h5>
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Singulier</th>
            <th>Plurulier</th>
            <th>Classe Nominale</th>
            <th>Phonétique</th>
            <th>Traduction FR</th>
            <th>Traduction EN</th>
            <th>Date de Rejet</th>
            <th>Raison</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(submission, index) in rejectedWords"
            :key="submission.archived_id"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ submission.singular }}</td>
            <td>{{ submission.plural || "N/A" }}</td>
            <td>{{ submission.nominal_class || "N/A" }}</td>
            <td>{{ submission.phonetic || "N/A" }}</td>
            <td>{{ submission.translation_fr || "Non spécifié" }}</td>
            <td>{{ submission.translation_en || "Not specified" }}</td>
            <td>{{ formatDate(submission.archived_at) }}</td>
            <td>{{ submission.reason || "Non spécifié" }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "~/stores/authStore";

const authStore = useAuthStore();
const approvedWords = ref([]);
const pendingWords = ref([]);
const rejectedWords = ref([]);
const loading = ref(true);

const fetchSubmissions = async () => {
  const userId = authStore.userId;
  try {
    const response = await fetch(`/api/get-submissions-by-user/${userId}`);
    const data = await response.json();

    approvedWords.value = data.archivedWords.filter(
      (item) => item.status === "approved"
    );
    pendingWords.value = data.pendingWords;
    rejectedWords.value = data.archivedWords.filter(
      (item) => item.status === "rejected"
    );
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des soumissions de mots :",
      error
    );
  } finally {
    loading.value = false;
  }
};

onMounted(fetchSubmissions);

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};
</script>



<style scoped>
.user-submissions {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 1.75rem;
  /* font-weight: bold;*/
  margin-bottom: 1rem;
  color: #007bff;
}

.table-title {
  font-size: 1.3rem;
  /*font-weight: bold;*/
  color: #007bff;

  margin-bottom: 10px;
  text-align: center;
}

.table {
  width: 100%;
  margin-top: 10px;
  overflow-x: auto;
  font-size: 0.95rem;
}

.table th,
.table td {
  padding: 12px;
  text-align: left;
  border-color: #e1e4e8;
}

.status {
  font-weight: bold;
  text-transform: capitalize;
}

.status.pending {
  color: #d35400;
}

.status.approved {
  color: #27ae60;
}

.status.rejected {
  color: #c0392b;
}

@media (max-width: 768px) {
  .table,
  .table th,
  .table td {
    font-size: 0.9rem;
  }
}
</style>

