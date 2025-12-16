<script setup lang="ts">
import { AuthFormFields } from '~/content/auth/AuthFormFields';
import type { AuthSubmitData, AuthResponse } from '~/content/auth/AuthFormFields';

useRedirectAuthorized();

const errorMessage : Ref<string> = ref("");
async function authUser(userData: AuthSubmitData) {
    const response: AuthResponse = await $fetch('/auth/login', {
        baseURL: useRuntimeConfig().public.baseURL,
        method: 'POST',
        body: userData,
        onResponse: function(event) {
            if (!event.response.ok
            || event.error) {
                errorMessage.value = event.response._data.message;
                return;
            }
        }
    });

    if (response.access_token)
    {
        const accessToken = useCookie("access_token");
        accessToken.value = response.access_token;
        navigateTo("/dashboard");
    }
}
</script>

<template>
    <div class="w-full h-[80%] flex justify-center flex-col items-center">
        <CustomForm 
            :title="$t('auth.title.login')"
            :subtitle="$t('admin.auth.subtitle')"
            @submitinfo="authUser"
            :fields="AuthFormFields"
        />

        <p class="text-[red]">{{ $t(errorMessage) }}</p>
    </div>
</template>