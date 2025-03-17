<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-6 col-md-8">
        <div class="card shadow-sm border-0">
          <div class="card-body p-4">
            <h4 class="card-title text-left text-primary mb-4">
              Ajouter un Mot
            </h4>

            <form @submit.prevent="submitForm">
              <!-- Singulier -->
              <div class="mb-3">
                <label for="singular" class="form-label"
                  >Singulier <span class="text-danger">*</span></label
                >
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fas fa-spell-check"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.singular"
                    placeholder="Entrez le mot au singulier"
                    required
                  />
                </div>
              </div>

              <!-- Pluriel -->
              <div class="mb-3">
                <label for="plural" class="form-label">Pluriel</label>
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fas fa-clone"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.plural"
                    placeholder="Entrez le mot au pluriel"
                  />
                </div>
              </div>

              <!-- Phonétique -->
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
                    placeholder="Entrez la phonétique"
                  />
                </div>
              </div>

              <!-- Classe nominale -->
              <div class="mb-3">
                <label for="class_id" class="form-label"
                  >Classe nominale <span class="text-danger">*</span></label
                >
                <select
                  class="form-select"
                  v-model="formData.class_id"
                  required
                >
                  <option value="" disabled>
                    Sélectionnez une classe nominale
                  </option>
                  <option
                    v-for="classItem in nominalClasses"
                    :key="classItem.class_id"
                    :value="classItem.class_id"
                  >
                    {{ classItem.class_name }}
                  </option>
                </select>
              </div>

              <!-- Traduction en Français -->
              <div class="mb-3">
                <label for="translation_fr" class="form-label"
                  >Traduction en Français
                  <span class="text-danger">*</span></label
                >
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fas fa-language"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.translation_fr"
                    placeholder="Entrez la traduction en français"
                    required
                  />
                </div>
              </div>

              <!-- Traduction en Anglais -->
              <div class="mb-3">
                <label for="translation_en" class="form-label"
                  >Traduction en Anglais</label
                >
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="fas fa-globe-americas"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.translation_en"
                    placeholder="Entrez la traduction en anglais"
                  />
                </div>
              </div>

              <!-- Bouton d'ajout -->
              <div class="text-center">
                <button type="submit" class="btn btn-primary btn-lg mt-3 w-100">
                  <i class="fas fa-plus-circle me-2"></i> Ajouter le mot
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification"; // Import Toastification
import { useAuthStore } from "@/stores/authStore";

const toast = useToast(); // Initialise Toastification

// Stockage des classes nominales
const nominalClasses = ref([]);

const formData = ref({
  singular: "",
  plural: "",
  phonetic: "",
  class_id: "", // Classe nominale
  translation_fr: "",
  translation_en: "",
});

// Appel de l'API pour récupérer les classes nominales
const fetchNominalClasses = async () => {
  try {
    const response = await fetch("/api/nominal-classes");
    const data = await response.json();
    nominalClasses.value = data;
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
  const authStore = useAuthStore();
  const userId = authStore.userId;

  if (!userId) {
    toast.error("Erreur : vous devez être connecté pour ajouter un mot.");
    return;
  }

  const newWord = {
    singular: formData.value.singular,
    plural: formData.value.plural,
    phonetic: formData.value.phonetic,
    class_id: formData.value.class_id,
    translations: [
      { language_code: "fr", meaning: formData.value.translation_fr },
      { language_code: "en", meaning: formData.value.translation_en },
    ],
    user_id: userId,
  };

  try {
    const response = await fetch("/api/words", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWord),
    });

    if (response.ok) {
      toast.success("Mot ajouté avec succès !");
      formData.value = {
        singular: "",
        plural: "",
        phonetic: "",
        class_id: "",
        translation_fr: "",
        translation_en: "",
      };
    } else {
      toast.error("Erreur lors de l'ajout du mot.");
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout du mot :", error);
    toast.error("Erreur lors de l'ajout du mot.");
  }
};
</script>


<style scoped>
.container {
  padding-top: 40px;
}

.card {
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 24px;
  color: #007bff;
}

.input-group-text {
  background-color: #f1f1f1;
  border-right: 0;
}

.input-group .form-control {
  border-left: 0;
}

.btn-primary {
  background-color: #ffffff;
  color: #ff8a1d;
  border: none;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #e7e9e7;
}

.alert {
  font-size: 16px;
  margin-bottom: 20px;
}
</style>
