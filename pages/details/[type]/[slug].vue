<template>
  <div class="container mt-5">
    <div class="row">
        <!-- Titre principal -->
    <header class="text-center mb-4">
      <h1 class="display-4 text-primary mb-4 mt-4" aria-hidden="true">
        <i class="fa-solid fa-sheet-plastic me-2" aria-hidden="true"></i>
     {{ type === "word" ? "Fiche du Mot" : "Fiche du Verbe" }}
      </h1>
 <p class="lead">
  Découvrez la fiche détaillée du {{ type === "word" ? "mot" : "verbe" }} 
  <span v-if="type === 'verb' " class=""> {{ details.name }} </span> 
  <span v-else class=""> {{ details.singular }} </span> en Kikongo, avec sa signification en français et en anglais. 
  Apprenez-en plus sur sa prononciation, son usage et ses synonymes.
</p>

    </header>

    <section class="text-center mb-5">
      <LogoSlogan />
    </section>
      <!-- Contenu principal -->
      <div class="col-lg-9">
        <div class="card shadow-sm border-0">
          <div class="card-body p-4">
            <h2 class="card-title text-primary mb-4">
              <i class="fas fa-info-circle me-2"></i>
              {{ type === "word" ? "Détails du Mot" : "Détails du Verbe" }}
            </h2>

            <ul class="list-group list-group-flush">
              <!-- Affichage des détails spécifiques pour les mots -->
              <template v-if="type === 'word'">
                <li class="list-group-item">
                  <i class="fas fa-font me-3"></i>
                  <strong>Singulier :</strong>
                  <span class="searchedExpression">{{ details.singular }}</span>
                </li>
                <li v-if="details.plural" class="list-group-item">
                  <i class="fas fa-spell-check me-3"></i>
                  <strong>Pluriel :</strong>
                  <span class="searchedExpression">{{ details.plural }}</span>
                </li>
                <li v-if="details.nominal_class" class="list-group-item">
                  <i class="fas fa-layer-group me-3"></i>
                  <strong>Classe nominale :</strong>
                  <span class="text-primary">{{ details.nominal_class }}</span>
                </li>
                   <li v-if="details.root" class="list-group-item">
                  <i class="fas fa-layer-group me-3"></i>
                  <strong>Racine :</strong>
                  <span class="text-primary">{{ details.root }}</span>
                </li>
              </template>

              <!-- Affichage des détails spécifiques pour les verbes -->
              <template v-if="type === 'verb'">
                <li class="list-group-item">
                  <i class="fas fa-font me-3"></i>
                  <strong>Infinitif:</strong>
                 ku <span class="searchedExpression">{{ details.name }}</span>
                </li>
                <li v-if="details.root" class="list-group-item">
                  <i class="fas fa-tree me-3"></i>
                  <strong>Racine :</strong>
                  <span>{{ details.root }}</span>
                </li>
                <li v-if="details.suffix" class="list-group-item">
                  <i class="fas fa-file-alt me-3"></i>
                  <strong>Suffixe :</strong>
                  <span>{{ details.suffix }}</span>
                </li>
              </template>

              <!-- Champs communs -->
              <li class="list-group-item">
                <i class="fas fa-volume-up me-3"></i>
                <strong>Phonétique :</strong>
                <span class="phonetic">{{ details.phonetic || "N/A" }}</span>
              </li>
              <li class="list-group-item">
                <i class="fas fa-language me-3"></i>
                <strong>Traduction FR :</strong>
                <span class="translation_fr">{{
                  details.translation_fr || "N/A"
                }}</span>
              </li>
              <li class="list-group-item">
                <i class="fas fa-language me-3"></i>
                <strong>Traduction EN :</strong>
                <span class="translation_en">{{
                  details.translation_en || "N/A"
                }}</span>
              </li>
              <li class="list-group-item">
                <i class="fas fa-user me-3"></i>
                <strong>Auteur :</strong>
                {{ details.author || "Auteur Inconnu" }}
              </li>
            <!--  <li class="list-group-item">
                <i class="fas fa-calendar-alt me-3"></i>
                <strong>Date de création :</strong>
                <span>{{ formatDate(details.created_at) }}</span>
              </li>-->
            </ul>
          </div>
        </div>

        <!-- Boutons vers les pages de recherche -->
        <div class="text-center mt-4">
          <!-- ✅ Correction : Vérifie que `slug` est bien défini -->
<nuxt-link
  v-if="authStore.userRole.includes('admin') && slug"
  :to="`/edit/${type}/${route.params.slug}`"
  class="btn btn-outline-warning m-2" 
>
  <i class="fas fa-edit me-1"></i> Modifier
</nuxt-link>

     
        </div>
      </div>

      <!-- Barre latérale pour boutons -->
      <aside class="col-lg-3 order-lg-2 order-md-last mt-4 mt-lg-0">
        <div class="card shadow-sm p-4 sidebar-buttons">
       
          <SearchButtons />
          <ContributorButtons />
          <AdminButtons />
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useHead } from "@vueuse/head";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const type = route.params.type;
const slug = route.params.slug;
const details = ref({});

// ✅ **Ajout d’un computed pour éviter `undefined` dans les titres**
const pageTitle = computed(() =>
  details.value.singular || details.value.name
    ? `${details.value.singular || details.value.name} | Fiche du ${type === "word" ? "Mot" : "Verbe"} en Kikongo`
    : "Lexique Kikongo - Langue et Culture"
);

const pageDescription = computed(() =>
  details.value.singular || details.value.name
    ? `Découvrez la fiche détaillée du ${type === "word" ? "mot" : "verbe"} "${details.value.singular || details.value.name}" en Kikongo. Signification, prononciation, usage et synonymes en français et en anglais.`
    : "Explorez le lexique Kikongo et approfondissez votre connaissance de cette langue bantoue."
);

const canonicalUrl = computed(() =>
  `https://lexikongo.fr/details/${type}/${slug}`
);
const jsonLd = computed(() => ({
  "@context": "https://schema.org",
  "@type": type === "word"
    ? ["DefinedTerm", "GlossaryTerm", "LinguisticExpression", "Thing", "CreativeWork", "EducationalContent", "DictionaryEntry", "LexicalEntry"]
    : ["Verb", "Action", "LinguisticExpression", "Thing", "CreativeWork", "EducationalContent", "LexicalEntry"],

  "name": details.value.singular || details.value.name,
  "description": `Découvrez la signification du ${type === "word" ? "mot" : "verbe"} "${details.value.singular || details.value.name}" en Kikongo, avec sa traduction en français et en anglais.`,
  "inLanguage": "kg",

  // ✅ **Ajout du champ lexical**
  "lexicalCategory": type === "word" ? "Noun" : "Verb",

  // ✅ **Ajout des mots-clés SEO**
  "keywords": [
    "Kikongo", "Dictionnaire Kikongo", "Lexique Kikongo",
    "Traduction Kikongo", "Langues bantoues", "Afrique Centrale",
    type === "word" ? "Nom Kikongo" : "Verbe Kikongo",
    details.value.singular || details.value.name,
    details.value.translation_fr || "",
    details.value.translation_en || ""
  ].filter(Boolean).join(", "),

  // ✅ **Auteur du mot**
  "author": {
    "@type": "Person",
    "name": details.value.author || "Inconnu",
    "url": details.value.author ? `https://www.lexikongo.fr/contributeurs/${details.value.author}` : undefined
  },

  // ✅ **Dates**
  "dateCreated": details.value.created_at,
  "dateModified": details.value.updated_at || details.value.created_at,

  // ✅ **URL Canonique**
  "url": `https://lexikongo.fr/details/${type}/${details.value.slug}`,

  // ✅ **Ajout de la famille linguistique**
  "languageFamily": {
    "@type": "Language",
    "name": "Langues Bantoues",
    "url": "https://en.wikipedia.org/wiki/Bantu_languages"
  },

  // ✅ **Intégration dans le Dataset**
  "isPartOf": {
    "@type": "Dataset",
    "name": "Lexique Kikongo",
    "url": "https://lexikongo.fr",
    "description": "Base de données complète du lexique Kikongo avec traductions en français et anglais.",
    "license": "https://creativecommons.org/licenses/by-nc/4.0/",
    "keywords": ["Kikongo", "Lexique", "Traduction", "Langues africaines", "Dictionnaire"],
    "creator": {
      "@type": "Organization",
      "name": "Lexikongo",
      "url": "https://lexikongo.fr"
    }
  },

  // ✅ **Sources de confiance**
  "sameAs": [
    "https://en.wikipedia.org/wiki/Kikongo",
    "https://fr.wikipedia.org/wiki/Kikongo",
    "https://www.britannica.com/topic/Bantu-languages",
    "https://www.ethnologue.com/language/ktu",
    `https://lexikongo.fr/details/${type}/${details.value.slug}`,
    details.value.author ? `https://www.lexikongo.fr/contributeurs/${details.value.author}` : undefined
  ].filter(Boolean),

  // ✅ **Ajout des traductions**
  "translation": [
    ...(details.value.translation_fr ? [{
      "@type": "Translation",
      "language": "fr",
      "translationOf": details.value.singular || details.value.name,
      "text": details.value.translation_fr
    }] : []),
    ...(details.value.translation_en ? [{
      "@type": "Translation",
      "language": "en",
      "translationOf": details.value.singular || details.value.name,
      "text": details.value.translation_en
    }] : [])
  ],

  // ✅ **Ajout des mots et verbes ayant la même racine (root)**
  ...(details.value.root ? {
    "relatedTerms": {
      "@type": "DefinedTermSet",
      "name": `Mots et verbes dérivés de "${details.value.root}"`,
      "description": `Liste des mots et verbes en Kikongo partageant la racine "${details.value.root}".`,
      "hasDefinedTerm": [
        {
          "@type": type === "word" ? "DefinedTerm" : "Verb",
          "name": details.value.singular || details.value.name,
          "url": `https://lexikongo.fr/details/${type}/${details.value.slug}`,
          "inLanguage": "kg"
        }
      ]
    }
  } : {}),

  // ✅ **Ajout d’un contributeur si ce mot a été ajouté par un utilisateur**
  ...(details.value.author ? {
    "contributor": {
      "@type": "Person",
      "name": details.value.author,
      "url": `https://www.lexikongo.fr/contribute`
    }
  } : {}),

  // ✅ **Ajout de l’action pour la recherche**
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://lexikongo.fr/",
    "query-input": "required name=search_term_string"
  },

  // ✅ **Ajout de la catégorie linguistique**
  "subjectOf": {
    "@type": "EducationalAudience",
    "educationalRole": "Student",
    "audienceType": ["Learner", "Linguist", "Researcher"]
  }
}));


watchEffect(() => {
  if (details.value && (details.value.singular || details.value.name)) {
   // ✅ **Metadonnées SEO améliorées**
useHead({
  title: pageTitle.value ,
  meta: [
    { name: "description", content: pageDescription },
 { 
  name: "keywords", 
  content: [
    "Kikongo", "langue Kikongo", "lexique Kikongo", "dictionnaire Kikongo", 
    "mots Kikongo", "verbes Kikongo", "traduction Kikongo", "grammaire Kikongo", 
    "patrimoine linguistique", "linguistique africaine", "langues bantoues", 
    "Afrique Centrale", "Congo", "RDC", "Angola", "Gabon", "Cameroun", 
    "préservation linguistique", "transmission culturelle", "diaspora africaine", 
    "afro-descendants", "Kongo dia Ntotela", "Mbanza Kongo", "Royaume Kongo", 
    "traditions africaines", "histoire du Kongo", "langues africaines", 
    "linguistique historique", "sociolinguistique", "étymologie Kikongo", 
    "phonétique Kikongo", "lexicographie Kikongo", "orthographe Kikongo", 
    "proverbes Kikongo", "expressions Kikongo", "noms Kikongo", 
    "anthroponymie Kikongo", "toponymie Kongo", "encyclopédie Kongo", 
    "langues en danger", "enseignement des langues africaines", 
    "plateformes éducatives", "dictionnaire numérique", "lexique en ligne", 
    "base de données linguistique", "africanistes", "études africaines", 
    "histoire coloniale", "linguistes", "chercheurs en langues africaines", 

    // 🌍 **Mots-clés liés à la diaspora et aux langues créoles**
    "diaspora africaine", "esclavage transatlantique", "langues créoles", 
    "créole haïtien", "pidgin", "patois", "capoeira", "candomblé", "santería", 
    "longoka", "natikongo", "Mandombe", "écriture bantoue", "cuba", "brésil", 
    "haïti", "rio de janeiro", "jamaïque", "guadeloupe", "martinique", 
    "caraïbes", "réunion", "mayotte", "comores", "madagascar", "sénégal", 
    "mali", "côte d'ivoire", "togo", "bénin", "ghana", "nigéria", "u.s.a", 
    "canada", "france", "belgique", "royaume-uni", "espagne", "portugal", 
    "pays-bas", "afrique du sud", "namibie", "mozambique", "zimbabwe", 

    // 🏛 **Musées et centres culturels Kongo**
    "Musée Royal de l’Afrique Centrale", "Institut des Musées Nationaux du Congo", 
    "Musée National de Kinshasa", "Musée Mbanza Kongo", "Mémorial Kongo Dia Ntotela", 
    "Musée de l’Homme Paris", "Musée du Quai Branly", "Smithsonian National Museum of African Art", 
    "British Museum African Collections", "Musée Afro-Brésilien de Salvador", 
    "Maison des Esclaves de Gorée", "Musée de Dakar", "Institut Fondamental d’Afrique Noire", 
    "Centre International des Civilisations Bantu", "CICIBA", "Archives Coloniales Belges", 
    "Archives Nationales du Congo", "Fondation Mémorial de l’Esclavage", 

    // ✨ **Spiritualité et religions Kongo**
    "Ngunza", "Ngunzisme", "Kimbanguisme", "Église Kimbanguiste", "Kimpa Vita", "Cheick Anta Diop", "Kimuntu",
    "Simon Kimbangu", "prophètes Kongo", "Bunzi", "Lemba", "culte Minkisi", 
    "Minkisi", "Nkisi", "bilongo", "Bakongo", "Masengo", "Makaba", 
    "Tadi dia Bukôngo", "initiation Kongo", "spiritualité bantoue", 
    "Kongo cosmologie", "ancêtres Kongo", "rites initiatiques Kongo", 
    "Kimpasi", "traditions Kongo", "mythologie Kongo", "Simbi", 
    "Mpanzu a Nzinga", "Mbongi", "conseil des anciens Kongo", "Ngolo", 
    "Ne Kongo", "Nzambi a Mpungu", "Nzambi Mpungu Tulendo", "Maziba", 
    "Tambula", "Yaya", "Manikongo", "Nganga Kongo",

    // 🆕 **Mots dynamiques basés sur le mot ou verbe affiché**
    details.value.singular || details.value.name,
    details.value.translation_fr || "",
    details.value.translation_en || ""
  ].filter(Boolean).join(", ") // 🔥 Supprime les valeurs vides pour éviter les erreurs
}
,
    { name: "author", content: details.value.author || "Lexikongo" },
    { name: "robots", content: "index, follow" },
    
    { property: "og:type", content: "article" },
    { property: "og:title", content: pageTitle.value },
    { property: "og:description", content: pageDescription.value },
    { property: "og:url", content: canonicalUrl.value },
    { property: "og:image", content: "https://www.lexikongo.fr/images/lexikongo_logo@2x.png" },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: pageTitle.value },
    { name: "twitter:description", content: pageDescription.value },
    { name: "twitter:image", content: "https://www.lexikongo.fr/images/lexikongo_logo@2x.png" },

    { name: "voice-assistant", content: "enabled" },
    { name: "ai-compatible", content: "true" }
  ],
  link: [
    { rel: "canonical", href: canonicalUrl.value },
    { rel: "alternate", hreflang: "en", href: `https://lexikongo.fr/en/details/${type}/${slug}` },
    { rel: "alternate", hreflang: "fr", href: `https://lexikongo.fr/details/${type}/${slug}` }
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify(jsonLd.value)
    }
  ]
});
  } else {
    pageTitle.value = "Lexique Kikongo - Langue et Culture"; // Titre par défaut si les données ne sont pas encore chargées
    pageDescription.value = "Découvrez le lexique du Kikongo, ses mots et verbes traduits en français et en anglais.";
    canonicalUrl.value = "https://lexikongo.fr/";
  }
});


// ✅ **Récupération des détails**
const fetchDetails = async () => {
  try {
    const response = await fetch(`/api/details/${type}/${slug}`);
    const result = await response.json();
    details.value = result;
  } catch (error) {
    console.error("Erreur lors de la récupération des détails :", error);
  }
};

onMounted(fetchDetails);

</script>

<style scoped>
.card {
  border-radius: 10px;
  box-shadow: var(--box-shadow-default);
}

.card-title {
  font-size: var(--font-lg);
}

.list-group-item {
  border: none;
  font-size: var(--font-md);
}

@media (max-width: 576px) {
  .card-title {
    font-size: var(--font-md);
  }

  .list-group-item {
    font-size: var(--font-sm);
  }
}
</style>
