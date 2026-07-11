export const useAuthorized = async () => {    
    const userStore = useUserStore();
    userStore.loadCredentials();

    if (!userStore.isAuthenticated) {
        await navigateTo("/");
    }

    if (!userStore.user) {
        await userStore.fetchUser();
        await navigateTo("/");
    }
}