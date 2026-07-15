import type ApiOrder from "~/types/api/ApiOrder";

export const useOrdersApi = () => {
    const api = useApi();

    return {
        getAll: (query?: any) =>
            api("/orders", {
                query,
            }),

        getById: (id: number) =>
            api<ApiOrder>(`/orders/${id}`),

        getMy: (query?: any) =>
            api("/orders/my", {
                query,
            }),

        create: (data: ApiOrder) =>
            api("/admin/orders", {
                method: "POST",
                body: data,
            }),

        update: (id: number, data: ApiOrder) =>
            api(`/admin/orders/${id}`, {
                method: "PUT",
                body: data,
            }),

        remove: (id: number) =>
            api(`/admin/orders/${id}`, {
                method: "DELETE",
            }),
    };
};