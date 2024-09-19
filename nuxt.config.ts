// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify';
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Lexikongo',
      meta: [
        { name: 'description', content: 'Plateforme de partage de connaissances en ligne' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'keywords', content: 'plomberie, réparations, installations, Cyrille Plomberie' },
        { name: 'author', content: 'Cyrille Plomberie' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  plugins: [ {
    src: '~/plugins/vue-carousel-client.js',  mode: 'client'
  }],
  css: [
    '~/assets/css/home-page-style.css',
    '~/assets/css/footer-style.css',
    'bootstrap/dist/css/bootstrap.css',
    '@fortawesome/fontawesome-free/css/all.css'
  ],
  build: {
    transpile: ['vuetify']
  },
  modules: ['vue3-carousel-nuxt', '@nuxtjs/sitemap'],
 site: {
    url: 'https://www.lexikongo.fr', // Remplacez par l'URL de votre site
    name: 'Lexikongo'  // Optionnel, nom du site
  },
  sitemap: {
    // Configuration spécifique au module Sitemap
   // trailingSlash: true // Garder les barres obliques finales si nécessaire
  }, 
 

})