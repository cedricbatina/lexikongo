// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Lexikongo',
      meta: [
        { name: 'description', content: 'Lexique Kikongo - Français - Anglais en ligne' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'keywords', content: 'Vocabulaire, Kikongo, Français, Anglais, Langues, Afrique, Culturelle, Bantou, Congo, Kongo, Dictionnaire' },
        { name: '', content: 'Lexikongo' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  alias: {
    'generate-unique-slugs': '~/server/utils/generate-unique-slugs',
    'generate-pending-slugs': '~/server/utils/generate-pending-slugs',
  },




  plugins: [
    { src: '~/plugins/vue-carousel-client.js', mode: 'client' },
    { src: '~/plugins/bootstrap.js', mode: 'client' }
  ],
  css: [
    '~/assets/css/data-style.css',
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
    // Configuration spécifique au module Sitemap
    // trailingSlash: true // Garder les barres obliques finales si nécessaire
  },

})