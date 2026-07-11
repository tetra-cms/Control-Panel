<script setup lang="ts">
import { useI18n } from 'vue-i18n';

definePageMeta({
  layout: 'navbar'
});

const { t } = useI18n();

</script>

<template>
    <div class="w-full h-full flex flex-col justify-center items-center">
        <h2 class="w-[50%] text-[24pt] text-left font-bold">{{ $t("admin.items.title") }}</h2>

        <GridList
            endpoint="/products"
            :columns="[
                { key: 'id', label: t('admin.columns.common.id') },
                { key: 'name', label: t('admin.columns.common.name') },
                { key: 'price', label: t('admin.columns.product.price') },
                { key: 'supply_quantum', label: t('admin.columns.product.supply_quantum') },
                { key: 'stock', label: t('admin.columns.product.stock') },
                { key: 'category.name', label: t('admin.columns.product.category') },
                { key: 'created_at', label: t('admin.columns.common.created_at') },
            ]"
        />
    </div>
</template>