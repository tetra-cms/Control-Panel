import type ApiMailConfiguration from "~/types/api/ApiMailConfiguration";

export const useMailConfigurationApi = () => {
    const api = useApi();

    return {
        get: () =>
            api<ApiMailConfiguration>("/admin/mail/configuration"),

        update: (data: ApiMailConfiguration) =>
            api("/admin/mail/configuration", {
                method: "PUT",
                body: data,
            }),

        test: (email: string) =>
            api("/admin/mail/configuration/test", {
                method: "POST",
                body: {
                    email,
                },
            }),
    };
};