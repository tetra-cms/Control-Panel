/**
 * Composable for redirecting unauthorized users from pages that requires authorization
 */
export default function useRedirectUnauthorized() {
    const accessToken = useCookie("access_token");
    if (!accessToken || !accessToken.value)
    {
        navigateTo("/")
    }
}