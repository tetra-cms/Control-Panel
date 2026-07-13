<script setup lang="ts">
import { useI18n } from 'vue-i18n';

definePageMeta({
  layout: 'navbar'
});

const { t } = useI18n();
</script>

<template>
    <div class="w-full h-full flex flex-col justify-center items-center">
        <div class="flex flex-row justify-between items-center w-[50%]">
            <h2 class="text-[24pt] text-left font-bold">{{ $t("admin.categories.title") }}</h2>

            <NuxtLink to="/categories/create">
                {{ $t("admin.categories.create_button") }}
            </NuxtLink>
        </div>
        

        <GridList
            endpoint="/categories"
            :columns="[
                { key: 'id', label: t('admin.columns.common.id') },
                { key: 'title', label: t('admin.columns.common.title') }
            ]"
        />
    </div>
</template>