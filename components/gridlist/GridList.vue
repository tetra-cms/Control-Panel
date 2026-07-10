<script setup lang="ts">
interface Column {
    key: string;
    label: string;
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

const props = defineProps<{
    endpoint: string;
    columns: Column[];
    perPage?: number;
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

                </tr>

            </thead>

            <tbody>

                <tr v-if="loading">

                    <td
                        :colspan="columns.length"
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
                        {{ item[column.key] }}
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