// middleware/auth.js
import { useAuthStore } from "~/stores/authStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (import.meta.client) {
    authStore.checkAuth(); // Vérifie l'état d'authentification

    if (!authStore.isLoggedIn) {
      return navigateTo("/login");
    }

    const userRole = authStore.userRole;

    if (to.fullPath.includes("/admin") && userRole !== "admin") {
      return navigateTo("/login");
    }

    if (to.fullPath.includes("/contributor") && userRole !== "contributor") {
      return navigateTo("/login");
    }

    if (to.fullPath.includes("/user") && userRole !== "user") {
      return navigateTo("/login");
    }
  }
});
