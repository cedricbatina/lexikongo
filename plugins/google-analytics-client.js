// plugins/google-analytics.client.js

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    // Utilisation de import.meta.client
    const { googleAnalyticsId } = useRuntimeConfig().public;
    const consent = localStorage.getItem("cookies-accepted");

    if (consent === "true" && googleAnalyticsId) {
      // Charger le script gtag.js
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
      document.head.appendChild(script);

      // Initialiser Google Analytics
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      gtag("js", new Date());
      gtag("config", googleAnalyticsId);

      // Suivre les changements de route
      nuxtApp.hook("page:finish", (page) => {
        gtag("config", googleAnalyticsId, {
          page_path: page.route.fullPath,
        });
      });
    }
  }
});
