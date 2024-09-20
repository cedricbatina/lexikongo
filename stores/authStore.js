// stores/authStore.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    token: null,
    userRole: null, // Nouveau : rôle de l'utilisateur
  }),
  actions: {
    login(token) {
      this.token = token;
      this.isLoggedIn = true;

      // Décode le token pour obtenir le rôle de l'utilisateur
      const userRole = JSON.parse(atob(token.split(".")[1])).role;
      this.userRole = userRole;

      localStorage.setItem("token", token);
    },
    logout() {
      this.token = null;
      this.isLoggedIn = false;
      this.userRole = null;
      localStorage.removeItem("token");
    },
    checkAuth() {
      const token = localStorage.getItem("token");
      if (token) {
        this.token = token;
        this.isLoggedIn = true;

        // Met à jour le rôle de l'utilisateur avec le token
        const userRole = JSON.parse(atob(token.split(".")[1])).role;
        this.userRole = userRole;
      } else {
        this.isLoggedIn = false;
        this.userRole = null;
      }
    },
  },
});
