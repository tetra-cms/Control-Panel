<script lang="ts" setup>
import type GridListColumn from '~/types/gridlist/GridListColumn';

const props = defineProps<{
    title: string,
    columns: Array<GridListColumn>,
    items: Array<string>
}>();
</script>

<template>
    <div class="w-[50%] rounded-[10px] bg-secondary-primary p-[20px]">
        <p class="text-primary-primary">{{ title }}</p>
        <table>
            <thead>
                <tr>
                    <th v-for="column in columns" class="text-left pb-[10px]">
                        {{ $t(column.title) }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" class="border-t border-secondary-secondary">
                    <td v-for="column in columns" class="py-[10px]">
                        {{ item }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>