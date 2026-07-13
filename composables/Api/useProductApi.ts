import type ApiProductInfo from "~/types/api/ApiProductInfo";

export const useProductApi = () => {
    const api = useApi();

    return {
        getAll: (query?: any) =>
            api("/products", {
                query,
            }),

        getById: (id: number) => api<ApiProductInfo>(`/products/${id}`),

        create: (data: ApiProductInfo) =>
            api("/employee/products", {
                method: "POST",
                body: data,
            }),

        update: (id: number, data: ApiProductInfo) =>
            api(`/employee/products/${id}`, {
                method: "PUT",
                body: data,
            }),

        remove: (id: number) =>
            api(`/admin/products/${id}`, {
                method: "DELETE",
            }),
    };
};