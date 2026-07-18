<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useOrdersApi } from "~/composables/Api/useOrdersApi";
import { OrderStatus } from "~/types/api/OrderStatus";

definePageMeta({
    layout: "navbar",
});

const { t } = useI18n();

const route = useRoute();

const orderId = ref(Number(route.params.id));

const ordersApi = useOrdersApi();
const order = await ordersApi.getById(orderId.value);

const selectedStatus = ref<OrderStatus>(order.status as OrderStatus);
const statuses = [
  { value: OrderStatus.PendingPayment, label: t('order.status.PENDING_PAYMENT') },
  { value: OrderStatus.InProgress, label: t('order.status.IN_PROGRESS') },
  { value: OrderStatus.Assembled, label: t('order.status.ASSEMBLED') },
  { value: OrderStatus.InDelivery, label: t('order.status.IN_DELIVERY') },
  { value: OrderStatus.Received, label: t('order.status.RECEIVED') },
  { value: OrderStatus.Cancelled, label: t('order.status.CANCELLED') },
];

async function changeStatus()
{
    order.status = selectedStatus.value;
    await ordersApi.update(orderId.value, order)
}
</script>

<template>
    <div class="w-full min-h-screen flex flex-col items-center py-10 h-fit bg-secondary-light">
        <div class="w-[55%] rounded-[10px] bg-secondary-primary p-5">
            <ul class="flex flex-col">
                <li class="flex flex-row gap-[10px]">
                    <b>{{ $t('admin.columns.order.fcs') }}</b>
                    <p>{{ order.client?.fcs }}</p>
                </li>

                <li class="flex flex-row gap-[10px]">
                    <b>{{ $t('admin.columns.order.email') }}</b>
                    <p>{{ order.user?.email }}</p>
                </li>

                <li class="flex flex-row gap-[10px]">
                    <b>{{ $t('admin.columns.order.phone') }}</b>
                    <p>{{ order.client?.phone }}</p>
                </li>

                <li>
                    <form class="flex flex-row gap-[10px] items-center">
                        <b>{{ $t('admin.columns.order.status') }}</b>

                        <select 
                            class="border border-secondary-secondary"
                            v-model="selectedStatus">
                            <option
                            v-for="status in statuses"
                            :key="status.value"
                            :value="status.value"
                            >
                            {{ status.label }}
                            </option>
                        </select>

                        <button
                            @click.prevent="changeStatus"
                            class="py-[5px] px-[10px] bg-primary-primary text-secondary-primary rounded-[10px]">
                            {{ $t('admin.orders.change_status') }}
                        </button>
                    </form>
                </li>

                <li class="flex flex-row gap-[10px]">
                    <b>{{ $t('admin.columns.order.address') }}</b>
                    <p>{{ order.client?.address + ' (' + order.client?.city + ')' }}</p>
                </li>

                <li class="flex flex-row gap-[10px]">
                    <b>{{ $t('admin.columns.order.total_price') }}</b>
                    <p>{{ order.total_price }}</p>
                </li>

                <li class="flex flex-row gap-[10px]">
                    <b>{{ $t('admin.columns.order.total_quantity') }}</b>
                    <p>{{ order.total_quantity }}</p>
                </li>

                <li class="flex flex-col gap-[10px]">
                    <b>{{ $t('admin.columns.order.comment') }}</b>
                    <p>{{ order.comment }}</p>
                </li>
            </ul>
        </div>

        <div class="flex flex-row justify-between items-center w-[55%]">
            <h2 class="text-[18pt] font-bold">
                {{ $t("admin.orders.positions") }}
            </h2>
        </div>

        <GridList
            class="w-[55%]"
            :pagination-disabled="true"
            :endpoint="'/orders/' + orderId + '/positions'"
            :columns="[
                {
                    key: 'id',
                    label: t('admin.columns.common.id')
                },
                {
                    key: 'product.name',
                    label: t('admin.columns.common.title')
                },
                {
                    key: 'total_price',
                    label: t('admin.columns.product.price')
                },
                {
                    key: 'product.supply_quantum',
                    label: t('admin.columns.product.supply_quantum')
                },
                {
                    key: 'quantity',
                    label: t('admin.columns.order.quantity')
                },
            ]"
        />
    </div>
</template>