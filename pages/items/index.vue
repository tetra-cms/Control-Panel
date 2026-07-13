<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type ApiProductInfo from '~/types/api/ApiProductInfo';

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
        callback: (product: ApiProductInfo) => navigateTo(`/items/edit/${product.id}`),
    },
    {
        icon: TrashIcon,
        title: t("common.actions.delete"),
        callback: (product: ApiProductInfo) => {
            
        },
    },
];
</script>

<template>
    <div class="w-full h-full flex flex-col justify-center items-center">
        <div class="flex flex-row justify-between items-center w-[50%]">
            <h2 class="text-[24pt] text-left font-bold">{{ $t("admin.items.title") }}</h2>

            <NuxtLink to="/items/create">
                {{ $t("admin.items.create_button") }}
            </NuxtLink>
        </div>

        <GridList
            endpoint="/products"
            :columns="[
                { key: 'id', label: t('admin.columns.common.id') },
                { key: 'name', label: t('admin.columns.common.name') },
                { key: 'price', label: t('admin.columns.product.price') },
                { key: 'supply_quantum', label: t('admin.columns.product.supply_quantum') },
                { key: 'stock', label: t('admin.columns.product.stock'), formatter: value => value == -1 ? t('common.infinity') : value },
                { key: 'category.title', label: t('admin.columns.product.category') },
                { 
                    key: 'created_at', 
                    label: t('admin.columns.common.created_at'), 
                    formatter: (value: string) => {
                        if (!value) {
                            return t('common.none')
                        }

                        const date = new Date(value);
                        const pad = (num: number) => String(num).padStart(2, '0');
                        return `${pad(date.getHours())}:${pad(date.getMinutes())} ${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()}`;
                    }
                },
            ]"
            :actions="actions"
        />
    </div>
</template>