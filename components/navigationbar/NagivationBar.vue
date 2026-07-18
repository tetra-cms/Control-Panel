<script setup lang="ts">
import { computed } from "vue";
import type { NavigationBarElement } from "~/types/navigationbar/NavigationBarElement";

import TetraIcon from "~/assets/svg/tetra-icon.svg?skipsvgo";
import LeaveIcon from "~/assets/svg/leave.svg?skipsvgo";

const props = defineProps<{
    elements: NavigationBarElement[]
}>();

const groupedElements = computed(() => {
    const groups: Record<string, NavigationBarElement[]> = {};

    for (const element of props.elements) {
        const category = element.category ?? "";

        if (!groups[category]) {
            groups[category] = [];
        }

        groups[category].push(element);
    }

    return Object.entries(groups).map(([category, elements]) => ({
        category,
        elements
    }));
});
</script>

<template>
    <DesktopOnly>
        <nav class="w-[250px] fixed left-0 top-0 bottom-0 h-full shadow-lg flex justify-between rounded-[30px] flex-col items-center bg-secondary-primary mx-[20px] overflow-y-auto">
            <div class="w-full">
                <NuxtLink link="../" class="p-[10px] flex flex-row items-center">
                    <TetraIcon class="w-[48px] h-[48px]"/>
                    <h1 class="text-[20pt] font-black">TETRA</h1>
                </NuxtLink>

                <div class="py-[10px] ">
                    <template v-for="group in groupedElements" :key="group.category">
                        <p
                            v-if="group.category"
                            class="px-[20px] pb-[5px] pt-[5px] text-[10pt] font-medium uppercase text-secondary-wrapper-light"
                        >
                            {{ group.category }}
                        </p>

                        <ul class="flex w-full flex-col justify-center">
                            <li
                                v-for="navbarItem in group.elements"
                                :key="navbarItem.route"
                                :class="'w-full rounded-[15px] p-[15px] px-[20px] transition-all duration-300 ' +
                                    (navbarItem.route == $route.path
                                        ? 'bg-secondary-wrapper-dark'
                                        : 'hover:bg-secondary-wrapper-light')"
                            >
                                <NuxtLink
                                    :to="navbarItem.route"
                                    class="flex justify-start flex-row items-center"
                                >
                                    <component
                                        :is="navbarItem.icon"
                                        :class="'w-[24px] h-[24px] mr-[5px] ' +
                                            (navbarItem.route == $route.path
                                                ? '[&>*]:fill-secondary-wrapper-invert'
                                                : '[&>*]:fill-secondary-wrapper-dark')"
                                    />

                                    <p
                                        :class="'text-[12pt] ' +
                                            (navbarItem.route == $route.path
                                                ? 'text-secondary-wrapper-invert'
                                                : 'text-secondary-wrapper-dark')"
                                    >
                                        {{ navbarItem.label }}
                                    </p>
                                </NuxtLink>
                            </li>
                        </ul>
                    </template>
                </div>
            </div>
            
            <a href="/" class="flex flex-row items-center mb-[10px]">
                <LeaveIcon class="w-[32px] h-[48px]"/>
                <p class="text-[12pt] font-medium">{{ $t("admin.menu.leave") }}</p>
            </a>
        </nav>
    </DesktopOnly>

    <MobileOnly>
        
    </MobileOnly>
</template>