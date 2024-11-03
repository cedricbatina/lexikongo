<template>
  <div class="container form-container">
    <div class="card shadow-sm contributor-card">
      <div class="card-body">
        <h5 class="card-title">Soumettre un mot</h5>
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="singular" class="form-label">Mot (singulier)</label>
            <div class="input-group">
              <span class="input-group-text"><i class="fas fa-pen"></i></span>
              <input
                type="text"
                class="form-control"
                v-model="formData.singular"
                required
              />
            </div>
          </div>

          <div class="mb-3">
            <label for="plural" class="form-label">Mot (pluriel)</label>
            <div class="input-group">
              <span class="input-group-text"><i class="fas fa-clone"></i></span>
              <input
                type="text"
                class="form-control"
                v-model="formData.plural"
              />
            </div>
          </div>

          <div class="mb-3">
            <label for="nominalClass" class="form-label">Classe Nominale</label>
            <select
              v-model="formData.nominalClass"
              class="form-select"
              required
            >
              <option disabled value="">Sélectionner une classe</option>
              <option
                v-for="classOption in nominalClasses"
                :key="classOption.class_id"
                :value="classOption.class_id"
              >
                {{ classOption.class_name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="phonetic" class="form-label">Phonétique</label>
            <div class="input-group">
              <span class="input-group-text"
                ><i class="fas fa-volume-up"></i
              ></span>
              <input
                type="text"
                class="form-control"
                v-model="formData.phonetic"
              />
            </div>
          </div>

          <div class="mb-3">
            <label for="translation_fr" class="form-label"
              >Traduction en Français</label
            >
            <div class="input-group">
              <span class="input-group-text"
                ><i class="fas fa-language"></i
              ></span>
              <input
                type="text"
                class="form-control"
                v-model="formData.translation_fr"
                required
              />
            </div>
          </div>

          <div class="mb-3">
            <label for="translation_en" class="form-label"
              >Traduction en Anglais</label
            >
            <div class="input-group">
              <span class="input-group-text"
                ><i class="fas fa-language"></i
              ></span>
              <input
                type="text"
                class="form-control"
                v-model="formData.translation_en"
              />
            </div>
          </div>
          <!-- Nouveau champ : Variabilité du nombre -->
          <div class="mb-3">
            <label for="numberVariability" class="form-label"
              >Variabilité du Nombre</label
            >
            <select v-model="formData.number_variability" class="form-select">
              <option disabled value="">Sélectionner la variabilité</option>
              <option value="singular_only">Singulier uniquement</option>
              <option value="plural_only">Pluriel uniquement</option>
              <option value="invariable">Invariable</option>
              <option value="variable">Variable</option>
            </select>
          </div>

          <!-- Nouveau champ : Mot dérivé -->
          <div class="mb-3">
            <label for="derivedWord" class="form-label"
              >Est-ce un Mot Dérivé ?</label
            >
            <select v-model="formData.derived_word" class="form-select">
              <option value="0">Non</option>
              <option value="1">Oui</option>
            </select>
          </div>

          <!-- Nouveau champ : Mot d'origine (si dérivé) -->
          <div v-if="formData.derived_word == 1" class="mb-3">
            <label for="derivedFromWord" class="form-label"
              >ID du Mot d'Origine</label
            >
            <input
              type="number"
              class="form-control"
              v-model="formData.derived_from_word"
              placeholder="ID du mot d'origine si applicable"
            />
          </div>

          <!-- Nouveau champ : Verbe d'origine (si dérivé) -->
          <div v-if="formData.derived_word == 1" class="mb-3">
            <label for="derivedFromVerb" class="form-label"
              >ID du Verbe d'Origine</label
            >
            <input
              type="number"
              class="form-control"
              v-model="formData.derived_from_verb"
              placeholder="ID du verbe d'origine si applicable"
            />
          </div>

          <button type="submit" class="btn btn-submit">
            <i class="fas fa-paper-plane"></i> Soumettre le mot
          </button>
        </form>

        <!-- Feedback message -->
        <div v-if="message" class="alert mt-3" :class="messageClass">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "~/stores/authStore";

const authStore = useAuthStore();

const formData = ref({
  singular: "",
  plural: "",
  phonetic: "",
  translation_fr: "",
  translation_en: "",
  nominalClass: "",
  number_variability: "variable", // Valeur par défaut
  derived_word: 0, // Valeur par défaut (non dérivé)
  derived_from_word: null,
  derived_from_verb: null,
});

const message = ref("");
const messageClass = ref("");
const nominalClasses = ref([]);

// Fonction pour récupérer les classes nominales
const fetchNominalClasses = async () => {
  try {
    const response = await fetch("/api/nominal-classes");
    nominalClasses.value = await response.json();
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des classes nominales :",
      error
    );
  }
};

onMounted(() => {
  fetchNominalClasses();
});

const submitForm = async () => {
  if (
    !formData.value.singular ||
    !formData.value.translation_fr ||
    !formData.value.nominalClass
  ) {
    message.value =
      "Le mot, la traduction en français et la classe nominale sont obligatoires.";
    messageClass.value = "alert-danger";
    return;
  }

  const userId = authStore.userId;
  if (!userId) {
    message.value = "Veuillez vous connecter pour soumettre un mot.";
    messageClass.value = "alert-danger";
    return;
  }

  const dataToSubmit = {
    singular: formData.value.singular,
    plural: formData.value.plural,
    phonetic: formData.value.phonetic,
    user_id: userId,
    class_id: formData.value.nominalClass,
    number_variability: formData.value.number_variability,
    derived_word: formData.value.derived_word,
    derived_from_word: formData.value.derived_from_word,
    derived_from_verb: formData.value.derived_from_verb,
    translations: [
      { language_code: "fr", meaning: formData.value.translation_fr },
      { language_code: "en", meaning: formData.value.translation_en },
    ],
  };

  try {
    const response = await fetch("/api/words", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSubmit),
    });

    const result = await response.json();

    if (response.ok) {
      message.value = "Mot soumis avec succès, en attente de validation.";
      messageClass.value = "alert-success";
      formData.value = {
        singular: "",
        plural: "",
        phonetic: "",
        translation_fr: "",
        translation_en: "",
        nominalClass: "",
      };
    } else {
      message.value = result.error || "Erreur lors de la soumission du mot.";
      messageClass.value = "alert-danger";
    }
  } catch (error) {
    console.error("Erreur :", error);
    message.value = "Erreur lors de la soumission du mot.";
    messageClass.value = "alert-danger";
  }
};
</script>

<style scoped>
.container {
  max-width: 700px;
  padding: 20px;
}

.contributor-card {
  border-radius: 15px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  padding: 20px;
  background-color: #f9f9f9;
}

.card-title {
  font-size: 28px;
  color: #007bff;
  text-align: center;
  margin-bottom: 1rem;
}

.input-group-text {
  background-color: #e9ecef;
  border-radius: 10px 0 0 10px;
}

.form-control {
  padding: 0.6rem;
}

.btn-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #28a745;
  background-color: transparent;
  color: #28a745;
  font-weight: bold;
  padding: 0.6rem 1.2rem;
  margin-top: 1.5rem;
  transition: all 0.3s ease;
  width: 100%;
  border-radius: 8px;
}

.btn-submit:hover {
  background-color: #28a745;
  color: #fff;
}

.btn-submit i {
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  .btn-submit {
    padding: 0.5rem;
    font-size: 1rem;
  }

  .card-title {
    font-size: 1.8rem;
  }
}
</style>
