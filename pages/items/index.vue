<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useProductApi } from '~/composables/Api/useProductApi';
import type ApiProductInfo from '~/types/api/ApiProductInfo';

definePageMeta({
  layout: 'navbar'
});

const { t } = useI18n();

import PencilIcon from '~/assets/svg/pencil.svg';
import TrashIcon from '~/assets/svg/trash.svg';

const productsApi = useProductApi();

const isModalOpen = ref(false);
const deletionProduct = ref<ApiProductInfo>();

function proceedDeletion()
{
    productsApi.remove(Number(deletionProduct.value?.id));
    isModalOpen.value = false;
}

function cancelDeletion()
{
    deletionProduct.value = {} as ApiProductInfo;
    isModalOpen.value = false;
}

const actions = [
    {
        icon: PencilIcon,
        title: t("common.actions.edit"),
        callback: (product: ApiProductInfo) => navigateTo(`/items/edit/${product.id}`),
    },
    {
        icon: TrashIcon,
        title: t("common.actions.remove"),
        callback: (product: ApiProductInfo) => {
            deletionProduct.value = product;
            isModalOpen.value = true;
        },
    },
];
</script>

<template>
    <div class="w-full min-h-screen flex flex-col items-center py-10 h-fit bg-secondary-light">
        <div class="flex flex-row justify-between items-center w-[50%]">
            <h2 class="text-[24pt] text-left font-bold">{{ $t("admin.items.title") }}</h2>

            <NuxtLink to="/items/create">
                {{ $t("admin.items.create_button") }}
            </NuxtLink>
        </div>

        <ModalWindow :title="t('admin.items.remove_button')" v-model="isModalOpen">
            <div class="my-[10px]">
                <p>
                    {{ $t("common.delete_confirmaiton") + ' «' + deletionProduct?.name + '»?' }}
                </p>

                <p>
                    {{ $t("common.undone_action") }}
                </p>
            </div>

            <div class="flex flex-row mt-[10px] justify-between">
                <button
                    class="text-secondary-primary bg-red-600 px-[15px] py-[10px] rounded-[10px]"
                    @click.prevent="proceedDeletion"
                >
                    {{ $t("common.actions.remove") }}
                </button>

                <button
                    class=""
                    @click.prevent="cancelDeletion"
                >
                    {{ $t("common.actions.cancel") }}
                </button>
            </div>
        </ModalWindow>

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