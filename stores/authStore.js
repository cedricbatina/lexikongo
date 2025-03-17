import { defineStore } from "pinia";
import { useCookie } from "#app"; // Utilisation de useCookie de Nuxt 3
import { navigateTo } from "nuxt/app"; // Import nécessaire pour Nuxt 3
export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    userId: null,
    userRole: [], // Support des rôles multiples
    token: null, // Token stocké localement pour vérifier l'état d'authentification
  }),
  actions: {
    // Méthode de connexion : stocker le token dans un cookie sécurisé
    login(token) {
      if (!token) {
        console.error("Le token est vide ou invalide.");
        return this.logout(); // Si le token est vide, on fait un logout immédiat
      }

      // Stocker le token dans un cookie
      const authCookie = useCookie("authToken", {
        path: "/", // Le cookie est accessible sur toutes les routes
        maxAge: 60 * 60 * 24 * 7, // Durée de vie : 7 jours
        httpOnly: false, // IMPORTANT : désactiver pour tester la lecture en JS
        secure: process.env.NODE_ENV === "production", // Utiliser `secure` en production
        sameSite: "strict",
      });
      authCookie.value = token;

      try {
        // Décoder manuellement les informations du token JWT
        const payload = JSON.parse(atob(token.split(".")[1]));

        // Vérification de l'expiration du token
        const currentTimestamp = Math.floor(Date.now() / 1000); // Timestamp actuel en secondes
        if (payload.exp < currentTimestamp) {
          console.warn("Token expiré, déconnexion...");
          return this.logout();
        }

        // Récupérer les informations utilisateur
        this.userId = payload.userId;
        this.userRole = payload.roles || []; // Support des rôles multiples
        this.token = token;
        this.isLoggedIn = true;
      } catch (error) {
        console.error("Erreur lors de la décomposition du token :", error);
        this.logout();
      }
    },

    // Méthode de déconnexion : supprimer le cookie et réinitialiser l'état
    logout() {
      // Supprimer le cookie authToken
      const authCookie = useCookie("authToken", {
        path: "/", // Supprimer sur toutes les routes
      });
      authCookie.value = null;

      // Réinitialiser l'état du store
      this.token = null;
      this.userId = null;
      this.userRole = [];
      this.isLoggedIn = false;

      // Rediriger à la page d'accueil
      navigateTo("/");
    },

    // Méthode checkAuth : vérifier l'état d'authentification en lisant le cookie
    checkAuth() {
      const authCookie = useCookie("authToken", {
        path: "/", // Le chemin doit correspondre à celui utilisé lors de la création du cookie
      });
      const token = authCookie.value;

      if (token) {
        try {
          // Décoder le token JWT
          const payload = JSON.parse(atob(token.split(".")[1]));

          // Vérification de l'expiration du token
          const currentTimestamp = Math.floor(Date.now() / 1000); // Timestamp actuel en secondes
          if (payload.exp < currentTimestamp) {
            console.warn("Token expiré, déconnexion...");
            return this.logout();
          }

          this.userId = payload.userId;
          this.userRole = payload.roles || []; // Support des rôles multiples
          this.token = token;
          this.isLoggedIn = true;
        } catch (e) {
          console.error("Erreur lors de la décomposition du token :", e);
          this.logout(); // En cas d'erreur, se déconnecter
        }
      } else {
        console.warn("Aucun token trouvé, utilisateur non authentifié.");
        // Réinitialiser l'état si aucun token n'est trouvé
        this.isLoggedIn = false;
        this.userId = null;
        this.userRole = [];
        this.token = null;
      }
    },

    // Méthode utilitaire pour vérifier les rôles
    hasRole(role) {
      return this.userRole.includes(role);
    },
  },
});

/*import { defineStore } from "pinia";
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

      // Stocker le token dans un cookie
      const authCookie = useCookie("authToken", {
        path: "/", // Le cookie est accessible sur toutes les routes
        maxAge: 60 * 60 * 24 * 7, // Durée de vie : 7 jours
        httpOnly: false, // IMPORTANT : désactiver pour tester la lecture en JS (désactiver après débogage)
        secure: process.env.NODE_ENV === "production", // Utiliser `secure` en production
        sameSite: "strict",
      });
      authCookie.value = token;

      try {
        // Décoder manuellement les informations du token JWT
        const payload = JSON.parse(atob(token.split(".")[1]));

        // Vérification de l'expiration du token
        const currentTimestamp = Math.floor(Date.now() / 1000); // Timestamp actuel en secondes
        if (payload.exp < currentTimestamp) {
          console.warn("Token expiré, déconnexion...");
          return this.logout();
        }

        // Récupérer les informations utilisateur
        this.userId = payload.userId;
        this.userRole = payload.role || null; // Ajusté en fonction du backend
        this.token = token;
        this.isLoggedIn = true;

        console.log("Utilisateur connecté :", this.userId, this.userRole);
      } catch (error) {
        console.error("Erreur lors de la décomposition du token :", error);
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

      console.log("Valeur actuelle du cookie authToken :", token); // LOG pour vérifier la lecture du cookie

      if (token) {
        try {
          // Décoder le token JWT
          const payload = JSON.parse(atob(token.split(".")[1]));

          // Vérification de l'expiration du token
          const currentTimestamp = Math.floor(Date.now() / 1000); // Timestamp actuel en secondes
          if (payload.exp < currentTimestamp) {
            console.warn("Token expiré, déconnexion...");
            return this.logout();
          }

          this.userId = payload.userId;
          this.userRole = payload.role || null;
          this.token = token;
          this.isLoggedIn = true;

          console.log("Authentification réussie :", this.userId, this.userRole);
        } catch (e) {
          console.error("Erreur lors de la décomposition du token :", e);
          this.logout(); // En cas d'erreur, se déconnecter
        }
      } else {
        console.warn("Aucun token trouvé, utilisateur non authentifié.");
        // Réinitialiser l'état si aucun token n'est trouvé
        this.isLoggedIn = false;
        this.userId = null;
        this.userRole = null;
        this.token = null;
      }
    },
  },
});
*/
/*import { defineStore } from "pinia";
import { useCookie } from "#app"; // Utilisation de useCookie de Nuxt 3
import jwtDecode from "jwt-decode"; // Assurez-vous d'avoir installé jwt-decode

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
        // Décoder les informations essentielles depuis le token JWT
        const payload = jwtDecode(token);

        // Vérification de l'expiration du token
        const currentTimestamp = Math.floor(Date.now() / 1000); // Timestamp actuel en secondes
        if (payload.exp < currentTimestamp) {
          console.warn("Token expiré, déconnexion...");
          return this.logout();
        }

        // Récupérer les informations utilisateur
        this.userId = payload.userId;
        this.userRole = payload.roles || []; // Rôles envoyés depuis le backend
        this.token = token; // Conserver le token en mémoire (optionnel)
        this.isLoggedIn = true;

        console.log("Utilisateur connecté :", this.userId, this.userRole);
      } catch (error) {
        console.error("Erreur lors de la décomposition du token :", error);
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
          const payload = jwtDecode(token);

          // Vérification de l'expiration du token
          const currentTimestamp = Math.floor(Date.now() / 1000); // Timestamp actuel en secondes
          if (payload.exp < currentTimestamp) {
            console.warn("Token expiré, déconnexion...");
            return this.logout();
          }

          this.userId = payload.userId;
          this.userRole = payload.roles || []; // Rôles envoyés depuis le backend
          this.token = token;
          this.isLoggedIn = true;

          console.log("Authentification réussie :", this.userId, this.userRole);
        } catch (e) {
          console.error("Erreur lors de la décomposition du token :", e);
          this.logout(); // En cas d'erreur, se déconnecter
        }
      } else {
        // Réinitialiser les informations si aucun token n'est trouvé
        this.isLoggedIn = false;
        this.userId = null;
        this.userRole = null;
        this.token = null;

        console.log("Aucun token trouvé, utilisateur non authentifié.");
      }
    },
  },
});
*/
/*import { defineStore } from "pinia";
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
*/
