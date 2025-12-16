/**
 * Composable for redirecting authorized users from pages
 */
export default function useRedirectAuthorized() {
    const accessToken = useCookie("access_token");
    if (accessToken && accessToken.value?.length)
    {
        navigateTo("/dashboard")
    }
}