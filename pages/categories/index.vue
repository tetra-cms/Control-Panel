<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type ApiCategoryInfo from '~/types/api/ApiCategoryInfo';

definePageMeta({
  layout: 'navbar'
});

const { t } = useI18n();

import PencilIcon from '~/assets/svg/pencil.svg';
import TrashIcon from '~/assets/svg/trash.svg';

const actions = [
    {
        icon: PencilIcon,
        title: t("common.actions.edit"),
        callback: (category: ApiCategoryInfo) => navigateTo(`/categories/edit/${category.id}`),
    },
    {
        icon: TrashIcon,
        title: t("common.actions.delete"),
        callback: (category: ApiCategoryInfo) => {
            
        },
    },
];
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