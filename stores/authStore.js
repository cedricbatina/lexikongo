import { defineStore } from "pinia";
import { useCookie } from "#app"; // Utilisation de useCookie de Nuxt 3

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    token: null,
    userRole: null,
    userId: null,
  }),
  actions: {
    // Méthode de connexion : stocker le token dans un cookie et décrypter le payload
    login(token) {
      if (!token) {
        console.error("Le token est vide ou invalide.");
        return this.logout(); // Si le token est vide, on fait un logout immédiat
      }

      // Stocker le token dans un cookie avec des options spécifiques
      const authCookie = useCookie("authToken", {
        path: "/", // Le cookie est accessible sur toutes les routes
        maxAge: 60 * 60 * 24 * 7, // Durée de vie du cookie : 7 jours
        secure: process.env.NODE_ENV === "production", // Utiliser secure uniquement en production
        sameSite: "strict", // Protection contre les attaques CSRF
      });
      authCookie.value = token; // Assigner le token au cookie

      // Décrypter le token JWT pour obtenir le rôle et l'ID utilisateur
      this.token = token;
      this.isLoggedIn = true;

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        this.userRole = payload.role;
        this.userId = payload.userId;
      } catch (error) {
        console.error("Erreur lors de la décomposition du token:", error);
        this.logout();
      }
    },

    // Méthode de déconnexion : supprimer le cookie et réinitialiser l'état
    logout() {
      const authCookie = useCookie("authToken");
      authCookie.value = null; // Effacer le cookie

      this.token = null;
      this.isLoggedIn = false;
      this.userRole = null;
      this.userId = null;
    },

    // Méthode checkAuth : vérifier l'état d'authentification en lisant le cookie
    checkAuth() {
      const authCookie = useCookie("authToken", {
        path: "/", // Assurez-vous que le chemin est le même pour l'écriture et la lecture du cookie
      });
      const token = authCookie.value;

      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          this.token = token;
          this.isLoggedIn = true;
          this.userRole = payload.role;
          this.userId = payload.userId;
        } catch (e) {
          console.error("Erreur lors de la décomposition du token:", e);
          this.logout(); // En cas d'erreur, on effectue un logout
        }
      } else {
        this.isLoggedIn = false;
        this.userRole = null;
        this.userId = null;
      }
    },
  },
});
