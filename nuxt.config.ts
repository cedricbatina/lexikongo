// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  runtimeConfig: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,

    paypalKey: process.env.PAYPAL_KEY, // Clé publique PayPal


    public: {
      baseUrl: process.env.BASE_URL,
      stripeKey: process.env.STRIPE_PUBLIC_KEY || "",
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
    },
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  app: {
    head: {
      title: "Dictionnaire Kikongo, Français & Anglais | Lexique Kikongo ",
      meta: [
        // ✅ **Description optimisée**
        { name: "description", content: "Lexique Kikongo en ligne - Découvrez et apprenez le vocabulaire Kikongo avec sa traduction en français et en anglais. Une ressource culturelle et linguistique précieuse dédiée à la préservation du patrimoine Kongo." },

        // ✅ **Mots-clés SEO améliorés**
        {
          name: "keywords",
          content: "Kikongo, langue Kikongo, lexique Kikongo, dictionnaire Kikongo, vocabulaire Kikongo, mots Kikongo, verbes Kikongo, grammaire Kikongo, conjugaison Kikongo, traduction Kikongo, culture Kongo, patrimoine linguistique, linguistique africaine, langues bantoues, langues africaines, préservation linguistique, Congo, RDC, Angola, Gabon, Cameroun, Tchad, République Centrafricaine, Kongo dia Ntotela, Mbanza Kongo, lexique africain, Dictionnaire Kikongo-Français-Anglais, apprentissage Kikongo, études linguistiques, africanisme, african studies, diaspora africaine, afro-descendants, transmission culturelle, traditions africaines, esclavage transatlantique, traite négrière, culture afro-brésilienne, Brésil, Rio de Janeiro, Haïti, Cuba, Jamaïque, Caraïbes, Guadeloupe, Martinique, La Réunion, Mayotte, Comores, Zanzibar, Madagascar, Sénégal, Mali, Côte d'Ivoire, Burkina Faso, Togo, Bénin, Ghana, Nigéria, Guinée, Soudan, Éthiopie, Kenya, Afrique du Sud, Namibie, Mozambique, Zimbabwe, lexique bantu, bantuphones, créoles africains, langues créoles, créole haïtien, pidgin, patois, français d'Afrique, kimbundu, lingala, swahili, longoka, natikongo, Mandombe, écriture bantoue, études africaines, linguistique comparée, linguistique historique, sociolinguistique, phonétique Kikongo, lexicographie Kikongo, orthographe Kikongo, étymologie Kikongo, Kikongo moderne, Kikongo classique, expressions Kikongo, proverbes Kikongo, noms Kikongo, anthroponymie Kikongo, toponymie Kongo, encyclopédie Kongo, Kikongo en ligne, ressources linguistiques, chercheurs en langues africaines, linguistes, étudiants en langues africaines, historiens de l'Afrique, anthropologie africaine, histoire Kongo, Royaume Kongo, Kongo dia Mpangala, traditions initiatiques Kongo, rites Kongo, culte Kongo, religion Kongo, spiritualité Kongo, Bakongo, Bunzi, Lemba, prophètes Kongo, Ngunza, Ngunzisme, Kimbanguisme, Église Kimbanguiste, Simon Kimbangu, Minkisi, Nkisi, bilongo, masengo, makaba, spiritualité bantoue, Nzambi a Mpungu, cosmologie Kongo, ancêtres Kongo, rites initiatiques Kongo, Kimpasi, mythologie Kongo, Simbi, Mpanzu a Nzinga, Mbongi, conseil des anciens Kongo, Ngolo, Ne Kongo, Nzambi Mpungu Tulendo, Maziba, Tambula, Yaya, Manikongo, culte vodou, candomblé, santería, Ifá, Palo Mayombe, Nganga, religion afro-descendante, syncrétisme africain, capoeira, esclavage en Amérique, esclavage au Brésil, Atlantic slave trade, Afro-Latino, Afro-Américains, Haïti révolution, révolution cubaine, résistance africaine, histoire coloniale, décolonisation, enseignement des langues africaines, linguistique appliquée, lexique en ligne, base de données linguistique, dictionnaire numérique, Musée Royal de l’Afrique Centrale, MRAC, Institut des Musées Nationaux du Congo, IMNC, Musée National de Kinshasa, Musée Mbanza Kongo, Mémorial Kongo Dia Ntotela, Musée de l’Homme Paris, Musée du Quai Branly, Smithsonian National Museum of African Art, British Museum African Collections, Musée Afro-Brésilien de Salvador, Centro Cultural Banco do Brasil, Maison des Esclaves de Gorée, Musée de Dakar, Institut Fondamental d’Afrique Noire, IFAN, Centre International des Civilisations Bantu, CICIBA, Archives Coloniales Belges, Archives Nationales du Congo, Fondation Mémorial de l’Esclavage, Cité Internationale de l’Histoire Africaine, Université Kongo, Centre de Recherche en Linguistique Africaine, Bibliothèque Africaine Numérique."
        }

,

        // ✅ **Viewport pour mobile**
        { name: "viewport", content: "width=device-width, initial-scale=1" },

        // ✅ **Indexation et SEO**
        { name: "robots", content: "index, follow" },

        // ✅ **Optimisation Open Graph (Facebook, LinkedIn, WhatsApp, etc.)**
        { property: "og:type", content: "website" },
        { property: "og:title", content: "Lexique Kikongo - Dictionnaire Kikongo, Français & Anglais" },
        { property: "og:description", content: "Découvrez et apprenez le vocabulaire Kikongo avec sa traduction en français et en anglais. Une ressource culturelle et linguistique précieuse dédiée à la préservation du patrimoine Kongo." },
        { property: "og:url", content: "https://lexikongo.fr" },
        { property: "og:image", content: "https://www.lexikongo.fr/images/lexikongo_logo@2x.png" },

        // ✅ **Twitter Cards pour le partage sur Twitter**
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Lexique Kikongo - Dictionnaire Kikongo, Français & Anglais" },
        { name: "twitter:description", content: "Découvrez et apprenez le vocabulaire Kikongo avec sa traduction en français et en anglais. Une ressource culturelle et linguistique précieuse dédiée à la préservation du patrimoine Kongo." },
        { name: "twitter:image", content: "https://www.lexikongo.fr/images/lexikongo_logo@2x.png" },

        // ✅ **Accessibilité pour les assistants vocaux et IA**
        { name: "voice-assistant", content: "enabled" },
        { name: "ai-compatible", content: "true" }
      ],
      link: [
        // ✅ **Favicon**
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },

        // ✅ **Canonical URL pour éviter le contenu dupliqué**
        { rel: "canonical", href: "https://lexikongo.fr" }
      ]
    }
  }
,
  nitro: {
    externals: {
      inline: ["slugify"],
    },
  },
  alias: {
    'generate-unique-slugs': '~/server/utils/generate-unique-slugs',
    'generate-pending-slugs': '~/server/utils/generate-pending-slugs',
  },




  plugins: [
    { src: '~/plugins/vue-carousel-client.js', mode: 'client' },
    { src: '~/plugins/bootstrap.js', mode: 'client' }, { src: '~/plugins/vue-toastification.js', mode: 'client' }, { src: '~/plugins/google-analytics-client.js', mode: 'client' },
  ],
  css: [
    // '~/assets/css/data-style.css',
    '~/assets/css/global.css',
    '~/assets/css/main.css',
    '~/assets/css/button-styles.css',
    '~/assets/css/footer-style.css',
    'bootstrap/dist/css/bootstrap.css',
    '@fortawesome/fontawesome-free/css/all.css'
  ],
  build: {
    transpile: ['vuetify'],
  },
  modules: ['vue3-carousel-nuxt', '@nuxtjs/sitemap', '@pinia/nuxt'],
  site: {
    url: 'https://www.lexikongo.fr', // Remplacez par l'URL de votre site
    name: 'Lexikongo'  // Optionnel, nom du site
  },
  sitemap: {

  },

},

)