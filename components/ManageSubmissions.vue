<template>
  <div class="container mt-5">
    <h1 class="text-primary text-center">Gestion des Soumissions</h1>

    <!-- Message de confirmation -->
    <div v-if="message" class="alert mt-3 text-center" :class="messageClass">
      {{ message }}
    </div>

    <!-- Tableau pour les mots -->
    <div v-if="wordSubmissions.length > 0" class="submission-list mt-4">
      <h3 class="text-center">Soumissions de Mots</h3>
      <table class="table table-responsive table-bordered table-hover">
        <thead class="thead-light">
          <tr>
            <th>#</th>
            <th>Singulier</th>
            <th>Pluriel</th>
            <th>Classe Nominale</th>
            <th>Phonétique</th>
            <th>Traduction FR</th>
            <th>Traduction EN</th>
            <th>Soumis par</th>
            <th>Date de soumission</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(submission, index) in wordSubmissions"
            :key="submission.submission_id"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ submission.singular }}</td>
            <td>{{ submission.plural || "N/A" }}</td>
            <td>{{ submission.nominal_class || "N/A" }}</td>
            <td>{{ submission.phonetic || "N/A" }}</td>
            <td>
              {{ getTranslation(submission.translations, "fr") || "N/A" }}
            </td>
            <td>
              {{ getTranslation(submission.translations, "en") || "N/A" }}
            </td>
            <td>{{ submission.username || "Non spécifié" }}</td>
            <td>{{ formatDate(submission.created_at) }}</td>
            <td class="actions">
              <button
                class="btn btn-success btn-sm"
                @click="
                  handleAction(submission.submission_id, 'word', 'approve')
                "
              >
                <i class="fas fa-check me-2"></i> Approuver
              </button>
              <button
                class="btn btn-danger btn-sm ms-2"
                @click="navigateToWordRejection(submission.submission_id)"
              >
                <i class="fas fa-times me-2"></i> Rejeter
              </button>
              <button
                class="btn btn-warning btn-sm ms-2"
                @click="navigateToWordEdit(submission.submission_id)"
              >
                <i class="fas fa-edit me-2"></i> Modifier
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Tableau pour les verbes -->
    <div v-if="verbSubmissions.length > 0" class="submission-list mt-4">
      <h3 class="text-center">Soumissions de Verbes</h3>
      <table class="table table-responsive table-bordered table-hover">
        <thead class="thead-light">
          <tr>
            <th>#</th>
            <th>Nom (Verbe)</th>
            <th>Racine</th>
            <th>Suffixe</th>
            <th>Phonétique</th>
            <th>Traduction FR</th>
            <th>Traduction EN</th>
            <th>Soumis par</th>
            <th>Date de soumission</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(submission, index) in verbSubmissions"
            :key="submission.submission_id"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ submission.name }}</td>
            <td>{{ submission.root || "N/A" }}</td>
            <td>{{ submission.suffix || "N/A" }}</td>
            <td>{{ submission.phonetic || "N/A" }}</td>
            <td>
              {{ getTranslation(submission.translations, "fr") || "N/A" }}
            </td>
            <td>
              {{ getTranslation(submission.translations, "en") || "N/A" }}
            </td>
            <td>{{ submission.username || "Non spécifié" }}</td>
            <td>{{ formatDate(submission.created_at) }}</td>
            <td class="actions">
              <button
                class="btn btn-success btn-sm"
                @click="
                  handleAction(submission.submission_id, 'verb', 'approve')
                "
              >
                <i class="fas fa-check me-2"></i> Approuver
              </button>
              <button
                class="btn btn-danger btn-sm ms-2"
                @click="navigateToVerbRejection(submission.submission_id)"
              >
                <i class="fas fa-times me-2"></i> Rejeter
              </button>
              <button
                class="btn btn-warning btn-sm ms-2"
                @click="navigateToVerbEdit(submission.submission_id)"
              >
                <i class="fas fa-edit me-2"></i> Modifier
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/authStore";

const router = useRouter();
const authStore = useAuthStore();
const wordSubmissions = ref([]);
const verbSubmissions = ref([]);
const message = ref("");
const messageClass = ref("");

// Récupération des soumissions de mots uniquement
const fetchWords = async () => {
  try {
    const response = await fetch("/api/get-submissions");
    const data = await response.json();
    wordSubmissions.value = data.wordSubmissions || [];
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des soumissions de mots :",
      error
    );
  }
};

// Récupération des soumissions de verbes uniquement
const fetchVerbs = async () => {
  try {
    const response = await fetch("/api/get-submissions");
    const data = await response.json();
    verbSubmissions.value = data.verbSubmissions || [];
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des soumissions de verbes :",
      error
    );
  }
};

// Formater la date pour affichage
const formatDate = (dateStr) => new Date(dateStr).toLocaleString();

// Récupérer la traduction spécifique par langue
const getTranslation = (translations, languageCode) => {
  const meanings = translations
    .filter((t) => t.language_code === languageCode)
    .map((t) => t.meaning);
  return meanings.length ? meanings.join(", ") : "N/A";
};

// Fonction de gestion des actions (approbation, rejet)
const handleAction = async (submissionId, type, action) => {
  try {
    const response = await fetch("/api/manage-submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        submission_id: submissionId,
        action,
        content_type: type,
        user_id: authStore.userId,
      }),
    });
    const result = await response.json();
    if (response.ok) {
      message.value = result.message;
      messageClass.value =
        action === "approve" ? "alert-success" : "alert-danger";
      await refreshSubmissions();
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    message.value = error.message || "Une erreur est survenue.";
    messageClass.value = "alert-danger";
  } finally {
    setTimeout(() => {
      message.value = "";
    }, 3000);
  }
};

// Actualiser les soumissions après une action
const refreshSubmissions = async () => {
  await fetchWords();
  await fetchVerbs();
};
// Fonction générale pour naviguer vers les pages d'administration
const navigateToSlug = (submissionId, submissions, action, type) => {
  const slug = getSlug(submissionId, submissions);
  if (slug) {
    // Assurez-vous que l'URL correspond bien à la route de la page d'administration
    router.push(`/admin/${action}/pending-${type}-submission/${slug}`);
  } else {
    console.error("Slug non trouvé pour la soumission :", submissionId);
  }
};

// Redirections pour chaque action et type
const navigateToWordRejection = (submissionId) =>
  navigateToSlug(submissionId, wordSubmissions.value, "delete", "word");
const navigateToVerbRejection = (submissionId) =>
  navigateToSlug(submissionId, verbSubmissions.value, "delete", "verb");
const navigateToWordEdit = (submissionId) =>
  navigateToSlug(submissionId, wordSubmissions.value, "edit", "word");
const navigateToVerbEdit = (submissionId) =>
  navigateToSlug(submissionId, verbSubmissions.value, "edit", "verb");

// Récupérer le slug pour une soumission donnée
const getSlug = (submissionId, submissions) => {
  const submission = submissions.find(
    (sub) => sub.submission_id === submissionId
  );
  return submission?.slug || null;
};

onMounted(() => {
  fetchWords();
  fetchVerbs();
});
</script>



<style scoped>
.container {
  max-width: 1200px;
}
h1 {
  font-size: 2rem;
  font-weight: 600;
}
.table {
  margin-top: 20px;
  font-size: 1rem;
}
.actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.table-responsive {
  overflow-x: auto;
}
.btn {
  padding: 0.4rem 0.8rem;
  font-weight: 600;
}
.alert {
  margin-top: 20px;
  font-weight: 500;
}
@media (max-width: 768px) {
  .btn {
    padding: 0.4rem;
    font-size: 0.9rem;
  }
  h1 {
    font-size: 1.5rem;
  }
}
</style>


<style scoped>
.container {
  max-width: 1200px;
}

h1 {
  font-size: 2rem;
  font-weight: 600;
}

.table {
  margin-top: 20px;
  font-size: 1rem;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.table-responsive {
  overflow-x: auto;
}

.btn {
  padding: 0.4rem 0.8rem;
  font-weight: 600;
}

.alert {
  margin-top: 20px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .btn {
    padding: 0.4rem;
    font-size: 0.9rem;
  }

  h1 {
    font-size: 1.5rem;
  }
}
</style>


