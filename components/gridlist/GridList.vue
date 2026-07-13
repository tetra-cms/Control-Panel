<script setup lang="ts">
interface Column {
    key: string;
    label: string;
    formatter?: (
        value: any,
        item: Record<string, any>,
    ) => string | number | boolean | null | undefined;
}

interface Pagination {
    page: number;
    perPage: number;
    total: number;
    lastPage: number;
}

interface ApiResponse {
    data: Record<string, any>[];
    pagination: Pagination;
}

interface TableAction {
    icon: Component;
    callback: (item: Record<string, any>) => void;
    title?: string;
    class?: string;
    show?: (item: Record<string, any>) => boolean;
}

const props = defineProps<{
    endpoint: string;
    columns: Column[];
    perPage?: number;
    actions?: TableAction[];
}>();

const api = useApi();
const search = ref("");
const page = ref(1);
const loading = ref(false);
const items = ref<Record<string, any>[]>([]);

const pagination = ref<Pagination>({
    page: 1,
    perPage: props.perPage ?? 15,
    total: 0,
    lastPage: 1,
});

let timeout: ReturnType<typeof setTimeout> | null = null;

function getValueByPath(obj: Record<string, any>, path: string) {
    return path
        .split(".")
        .reduce((current, key) => current?.[key], obj);
}

function getColumnValue(item: Record<string, any>, column: Column) {
    const value = getValueByPath(item, column.key);

    return column.formatter
        ? column.formatter(value, item)
        : value;
}

async function load() {
    loading.value = true;

    try {
        const response = await api<ApiResponse>(props.endpoint, {
            query: {
                page: page.value,
                perPage: pagination.value.perPage,
                search: search.value,
            },
        });

        items.value = response.data;
        pagination.value = response.pagination;
    } finally {
        loading.value = false;
    }
}

watch(page, load);

watch(search, () => {
    page.value = 1;
    if (timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(load, 300);
});

onMounted(load);

function previousPage() {
    if (page.value > 1) {
        page.value--;
    }
}

function nextPage() {
    if (page.value < pagination.value.lastPage) {
        page.value++;
    }
}
</script>

<template>
    <div class="w-[50%] rounded-[10px] bg-secondary-primary p-5">

        <div class="mb-4 flex items-center justify-between">

            <input
                v-model="search"
                type="text"
                :placeholder="$t('admin.common.search')"
                class="w-72 rounded-lg border border-secondary-secondary bg-transparent px-3 py-2 outline-none"
            />

            <span class="text-sm opacity-70">
                {{ pagination.total }} {{ $t("admin.common.records") }}
            </span>

        </div>

        <table class="w-full text-center">

            <thead>
                <tr>
                    <th
                        v-for="column in columns"
                        :key="column.key"
                        class="pb-3"
                    >
                        {{ column.label }}
                    </th>
                    <th
                        v-if="actions?.length"
                        class="pb-3"
                    >
                        {{ $t("admin.columns.common.actions") }}
                    </th>
                </tr>
            </thead>

            <tbody>

                <tr v-if="loading">
                    <td
                        :colspan="columns.length + (actions?.length ? 1 : 0)"
                        class="py-6"
                    >
                        {{ $t("admin.common.loading") }}
                    </td>
                </tr>

                <tr
                    v-else-if="items.length === 0"
                >
                    <td
                        :colspan="columns.length"
                        class="py-6"
                    >
                        {{ $t("admin.errors.no_data") }}
                    </td>
                </tr>

                <tr
                    v-for="item in items"
                    :key="item.id"
                    class="border-t border-secondary-secondary"
                >
                    <td
                        v-for="column in columns"
                        :key="column.key"
                        class="py-3"
                    >
                        {{ getColumnValue(item, column) }}
                    </td>

                    <td
                        v-if="actions?.length"
                        class="py-3"
                    >
                        <div class="flex justify-center gap-2">
                            <button
                                v-for="(action, index) in actions"
                                :key="index"
                                v-show="!action.show || action.show(item)"
                                :title="action.title"
                                :class="action.class"
                                class="transition hover:opacity-70"
                                @click="action.callback(item)"
                            >
                                <component :is="action.icon" class="h-5 w-5" />
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>

        </table>

        <div class="mt-5 flex items-center justify-center gap-4">

            <button
                class="rounded bg-secondary-secondary px-4 py-2 disabled:opacity-50"
                :disabled="page === 1"
                @click="previousPage"
            >
                ←
            </button>

            <span>
                {{ pagination.page }}
                /
                {{ pagination.lastPage }}
            </span>

            <button
                class="rounded bg-secondary-secondary px-4 py-2 disabled:opacity-50"
                :disabled="page >= pagination.lastPage"
                @click="nextPage"
            >
                →
            </button>

        </div>

    </div>
</template>