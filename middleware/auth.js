import { useAuthStore } from "~/stores/authStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();

  // Vérifier si l'utilisateur est authentifié
  if (!authStore.isLoggedIn) {
    authStore.checkAuth();
  }

  // Vérifie si la route nécessite une authentification
  if (!authStore.isLoggedIn && !to.meta.public) {
    return navigateTo("/login");
  }

  // Gestion des rôles pour les routes spécifiques
  const userRoles = authStore.userRole || [];
  if (to.fullPath.includes("/admin") && !userRoles.includes("admin")) {
    return navigateTo("/login");
  }

  if (
    to.fullPath.includes("/contributor") &&
    !userRoles.includes("contributor")
  ) {
    return navigateTo("/login");
  }

  if (to.fullPath.includes("/user") && !userRoles.includes("user")) {
    return navigateTo("/login");
  }
});
