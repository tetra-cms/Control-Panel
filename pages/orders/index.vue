<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useOrdersApi } from "~/composables/Api/useOrdersApi";

import type ApiOrder from "~/types/api/ApiOrder";

import PencilIcon from "~/assets/svg/pencil.svg";
import TrashIcon from "~/assets/svg/trash.svg";

definePageMeta({
    layout: "navbar",
});

const { t } = useI18n();

const ordersApi = useOrdersApi();

const isModalOpen = ref(false);
const deletionOrder = ref<ApiOrder>();

async function proceedDeletion() {
    if (!deletionOrder.value?.id) {
        return;
    }

    await ordersApi.remove(deletionOrder.value.id);

    isModalOpen.value = false;
}

function cancelDeletion() {
    deletionOrder.value = undefined;
    isModalOpen.value = false;
}

const actions = [
    {
        icon: PencilIcon,
        title: t("common.actions.edit"),
        callback: (order: ApiOrder) =>
            navigateTo(`/orders/edit/${order.id}`),
    },
    {
        icon: TrashIcon,
        title: t("common.actions.remove"),
        callback: (order: ApiOrder) => {
            deletionOrder.value = order;
            isModalOpen.value = true;
        },
    },
];
</script>

<template>
    <div class="w-full h-full flex flex-col justify-center items-center">
        <div class="flex flex-row justify-between items-center w-[50%]">
            <h2 class="text-[24pt] font-bold">
                {{ $t("admin.orders.title") }}
            </h2>
        </div>

        <ModalWindow
            v-model="isModalOpen"
            :title="t('admin.orders.remove_button')"
        >
            <div class="my-[10px]">
                <p>
                    {{
                        $t("common.delete_confirmaiton") +
                        " №" +
                        deletionOrder?.id +
                        "?"
                    }}
                </p>

                <p>
                    {{ $t("common.undone_action") }}
                </p>
            </div>

            <div class="flex flex-row justify-between mt-[10px]">
                <button
                    class="bg-red-600 text-secondary-primary px-[15px] py-[10px] rounded-[10px]"
                    @click.prevent="proceedDeletion"
                >
                    {{ $t("common.actions.remove") }}
                </button>

                <button @click.prevent="cancelDeletion">
                    {{ $t("common.actions.cancel") }}
                </button>
            </div>
        </ModalWindow>

        <GridList
            endpoint="/orders"
            :columns="[
                {
                    key: 'id',
                    label: t('admin.columns.common.id')
                },
                {
                    key: 'client',
                    label: t('admin.columns.order.client')
                },
                {
                    key: 'status',
                    label: t('admin.columns.order.status'),
                    formatter: (value: string) => {
                        return t(`order.status.${value}`)
                    }
                },
                {
                    key: 'total_quantity',
                    label: t('admin.columns.order.total_quantity')
                },
                {
                    key: 'total_price',
                    label: t('admin.columns.order.total_price')
                },
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