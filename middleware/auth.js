import { useAuthStore } from "~/stores/authStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();

  // Vérifier si l'authentification a déjà été vérifiée
  if (!authStore.isLoggedIn) {
    // Si l'utilisateur n'est pas encore authentifié, on vérifie le token
    authStore.checkAuth();
  }

  // Si l'utilisateur n'est pas connecté, et que la route requiert une connexion
  if (!authStore.isLoggedIn && !to.meta.public) {
    return navigateTo("/login");
  }

  // Protéger les routes selon le rôle de l'utilisateur
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
});
