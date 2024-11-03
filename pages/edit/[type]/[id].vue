<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10">
        <!-- Formulaire de modification du mot/verbe -->
        <!-- Formulaire de modification du mot/verbe -->
        <div class="card mb-4">
          <div class="card-body">
            <h3 class="card-title text-center">
              Modifier {{ type === "word" ? "Mot" : "Verbe" }}
            </h3>
            <form @submit.prevent="updateItem">
              <!-- Champs spécifiques aux mots -->
              <div v-if="type === 'word'">
                <div class="mb-3">
                  <label for="singular" class="form-label">Singulier</label>
                  <input
                    type="text"
                    v-model="details.singular"
                    class="form-control"
                    id="singular"
                    required
                  />
                </div>

                <div class="mb-3">
                  <label for="plural" class="form-label">Pluriel</label>
                  <input
                    type="text"
                    v-model="details.plural"
                    class="form-control"
                    id="plural"
                  />
                </div>

                <div class="mb-3">
                  <label for="root" class="form-label">Racine</label>
                  <input
                    type="text"
                    v-model="details.root"
                    class="form-control"
                    id="root"
                  />
                </div>

                <div class="mb-3">
                  <label for="derived_from_word" class="form-label">
                    Mot dérivé de (ID)
                  </label>
                  <input
                    type="number"
                    v-model="details.derived_from_word"
                    class="form-control"
                    id="derived_from_word"
                  />
                </div>

                <div class="mb-3">
                  <label for="derived_from_verb" class="form-label">
                    Verbe dérivé de (ID)
                  </label>
                  <input
                    type="number"
                    v-model="details.derived_from_verb"
                    class="form-control"
                    id="derived_from_verb"
                  />
                </div>

                <div class="mb-3">
                  <label for="number_variability" class="form-label">
                    Variabilité du nombre
                  </label>
                  <select
                    v-model="details.number_variability"
                    class="form-select"
                    id="number_variability"
                  >
                    <option value="singular_only">Singulier uniquement</option>
                    <option value="plural_only">Pluriel uniquement</option>
                    <option value="invariable">Invariable</option>
                    <option value="variable">Variable</option>
                  </select>
                </div>

                <div class="mb-3">
                  <label for="class_id" class="form-label"
                    >Classe Nominale</label
                  >
                  <select
                    v-model="details.class_id"
                    class="form-select"
                    id="class_id"
                    required
                  >
                    <option
                      v-for="classe in nominalClasses"
                      :key="classe.class_id"
                      :value="classe.class_id"
                    >
                      {{ classe.class_name }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- Champs spécifiques aux verbes -->
              <div v-if="type === 'verb'">
                <div class="mb-3">
                  <label for="name" class="form-label">Nom du verbe</label>
                  <input
                    type="text"
                    v-model="details.name"
                    class="form-control"
                    id="name"
                    required
                  />
                </div>

                <div class="mb-3">
                  <label for="root" class="form-label">Racine du verbe</label>
                  <input
                    type="text"
                    v-model="details.root"
                    class="form-control"
                    id="root"
                  />
                </div>

                <div class="mb-3">
                  <label for="suffix" class="form-label">Suffixe</label>
                  <input
                    type="text"
                    v-model="details.suffix"
                    class="form-control"
                    id="suffix"
                  />
                </div>

                <div class="mb-3">
                  <label for="derived_from" class="form-label"
                    >Dérivé de (ID)</label
                  >
                  <input
                    type="number"
                    v-model="details.derived_from"
                    class="form-control"
                    id="derived_from"
                  />
                </div>

                <div class="mb-3">
                  <label for="derived_verb_type_id" class="form-label">
                    Type de verbe dérivé
                  </label>
                  <input
                    type="number"
                    v-model="details.derived_verb_type_id"
                    class="form-control"
                    id="derived_verb_type_id"
                  />
                </div>

                <div class="mb-3">
                  <label for="is_approved" class="form-label">Approuvé</label>
                  <select
                    v-model="details.is_approved"
                    class="form-select"
                    id="is_approved"
                  >
                    <option value="1">Oui</option>
                    <option value="0">Non</option>
                  </select>
                </div>
              </div>

              <!-- Champs communs aux mots et verbes -->
              <div class="mb-3">
                <label for="phonetic" class="form-label">Phonétique</label>
                <input
                  type="text"
                  v-model="details.phonetic"
                  class="form-control"
                  id="phonetic"
                />
              </div>

              <button type="submit" class="btn btn-primary">
                Mettre à jour
              </button>
            </form>
          </div>
        </div>

        <!-- Traductions existantes -->
        <div class="card mb-4">
          <div class="card-body">
            <h4>Modifier les traductions existantes</h4>
            <div
              v-for="(translation, index) in details.translations"
              :key="index"
              class="mb-3"
            >
              <form
                @submit.prevent="
                  updateTranslation(translation.id, translation.language_code)
                "
              >
                <div class="d-flex align-items-center">
                  <select
                    v-model="translation.language_code"
                    class="form-select me-2"
                  >
                    <option value="fr">Français</option>
                    <option value="en">Anglais</option>
                  </select>

                  <input
                    type="text"
                    v-model="translation.meaning"
                    class="form-control me-2"
                  />

                  <button type="submit" class="btn btn-primary me-2">
                    Modifier
                  </button>
                  <button
                    @click="deleteTranslation(translation.id)"
                    class="btn btn-danger"
                  >
                    Supprimer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Ajouter une nouvelle traduction -->
        <div class="card mb-4">
          <div class="card-body">
            <h4>Ajouter une nouvelle traduction</h4>
            <form @submit.prevent="addTranslation">
              <div class="mb-3">
                <label for="language" class="form-label">Langue</label>
                <select
                  v-model="newTranslation.language"
                  class="form-select"
                  id="language"
                  required
                >
                  <option value="fr">Français</option>
                  <option value="en">Anglais</option>
                </select>
              </div>

              <div class="mb-3">
                <label for="meaning" class="form-label">Traduction</label>
                <input
                  type="text"
                  v-model="newTranslation.meaning"
                  class="form-control"
                  id="meaning"
                  required
                />
              </div>

              <button type="submit" class="btn btn-success">
                Ajouter la traduction
              </button>
            </form>
          </div>
        </div>

        <!-- Formulaire pour ajouter une nouvelle traduction -->
        <div class="card mb-4">
          <div class="card-body">
            <h4>Ajouter une nouvelle traduction</h4>
            <form @submit.prevent="addTranslation">
              <div class="mb-3">
                <label for="language" class="form-label">Langue</label>
                <select
                  v-model="newTranslation.language"
                  class="form-select"
                  id="language"
                  required
                >
                  <option value="fr">Français</option>
                  <option value="en">Anglais</option>
                </select>
              </div>

              <div class="mb-3">
                <label for="meaning" class="form-label">Traduction</label>
                <input
                  type="text"
                  v-model="newTranslation.meaning"
                  class="form-control"
                  id="meaning"
                  required
                />
              </div>

              <button type="submit" class="btn btn-success">
                Ajouter la traduction
              </button>
            </form>
          </div>
        </div>

        <!-- Liste des traductions existantes -->
        <div class="card">
          <div class="card-body">
            <h4>Modifier les traductions existantes</h4>
            <div
              v-for="(translation, index) in details.translations"
              :key="index"
              class="mb-3"
            >
              <form
                @submit.prevent="
                  updateTranslation(translation.id, translation.language_code)
                "
              >
                <div class="d-flex align-items-center">
                  <select
                    v-model="translation.language_code"
                    class="form-select me-2"
                  >
                    <option value="fr">Français</option>
                    <option value="en">Anglais</option>
                  </select>

                  <input
                    type="text"
                    v-model="translation.meaning"
                    class="form-control me-2"
                  />

                  <button type="submit" class="btn btn-primary me-2">
                    Modifier
                  </button>
                  <button
                    @click="deleteTranslation(translation.id)"
                    class="btn btn-danger"
                  >
                    Supprimer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const type = ref(route.params.type); // Peut être "word" ou "verb"
const id = ref(route.params.id);

const details = ref({
  singular: "",
  plural: "",
  name: "", // Pour les verbes
  root: "", // Pour les verbes ou mots
  phonetic: "",
  class_id: null,
  derived_from_word: null,
  derived_from_verb: null,
  suffix: "", // Pour les verbes
  number_variability: "", // Pour les mots
  derived_from: null, // Pour les verbes
  derived_verb_type_id: null, // Pour les verbes
  is_approved: null, // Pour les verbes
  translations: [],
});
const nominalClasses = ref([]);
const newTranslation = ref({
  language: "fr",
  meaning: "",
});

// Charger les classes nominales depuis l'API
const fetchNominalClasses = async () => {
  try {
    const response = await fetch("/api/nominal-classes");
    const result = await response.json();
    nominalClasses.value = result;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des classes nominales :",
      error
    );
  }
};

// Charger les détails du mot ou du verbe à partir de l'API
const fetchDetails = async () => {
  try {
    const response = await fetch(`/api/details/${type.value}/${id.value}`);
    const result = await response.json();
    details.value = result;
  } catch (error) {
    console.error("Erreur lors de la récupération des détails :", error);
  }
};

// Mettre à jour le mot/verbe dans l'API
// Mettre à jour le mot/verbe dans l'API
// Mettre à jour le mot/verbe dans l'API
const updateItem = async () => {
  try {
    // Vérifier que translations est un tableau valide
    const translations = Array.isArray(details.value.translations)
      ? details.value.translations
      : [];

    // Construire le corps de la requête en fonction du type (mot ou verbe)
    let body;

    if (type.value === "word") {
      // Pour les mots, on inclut des champs spécifiques comme class_id et number_variability
      body = {
        word_id: id.value, // Utiliser word_id pour les mots
        singular: details.value.singular || "", // Ne pas laisser singulier vide
        plural: details.value.plural || "",
        root: details.value.root || "",
        phonetic: details.value.phonetic || "",
        class_id: details.value.class_id || null, // Classe nominale, obligatoire pour les mots
        derived_from_word: details.value.derived_from_word || null,
        derived_from_verb: details.value.derived_from_verb || null,
        number_variability: details.value.number_variability || "variable", // Valeur par défaut si non définie
        translations: translations.map((t) => ({
          language_code: t.language_code,
          meaning: t.meaning,
        })),
      };
    } else if (type.value === "verb") {
      // Pour les verbes, on n'inclut pas class_id ou number_variability
      body = {
        verb_id: id.value, // Utiliser verb_id pour les verbes
        name: details.value.name || "", // Nom du verbe
        root: details.value.root || "", // Racine du verbe
        suffix: details.value.suffix || "", // Suffixe du verbe
        phonetic: details.value.phonetic || "", // Phonétique
        derived_from: details.value.derived_from || null, // Verbe d'origine
        derived_verb_type_id: details.value.derived_verb_type_id || null, // Type de verbe dérivé
        is_approved: details.value.is_approved || 0, // Par défaut, pas approuvé
        translations: translations.map((t) => ({
          language_code: t.language_code,
          meaning: t.meaning,
        })),
      };
    }

    console.log("Données envoyées :", body);

    // Effectuer la requête PUT à l'API pour mettre à jour le mot ou le verbe
    const response = await fetch(`/api/words`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    console.log("Résultat de l'API :", result);

    if (response.ok) {
      alert("Mise à jour réussie !");
      await fetchDetails(); // Recharger les détails après la mise à jour
    } else {
      console.error("Erreur lors de la mise à jour :", result.error);
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
  }
};

// Ajouter une nouvelle traduction
const addTranslation = async () => {
  try {
    const response = await fetch(`/api/add-translation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wordId: id.value, // ou verbId si c'est un verbe
        languageCode: newTranslation.value.language,
        meaning: newTranslation.value.meaning,
      }),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Traduction ajoutée avec succès !");
      await fetchDetails(); // Met à jour les détails après l'ajout de la traduction
    } else {
      console.error("Erreur lors de l'ajout de la traduction :", result.error);
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de la traduction :", error);
  }
};

// Mettre à jour une traduction existante
const updateTranslation = async (translationId, languageCode) => {
  try {
    await fetch(`/api/update-translation/${translationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language_code: languageCode,
        meaning: details.value.translations.find((t) => t.id === translationId)
          .meaning,
      }),
    });
    alert("Traduction mise à jour !");
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la traduction :", error);
  }
};

// Supprimer une traduction existante
const deleteTranslation = async (translationId) => {
  if (!confirm("Êtes-vous sûr de vouloir supprimer cette traduction ?")) return;

  try {
    const response = await fetch(`/api/delete-translation/${translationId}`, {
      method: "DELETE",
    });
    alert("Traduction supprimée !");
    await fetchDetails(); // Recharger les détails après la suppression
  } catch (error) {
    console.error("Erreur lors de la suppression de la traduction :", error);
  }
};

onMounted(() => {
  fetchDetails();
  fetchNominalClasses(); // Récupérer les classes nominales lorsque le composant est monté
});
</script>

<style scoped>
.container {
  margin-top: 30px;
}
.card {
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.card-body {
  padding: 20px;
}
h3,
h4 {
  color: #007bff;
}
button {
  width: 100%;
}
</style>
