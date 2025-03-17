<template>
  <div class="container mt-5">
    <!-- Titre principal -->
    <header class="text-center mb-4">
      <h1 class="display-4 text-primary mb-4 mt-4">
        <i class="fa-solid fa-magnifying-glass me-2" aria-hidden="true"></i>
        Recherche de mots et verbes
      </h1>
      <p class="lead">
        Recherchez des mots et verbes en Kikongo, Français ou Anglais, et découvrez leurs significations.
      </p>
    </header>

    <section class="text-center mb-5">
      <LogoSlogan />
    </section>

    <!-- Structure avec la barre latérale à droite -->
    <div class="row">
      <!-- Contenu principal -->
      <div class="col-lg-9 col-md-8">
        <section class="row justify-content-center mb-4" aria-labelledby="search-section">
          <div class="col-lg-10 col-md-12">
            <div class="card shadow-sm p-4 mb-4">
              <h2 id="search-section" class="card-title text-left text-primary">
                <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i> Recherche
              </h2>
              <SearchingForm @search="handleSearch" />
            </div>
          </div>
        </section>

        <!-- Résultats de recherche -->
        <section v-if="filteredResults.length" class="card shadow-sm p-4 mb-4" aria-labelledby="results-section">
          <SearchingResults :data="filteredResults" :columns="columns" />
        </section>

        <!-- Aucun résultat trouvé -->
        <section v-else-if="searchQuery" class="alert alert-info mt-4 text-center" aria-live="polite">
          Aucun mot ou verbe trouvé pour votre recherche.
        </section>

        <LastExpressionsCount />
        <ActionAppeal />
       <div class="m-3">
         <Partners />
       </div>
      </div>

      <!-- Barre latérale des boutons (tablettes et écrans larges) -->
      <aside class="col-lg-3 col-md-4 d-md-block">
        <div class="card shadow-sm p-4 sidebar-buttons">
          <SearchButtons />
          <ContributorButtons />
          <AdminButtons />
        </div>
      </aside>
    </div>

    <!-- Affichage en colonne sur mobile -->
    <div class="row d-md-none text-center mt-4">
      <div class="col-12 mb-2">
        <SearchButtons />
      </div>
      <div class="col-12 mb-2">
        <ContributorButtons />
      </div>
      <div class="col-12">
        <AdminButtons />
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from "vue";
import { useHead } from "#app";
import LogoSlogan from "@/components/LogoSlogan.vue";
import SearchingForm from "@/components/SearchingForm.vue";
import SearchingResults from "@/components/SearchingResults.vue";
import SearchButtons from "@/components/SearchButtons.vue";
import ContributorButtons from "@/components/ContributorButtons.vue";
import AdminButtons from "@/components/AdminButtons.vue";

const searchQuery = ref(""); // Contient le texte de recherche
const results = ref([]); // Contient les résultats de l'API

// Colonnes pour SearchingResults
const columns = [
  { label: "Type", key: "type" },
  { label: "Singulier", key: "singular" },
  { label: "Pluriel", key: "plural" },
  { label: "Phonétique", key: "phonetic" },
  { label: "Français", key: "translation_fr" },
  { label: "Anglais", key: "translation_en" },
];

// Résultats filtrés pour l'affichage
const filteredResults = computed(() => {
  if (!searchQuery.value) return [];
  return results.value.filter(
    (item) =>
      item.singular.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (item.translation_fr &&
        item.translation_fr
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())) ||
      (item.translation_en &&
        item.translation_en
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()))
  );
});

// Gestion de la recherche
const handleSearch = async ({ query, language, mode }) => {
  searchQuery.value = query; // Mise à jour de la recherche
  try {
    const response = await fetch(
      `/api/all-words-verbs?query=${encodeURIComponent(
        query
      )}&language=${language}&mode=${mode}`
    );
    const data = await response.json();
    results.value = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Erreur lors de la recherche :", error);
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  
  "name": "Recherche de Mots et Verbes en Kikongo | Lexikongo",
  "description": "Recherchez des mots et verbes en Kikongo et découvrez leurs significations en français et anglais. Explorez notre base enrichie de mots et verbes Kikongo, issus de la culture bantoue et du patrimoine Kongo.",
  "url": "https://www.lexikongo.fr/",
  "image": "https://www.lexikongo.fr/images/text_logo@1x.webp",
  "inLanguage": ["fr", "kg", "en"],

  // ✅ **Organisation éditrice**
  "publisher": {
    "@type": "Organization",
    "name": "Lexikongo",
    "url": "https://www.lexikongo.fr",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.lexikongo.fr/images/text_logo@1x.webp",
      "width": 200,
      "height": 200
    }
  },

  // ✅ **Actions utilisateurs (Recherche, Soumission de mots)**
  "potentialAction": [
    {
      "@type": "SearchAction",
      "target": "https://www.lexikongo.fr/?query={search_term_string}&lang={lang}",
      "query-input": ["required name=search_term_string", "optional name=lang"]
    },
    {
      "@type": "Action",
      "name": "Proposer un mot ou un verbe",
      "target": "https://www.lexikongo.fr/contribuer",
      "description": "Ajoutez un nouveau mot ou verbe en Kikongo avec sa traduction et sa définition."
    },
    {
      "@type": "Action",
      "name": "Explorer le lexique complet",
      "target": "https://www.lexikongo.fr/explorer",
      "description": "Parcourez tous les mots et verbes disponibles dans notre lexique Kikongo enrichi."
    }
  ],

  // ✅ **Informations sur la langue Kikongo**
  "about": {
    "@type": "Language",
    "name": "Kikongo",
    "alternateName": ["Kikongo ya Leta", "Kikongo classique"],
    "sameAs": [
      "https://en.wikipedia.org/wiki/Kikongo",
      "https://fr.wikipedia.org/wiki/Kikongo",
      "https://www.ethnologue.com/language/ktu"
    ]
  },

  // ✅ **Ajout d’une section sur le patrimoine linguistique**
  "isPartOf": {
    "@type": "Dataset",
    "name": "Lexique Kikongo",
    "url": "https://www.lexikongo.fr",
    "description": "Un dictionnaire Kikongo-Français-Anglais en ligne pour promouvoir et préserver la langue Kikongo.",
    "license": "https://creativecommons.org/licenses/by-nc/4.0/",
    "keywords": [
      "Kikongo", "Langue Kikongo", "Lexique Kikongo", "Dictionnaire Kikongo",
      "Verbes Kikongo", "Traduction Kikongo", "Langues Bantoues", "Afrique Centrale",
      "Congo", "RDC", "Angola", "Gabon", "Culture Kongo", "Histoire du Kongo",
      "Étymologie Kikongo", "Grammaire Kikongo", "Patrimoine linguistique",
      "Proverbes Kikongo", "Expressions Kikongo", "Noms Kikongo", "Anthroponymie Kongo",
      "Diaspora Africaine", "Afro-descendants", "Esclavage transatlantique",
      "Langues créoles", "Créole haïtien", "Vodou", "Candomblé", "Santería",
      "Kongo dia Ntotela", "Longoka", "Mandombe", "Écriture bantoue",
      "Spiritualité Kongo", "Ngunza", "Kimbanguisme", "Royaume Kongo"
    ]
  },

  // ✅ **Ajout de références culturelles et linguistiques**
  "sameAs": [
    "https://www.britannica.com/topic/Bantu-languages",
    "https://www.ethnologue.com/language/ktu",
    "https://fr.wikipedia.org/wiki/Kikongo",
    "https://en.wikipedia.org/wiki/Kikongo",
    "https://www.sorosoro.org/langues/kikongo/",
    "https://www.unesco.org/languages/bantu",
    "https://www.lexikongo.fr/",
    "https://www.lexikongo.fr/expressions",
    "https://www.longoka.fr/course/apprenez-les-bases-du-kikongo-classique",
    "https://www.longoka.fr/course/apprenez-les-bases-du-lingala",
    "https://www.longoka.fr/course/apprenez-lecriture-natikongo",
    "https://www.longoka.fr/course/apprenez-lecriture-madombe",
    "https://www.longoka.fr/article/pourquoi-apprendre-le-kikongo-classique",
    "https://www.lexikongo.fr/contribute",

  ]
};


const pageTitle = computed(() => "Recherche de Mots et Verbes en Kikongo | Lexique Kikongo");


const pageDescription = computed(() =>
  "Recherchez des mots et verbes en Kikongo et découvrez leurs significations en français et anglais. Explorez notre base enrichie de mots et verbes Kikongo, contribuant à la préservation et à la transmission du patrimoine linguistique Kongo."
);

const canonicalUrl = computed(() => "https://www.lexikongo.fr/");

const imageUrl = computed(() => "https://www.lexikongo.fr/images/text_logo@1x.webp");

const keywords = computed(() =>
  [
    "Kikongo", "langue Kikongo", "lexique Kikongo", "dictionnaire Kikongo",
    "mots Kikongo", "verbes Kikongo", "grammaire Kikongo", "traduction Kikongo",
    "culture Kongo", "patrimoine linguistique", "linguistique africaine",
    "langues bantoues", "préservation linguistique", "Congo", "RDC", "Angola",
    "Gabon", "Cameroun", "Kongo dia Ntotela", "Mbanza Kongo", "lexique africain",
    "Dictionnaire Kikongo-Français-Anglais", "diaspora africaine", "afro-descendants",
    "transmission culturelle", "traditions africaines", "esclavage transatlantique",
    "Brésil", "Rio de Janeiro", "Haïti", "Cuba", "Jamaïque", "Caraïbes", "Guadeloupe",
    "Martinique", "La Réunion", "Mayotte", "Comores", "Madagascar", "Sénégal", "Mali",
    "Côte d'Ivoire", "Togo", "Bénin", "Ghana", "Nigéria", "U.S.A", "Canada", "France",
    "Belgique", "Royaume-Uni", "Espagne", "Portugal", "Pays-Bas", "Afrique du Sud",
    "Namibie", "Mozambique", "Zimbabwe", "lexique bantu", "bantuphones",
    "culture afro-brésilienne", "vodou", "candomblé", "santería", "capoeira",
    "Kongo dia Mpangala", "histoire Kongo", "royaume Kongo", "langues créoles",
    "créole haïtien", "pidgin", "patois", "kimbundu", "lingala", "swahili",
    "longoka", "natikongo", "Mandombe", "écriture bantoue", "études africaines",
    "linguistique comparée", "sociolinguistique", "proverbes Kikongo",
    "expressions Kikongo", "noms Kikongo", "anthroponymie Kongo",
    "toponymie Kongo", "encyclopédie Kongo", "Kikongo en ligne", "ressources linguistiques",
    "étudiants en langues africaines", "histoire africaine", "transmission du patrimoine",
    "plateformes éducatives", "dictionnaire numérique", "lexique en ligne",
    "base de données linguistique", "étymologie Kikongo", "phonétique Kikongo",
    "lexicographie Kikongo", "orthographe Kikongo", "Kikongo moderne", "Kikongo classique",
    "Ngunza", "Ngunzisme", "Kimbanguisme", "Église Kimbanguiste", "Simon Kimbangu",
    "prophètes Kongo", "Bunzi", "Lemba", "culte Minkisi", "Minkisi", "Nkisi", "bilongo",
    "Bakongo", "Masengo", "Makaba", "Tadi dia Bukôngo", "spiritualité bantoue",
    "Kongo cosmologie", "rites initiatiques Kongo", "Kimpasi", "traditions Kongo",
    "enseignement des langues africaines", "African studies", "études postcoloniales",
    "histoire postcoloniale", "plateformes éducatives"
  ].join(", ")
);

watchEffect(() => {
  useHead({
    title: pageTitle.value,
    meta: [
      { name: "description", content: pageDescription.value },
      { name: "keywords", content: keywords.value },
      { name: "author", content: "Lexikongo" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#007bff" }, // ✅ **Optimisation mobile**
      { name: "application-name", content: "Lexikongo" }, // ✅ **Renforcement de l’identité du site**

      // ✅ **Optimisation Open Graph**
      { property: "og:title", content: pageTitle.value },
      { property: "og:description", content: pageDescription.value },
      { property: "og:image", content: imageUrl.value },
      { property: "og:url", content: canonicalUrl.value },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Lexikongo" }, // ✅ **Renforcement de l’identité du site**
      { property: "og:locale", content: "fr_FR" }, // ✅ **Langue principale**
     // { property: "og:updated_time", content: lastUpdated.value }, // ✅ **Mise à jour du contenu**

      // ✅ **Twitter Cards**
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: pageTitle.value },
      { name: "twitter:description", content: pageDescription.value },
      { name: "twitter:image", content: imageUrl.value },
      { name: "twitter:site", content: "@Lexikongo" }, // ✅ **Renforcement Twitter**
      { name: "twitter:creator", content: "@Lexikongo" }, // ✅ **Lien Twitter du créateur**

      // ✅ **Accessibilité et IA**
      { name: "voice-assistant", content: "enabled" },
      { name: "ai-compatible", content: "true" }
    ],
    link: [
      { rel: "canonical", href: canonicalUrl.value },
      { rel: "alternate", hreflang: "en", href: "https://www.lexikongo.fr/en/" },
      { rel: "alternate", hreflang: "fr", href: "https://www.lexikongo.fr/" },
      { rel: "apple-touch-icon", href: "https://www.lexikongo.fr/images/icon@2x.png" } // ✅ **Optimisation Apple**
    ],
      script: [
    {
      type: "application/ld+json",
      children: JSON.stringify(jsonLd),
    },
  ],
  });
});
</script>


<style scoped>
/* Variables CSS pour les couleurs */
:root {
  --primary-color: #007bff;
  --hover-primary: #0056b3;
  --secondary-color: #a52a2a;
  --dark-color: #2a0600;
  --highlight-color: #28a745;
  --text-default: #03080d;
  --third-color: #ff4500;
}

/* Harmonisation des couleurs avec admin/index.vue */
.card-title {
  font-size: 1.25rem;
  color: var(
    --primary-color
  ); /* Utilisation de la variable CSS pour la couleur */
}

/* Alertes et messages */
.alert {
  font-size: 1rem;
  text-align: center;
}

/* Espacement entre les cartes */
.card {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Ajustement de la barre latérale sur grands écrans */
.sidebar-buttons {
  position: sticky;
  top: 100px; /* Garde la section visible en scroll */
  z-index: 10;
}

.sidebar-buttons {
  position: sticky;
  top: 100px;
  z-index: 10;
  background: white;
  max-height: calc(100vh - 120px); /* Évite le débordement */
  overflow-y: auto;
}

@media (max-width: 767px) {
    .sidebar-buttons {
    position: static;
    max-height: none;
  }
}

/* Responsivité */
@media (max-width: 768px) {
  .card-title {
    font-size: 1.15rem; /* Taille réduite des titres pour tablettes */
  }

  h2 {
    font-size: 2rem; /* Taille réduite du titre principal sur tablettes */
  }
  .lead {
    font-size: 1rem; /* Réduction du texte principal pour tablettes */
  }
}

@media (max-width: 576px) {
  .card-title {
    font-size: 1rem; /* Taille réduite des titres pour mobiles */
  }
  h2 {
    font-size: 1.75rem; /* Taille du titre principal pour mobiles */
  }
  .lead {
    font-size: 0.875rem; /* Réduction du texte principal pour mobiles */
  }
}
</style>
