<script setup lang="ts">
definePageMeta({
  layout: 'navbar'
});

import RevenueIcon from '~/assets/svg/revenue.svg?skipsvgo';
import OrderIcon from '~/assets/svg/order.svg?skipsvgo';
import { PeriodGap } from '~/types/statblock/PeriodGap';

const currentPeriodGap : Ref<PeriodGap> = ref(PeriodGap.MONTH);
</script>

<template>
    <div class="w-full h-full flex flex-col justify-center items-center ml-[250px]">
            <h2 class="text-[24pt] font-bold">{{ $t("admin.dashboard.title") }}</h2>

            <div class="flex flex-row">
                <StatBlock
                    class="mx-[20px]"
                    :icon="OrderIcon"
                    :title="$t('admin.dashboard.statistic.order')"
                    :number="formatNumberByThousands(1234567)"
                    :period="currentPeriodGap"
                    />

                <StatBlock
                    class="mx-[20px]"
                    :icon="RevenueIcon"
                    :title="$t('admin.dashboard.statistic.revenue')"
                    :number="formatNumberByThousands(1234567)"
                    :period="currentPeriodGap"
                    />
            </div>
    </div>
</template>