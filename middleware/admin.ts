import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware(async () => {
    const userStore = useUserStore();

    userStore.loadCredentials();

    if (!userStore.isAuthenticated) {
        return navigateTo("/");
    }

    if (!userStore.user) {
        await userStore.fetchUser();
    }

    if (!userStore.user) {
        return navigateTo("/");
    }

    if (!["admin", "employee"].includes(userStore.user.role.toLowerCase())) {
        return navigateTo("/");
    }
});