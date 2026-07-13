import type ApiCategoryInfo from "~/types/api/ApiCategoryInfo";
import type IFormElementListItem from "~/types/form/IFormElementListItem";

export const useCategoriesApi = () => {
    const api = useApi();

    return {
        getAll: (query?: any) =>
            api("/categories", {
                query,
            }),

        getById: (id: number) => api<ApiCategoryInfo>(`/categories/${id}`),

        getFormItems: async (): Promise<IFormElementListItem[]> => {
            const categories = await api<ApiCategoryInfo[]>("/categories");

            return categories.map(category => ({
                label: category.title,
                value: Number(category.id).toString(),
            }));
        },

        create: (data: ApiCategoryInfo) =>
            api("/admin/categories", {
                method: "POST",
                body: data,
            }),

        update: (id: number, data: ApiCategoryInfo) =>
            api(`/admin/categories/${id}`, {
                method: "PUT",
                body: data,
            }),

        remove: (id: number) =>
            api(`/admin/categories/${id}`, {
                method: "DELETE",
            }),
    };
};