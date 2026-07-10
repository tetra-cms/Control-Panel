export const useApiFetch = () => {
  return $fetch.create({
    baseURL: String(useRuntimeConfig().public.BASE_URL),
    headers: {
      Authorization: `Bearer ${useCookie("access_token").value}`,
    },
  });
};

/*
Example usage:
const res = await useApiFetch()<{firstname: string, lastname: string, email: string}>("/user", {
    method: "GET",
});
*/