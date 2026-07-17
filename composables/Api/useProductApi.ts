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

        update: (id: number, data: FormData) =>
            api(`/employee/products/${id}`, {
                method: "POST",
                body: data,
            }),

        uploadImage: (id: number, image: File) => {
            const formData = new FormData();
            formData.append("image", image);

            return api(`/admin/products/image/${id}`, {
                method: "POST",
                body: formData,
            });
        },

        remove: (id: number) =>
            api(`/admin/products/${id}`, {
                method: "DELETE",
            }),
    };
};