<script lang="ts" setup>
import type { ListItem } from "~/types/itemslist/ListItem";
import ArrowDownIcon from "~/assets/svg/arrow-down.svg";

const sortMenuShow = ref(false);
function menuClick()
{
    sortMenuShow.value = !sortMenuShow.value;
}

const props = defineProps<{
    title: string,
    items: Array<ListItem>
}>();
</script>

<template>
    <div class="flex flex-row items-center">
        <div class="flex flex-row items-center relative hover:cursor-pointer" @click="menuClick">
            <p class="select-none text-primary-primary mr-[2px]">{{ title }}</p>
            <ArrowDownIcon />

            <div v-if="sortMenuShow"
            class="absolute bg-secondary-primary p-[20px] right-0 mt-[140px] shadow-xl rounded-[10px] z-[9999]">
                <ul>
                    <li v-for="item in props.items"
                    class="flex flex-row" 
                    @click="$emit('itemsClick', item.emit)">
                        <p>{{ item.title }}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>