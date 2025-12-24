<script lang="ts" setup>
const props = defineProps<{
    icon: DefineComponent,
    title: string,
    number: number | string
}>();
</script>

<template>
    <div class="w-full max-w-[300px] h-[120px] p-[10px] px-[20px] flex flex-col rounded-[10px] bg-secondary-primary">
        <div class="flex flex-row items-center">
            <div class="w-[48px] h-[48px]">
                <component :is="icon"/>
            </div>
            <p class="text-[14pt] font-medium">{{ title }}</p>
        </div>
        
        
        <div class="flex flex-col">
            <p class="text-[16pt] font-bold">{{ number }}</p>
        </div>
        
    </div>
</template>