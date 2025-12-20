import { Roles, type APIUserInfoRepsonse } from "~/content/api/ApiUserInfoResponse";

/**
 * Composable for redirecting unauthorized users from pages that requires authorization
 */
export default async function useRedirectUnauthorized() {
    const accessToken = useCookie("access_token");
    if (!accessToken || !accessToken.value)
    {
        navigateTo("/");
    } else {
        const response: APIUserInfoRepsonse = await $fetch('/user/profile', {
            baseURL: useRuntimeConfig().public.baseURL,
            method: 'GET',
            onResponse: function(event) {
                if (!event.response.ok
                || event.error) {
                    navigateTo("/");
                    return;
                }
            }
        });

        if (response.role == Roles.ADMIN)
        {
            navigateTo("/dashboard");
        }
    }
}