<script setup lang="ts">
definePageMeta({
  layout: 'navbar'
});

import RevenueIcon from '~/assets/svg/revenue.svg?skipsvgo';
import OrderIcon from '~/assets/svg/order.svg?skipsvgo';
import { PeriodGap } from '~/types/statblock/PeriodGap';
import { PeriodGapList } from '~/content/periodgap/PeriodGapList';

const currentPeriodGap : Ref<PeriodGap> = ref(PeriodGap.MONTH);


</script>

<template>
    <div class="w-full h-full flex flex-col justify-center items-center sm:ml-[270px]">

            <div class="flex flex-row">
                <h2 class="text-[24pt] font-bold">{{ $t("admin.dashboard.title") }}</h2>
                <ItemsList
                    class="ml-[15px]"
                    :title="$t('admin.dashboard.statistic.periodgap.placeholder_sub') + ' ' + $t('admin.dashboard.statistic.periodgap.' + currentPeriodGap.toString())"
                    :items="PeriodGapList"
                    />
            </div>
            

            <div class="flex flex-col sm:flex-row">
                <StatBlock
                    class="my-[20px] sm:mx-[20px]"
                    :icon="OrderIcon"
                    :title="$t('admin.dashboard.statistic.order')"
                    :number="formatNumberByThousands(1234567)"
                    :period="currentPeriodGap"
                    />

                <StatBlock
                    class="my-[20px] sm:mx-[20px]"
                    :icon="RevenueIcon"
                    :title="$t('admin.dashboard.statistic.revenue')"
                    :number="formatNumberByThousands(1234567)"
                    :period="currentPeriodGap"
                    />
            </div>

            <GridList 
                
                />
    </div>
</template>