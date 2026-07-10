<script lang="ts" setup>
import type { PeriodGap } from '~/types/statblock/PeriodGap';

const props = defineProps<{
    icon: DefineComponent,
    title: string,
    number: number | string
    period: PeriodGap
}>();
</script>

<template>
    <div class="w-full max-w-[300px] h-[120px] p-[10px] px-[20px] flex flex-col justify-between rounded-[10px] bg-secondary-primary">
        <div class="flex flex-row items-center">
            <div class="w-[48px] h-[48px]">
                <component :is="icon"/>
            </div>
            <p class="ml-[10px] text-[14pt] font-medium">{{ title }}</p>
        </div>
        
        
        <div class="flex flex-col">
            <p class="text-[16pt] font-bold">{{ number }}</p>
        </div>
        
        <div>
            <p class="text-[10pt] text-right text-secondary-wrapper-light">{{ $t("admin.dashboard.statistic.periodgap.placeholder") + ' ' + $t("admin.dashboard.statistic.periodgap." + period.toString())}}</p>
        </div>
    </div>
</template>