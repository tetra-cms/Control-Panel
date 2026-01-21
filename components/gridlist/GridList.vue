<script lang="ts" setup>
import type GridListItem from '~/types/gridlist/GridListItem';

interface RowData {
    [key: string]: string
}

const props = defineProps<{
    items: RowData[]
}>();

const columns = props.items.length > 0 ? Object.keys(props.items[0]) : [];
</script>

<template>
    <div class="w-[50%] rounded-[10px] bg-secondary-primary p-[20px]">
        <table class="w-full text-center">
            <thead>
                <tr>
                    <th 
                        v-for="column in columns" 
                        :key="column"
                        class="pb-[10px]">
                        {{ $t(column) }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    v-for="(item, index) in items" 
                    :key="index"
                    class="border-t border-secondary-secondary">
                    <td 
                        v-for="column in columns" 
                        :key="column"
                        class="py-[10px]">
                        {{ item[column] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>