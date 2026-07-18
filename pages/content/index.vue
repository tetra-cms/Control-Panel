<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useContentApi } from '~/composables/Api/useContentApi';
import type ApiContent from '~/types/api/ApiContent';

definePageMeta({
  layout: 'navbar'
});

const { t } = useI18n();

import PencilIcon from '~/assets/svg/pencil.svg';
import TrashIcon from '~/assets/svg/trash.svg';

const contentApi = useContentApi();

const isModalOpen = ref(false);
const deletionContent = ref<ApiContent>();

function proceedDeletion()
{
    contentApi.remove(Number(deletionContent.value?.id));
    isModalOpen.value = false;
}

function cancelDeletion()
{
    deletionContent.value = {} as ApiContent;
    isModalOpen.value = false;
}

const actions = [
    {
        icon: PencilIcon,
        title: t("common.actions.edit"),
        callback: (content: ApiContent) => navigateTo(`/content/edit/${content.id}`),
    },
    {
        icon: TrashIcon,
        title: t("common.actions.remove"),
        callback: (content: ApiContent) => {
            deletionContent.value = content;
            isModalOpen.value = true;
        },
    },
];
</script>

<template>
    <div class="w-full min-h-screen flex flex-col items-center py-10 h-fit bg-secondary-light">
        <div class="flex flex-row justify-between items-center w-[50%]">
            <h2 class="text-[24pt] text-left font-bold">{{ $t("admin.content.title") }}</h2>

            <NuxtLink to="/content/create">
                {{ $t("admin.content.create_button") }}
            </NuxtLink>
        </div>
        
        <ModalWindow :title="t('admin.content.remove_button')" v-model="isModalOpen">
            <div class="my-[10px]">
                <p>
                    {{ $t("common.delete_confirmaiton") + ' «' + deletionContent?.route + '»?' }}
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
            endpoint="/content"
            :columns="[
                { key: 'id', label: t('admin.columns.common.id') },
                { key: 'route', label: t('admin.columns.content.route') }
            ]"
            :actions="actions"
        />
    </div>
</template>