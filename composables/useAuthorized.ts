export const useAuthorized = async () => {    
    const userStore = useUserStore();
    userStore.loadCredentials();

    await userStore.fetchUser();

    if (!userStore.isAuthenticated) {
        await navigateTo("/");
    }

    if (!userStore.user) {
        await navigateTo("/");
    }

    if (
        userStore.user?.role == "USER"
    ) {
        await navigateTo("/");
    }
}