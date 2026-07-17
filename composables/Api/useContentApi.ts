import type ApiContent from "~/types/api/ApiContent";

export const useContentApi = () => {
    const api = useApi();

    return {
        getAll: (query?: any) =>
            api("/content", {
                query,
            }),

        getById: (id: number) =>
            api<ApiContent>(`/content/id/${id}`),

        getByRoute: (route: string) =>
            api<ApiContent>(`/content/${route}`),

        create: (data: ApiContent) =>
            api("/admin/content", {
                method: "POST",
                body: data,
            }),

        update: (id: number, data: FormData) =>
            api(`/admin/content/${id}`, {
                method: "POST",
                body: data,
            }),

        remove: (id: number) =>
            api(`/admin/content/${id}`, {
                method: "DELETE",
            }),
    };
};