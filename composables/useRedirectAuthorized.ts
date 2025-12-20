import { Roles, type APIUserInfoRepsonse } from "~/content/api/ApiUserInfoResponse";

/**
 * Composable for redirecting authorized users from pages
 */
export default async function useRedirectAuthorized() {
    const accessToken = useCookie("access_token");
    if (accessToken && accessToken.value?.length)
    {
        const response: APIUserInfoRepsonse = await $fetch('/user/profile', {
            baseURL: useRuntimeConfig().public.baseURL,
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + accessToken.value
            },
            onResponse: function(event) {
                if (!event.response.ok
                    || event.error) {
                        navigateTo("/");
                        return;
                    }
            }
        });

        if (response.role = Roles.ADMIN)
        {
            navigateTo("/dashboard");
        }
    }
}