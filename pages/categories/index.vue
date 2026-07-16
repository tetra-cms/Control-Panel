<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useCategoriesApi } from '~/composables/Api/useCategoriesApi';
import type ApiCategoryInfo from '~/types/api/ApiCategoryInfo';

definePageMeta({
  layout: 'navbar'
});

const { t } = useI18n();

import PencilIcon from '~/assets/svg/pencil.svg';
import TrashIcon from '~/assets/svg/trash.svg';

const categoryApi = useCategoriesApi();

const isModalOpen = ref(false);
const deletionCategory = ref<ApiCategoryInfo>();

function proceedDeletion()
{
    categoryApi.remove(Number(deletionCategory.value?.id));
    isModalOpen.value = false;
}

function cancelDeletion()
{
    deletionCategory.value = {} as ApiCategoryInfo;
    isModalOpen.value = false;
}

const actions = [
    {
        icon: PencilIcon,
        title: t("common.actions.edit"),
        callback: (category: ApiCategoryInfo) => navigateTo(`/categories/edit/${category.id}`),
    },
    {
        icon: TrashIcon,
        title: t("common.actions.remove"),
        callback: (category: ApiCategoryInfo) => {
            deletionCategory.value = category;
            isModalOpen.value = true;
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
        
        <ModalWindow :title="t('admin.items.remove_button')" v-model="isModalOpen">
            <div class="my-[10px]">
                <p>
                    {{ $t("common.delete_confirmaiton") + ' «' + deletionCategory?.title + '»?' }}
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
            endpoint="/categories"
            :columns="[
                { key: 'id', label: t('admin.columns.common.id') },
                { key: 'title', label: t('admin.columns.common.title') }
            ]"
            :actions="actions"
        />
    </div>
</template>