import type ApiMailConfiguration from "~/types/api/ApiMailConfiguration";

export const useMailConfigurationApi = () => {
    const api = useApi();

    return {
        get: () =>
            api<ApiMailConfiguration>("/mail/configuration"),

        update: (data: ApiMailConfiguration) =>
            api("/mail/configuration", {
                method: "PUT",
                body: data,
            }),

        test: (email: string) =>
            api("/mail/configuration/test", {
                method: "POST",
                body: {
                    email,
                },
            }),
    };
};