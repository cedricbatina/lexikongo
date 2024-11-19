import { useAuthStore } from "~/stores/authStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();

  // Vérifier si l'authentification a déjà été vérifiée
  if (!authStore.isLoggedIn) {
    // Si l'utilisateur n'est pas encore authentifié, on vérifie le token
    await authStore.checkAuth();
  }

  // Si l'utilisateur n'est pas connecté, et que la route requiert une connexion
  if (!authStore.isLoggedIn && !to.meta.public) {
    return navigateTo("/login");
  }

  // Protéger les routes selon le rôle de l'utilisateur
  const userRoles = authStore.userRole || []; // Assurez-vous que `userRole` est bien un tableau

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
