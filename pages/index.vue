<script setup lang="ts">
import { AuthFormFields } from "~/content/auth/AuthFormFields";
import type {
    AuthSubmitData,
    AuthResponse,
} from "~/content/auth/AuthFormFields";
import { useUserStore } from "~/stores/user";

const config = useRuntimeConfig();
const userStore = useUserStore();

const errorMessage = ref("");

const { user } = storeToRefs(userStore);

watchEffect(() => {
  if (userStore.credentials && !user.value) {
    navigateTo("/dashboard");
  }
});

async function authUser(userData: AuthSubmitData) {
    errorMessage.value = "";

    try {
        const response = await $fetch<AuthResponse>("/auth/login", {
            baseURL: config.public.baseURL,
            method: "POST",
            body: userData,
        });

        await userStore.login({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
        });

        navigateTo("/dashboard");
    } catch (error: any) {
        errorMessage.value =
            error?.data?.message ??
            "auth.errors.invalidCredentials";
    }
}
</script>

<template>
    <div class="w-full h-[80%] flex flex-col items-center justify-center">
        <CustomForm
            :title="$t('auth.title.login')"
            :subtitle="$t('admin.auth.subtitle')"
            :fields="AuthFormFields"
            @submitinfo="authUser"
        />

        <p
            v-if="errorMessage"
            class="mt-4 text-red-500"
        >
            {{ $t(errorMessage) }}
        </p>
    </div>
</template>