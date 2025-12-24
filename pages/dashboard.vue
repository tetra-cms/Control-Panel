<script setup lang="ts">
import { NavigationBarItems } from '~/content/navigationbar/NavigationBarItems';

useRedirectUnauthorized();
</script>

<template>
    <div class="flex w-full h-full flex-row justify-between bg-secondary-light">
        <NagivationBar
            :elements="NavigationBarItems"
            />

        <div class="w-full h-full flex flex-col justify-center items-center ml-[250px]">
            <h2 class="text-[24pt] font-bold">{{ $t("admin.dashboard.title") }}</h2>

            <div class="flex flex-row">
                <StatBlock
                    class="mx-[20px]"
                    :title="$t('admin.dashboard.statistic.order')"
                    :number="formatNumberByThousands(1234567)"
                    />

                <StatBlock
                    class="mx-[20px]"
                    :title="$t('admin.dashboard.statistic.revenue')"
                    :number="formatNumberByThousands(1234567)"
                    />
            </div>
        </div>
    </div>
</template>