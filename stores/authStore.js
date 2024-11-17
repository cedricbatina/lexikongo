import { defineStore } from "pinia";
import { useCookie } from "#app"; // Utilisation de useCookie de Nuxt 3

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    userId: null,
    userRole: null,
    token: null, // Token stocké localement pour vérifier l'état d'authentification
  }),
  actions: {
    // Méthode de connexion : stocker le token dans un cookie sécurisé
    login(token) {
      if (!token) {
        console.error("Le token est vide ou invalide.");
        return this.logout(); // Si le token est vide, on fait un logout immédiat
      }

      // Stocker le token dans un cookie sécurisé
      const authCookie = useCookie("authToken", {
        path: "/", // Le cookie est accessible sur toutes les routes
        maxAge: 60 * 60 * 24 * 7, // Durée de vie du cookie : 7 jours
        httpOnly: true, // Cookie HTTP-only (inaccessible via JavaScript)
        secure: process.env.NODE_ENV === "production", // Utiliser secure uniquement en production
        sameSite: "strict", // Protection contre les attaques CSRF
      });
      authCookie.value = token;

      try {
        // Décoder les informations essentielles depuis le token JWT (côté client uniquement pour l'état local)
        const payload = JSON.parse(atob(token.split(".")[1]));
        this.userId = payload.userId;
        this.userRole = payload.role;
        this.token = token; // Conserver le token en mémoire (optionnel)
        this.isLoggedIn = true;
      } catch (error) {
        console.error("Erreur lors de la décomposition du token:", error);
        this.logout();
      }
    },

    // Méthode de déconnexion : supprimer le cookie et réinitialiser l'état
    logout() {
      const authCookie = useCookie("authToken", {
        path: "/", // Supprimer sur toutes les routes
      });
      authCookie.value = null;

      // Réinitialiser les valeurs dans l'état du store
      this.token = null;
      this.userId = null;
      this.userRole = null;
      this.isLoggedIn = false;
    },

    // Méthode checkAuth : vérifier l'état d'authentification en lisant le cookie
    checkAuth() {
      const authCookie = useCookie("authToken", {
        path: "/", // Le chemin doit correspondre à celui utilisé lors de la création du cookie
      });
      const token = authCookie.value;

      if (token) {
        try {
          // Décoder le token JWT (uniquement pour vérifier la connexion)
          const payload = JSON.parse(atob(token.split(".")[1]));
          this.userId = payload.userId;
          this.userRole = payload.role;
          this.token = token;
          this.isLoggedIn = true;
        } catch (e) {
          console.error("Erreur lors de la décomposition du token:", e);
          this.logout(); // En cas d'erreur, se déconnecter
        }
      } else {
        // Réinitialiser les informations si aucun token n'est trouvé
        this.isLoggedIn = false;
        this.userId = null;
        this.userRole = null;
        this.token = null;
      }
    },
  },
});
