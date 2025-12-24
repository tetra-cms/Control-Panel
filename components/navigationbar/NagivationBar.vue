<script setup lang="ts">
import type { NavigationBarElement } from '~/types/navigationbar/NavigationBarElement';

import TetraIcon from '~/assets/svg/tetra-icon.svg?skipsvgo';
import LeaveIcon from '~/assets/svg/leave.svg?skipsvgo';

const props = defineProps<{
    elements: Array<NavigationBarElement>
}>();
</script>

<template>
    <nav class="w-[250px] fixed left-0 top-0 bottom-0 h-full shadow-lg flex justify-between rounded-[30px] flex-col items-center bg-secondary-primary mx-[20px]">
        <div class="w-full">
            <NuxtLink link="/" class="p-[10px] flex flex-row items-center">
                <TetraIcon class="w-[48px] h-[48px]"/>
                <h1 class="text-[20pt] font-black">TETRA</h1>
            </NuxtLink>
            <p class="text-[12pt] w-full pl-[20px] pt-[20px] text-secondary-wrapper-light">{{ $t("admin.menu.title") }}</p>

            <ul class="flex w-full flex-col justify-center py-[20px]">
                <li v-for="navbarItem in props.elements" :class="'w-full rounded-[15px] p-[15px] px-[20px] transition-all duration-300 ' + (navbarItem.route == $route.path ? 'bg-secondary-wrapper-dark' : '[&>*]:fill-secondary-wrapper-dar hover:bg-secondary-wrapper-light')">
                    <NuxtLink :to="navbarItem.route" class="flex justify-start flex-row items-center">
                        <component 
                        :class="'w-[32px] h-[32px] mr-[5px] ' + (navbarItem.route == $route.path ? '[&>*]:fill-secondary-wrapper-invert' : '[&>*]:fill-secondary-wrapper-dark')" :is="navbarItem.icon"/>
                        <p 
                        :class="'text-[12pt] ' + (navbarItem.route == $route.path ? 'text-secondary-wrapper-invert' : 'text-secondary-wrapper-dark')">{{ navbarItem.label }}</p>
                    </NuxtLink>
                </li>
            </ul>
        </div>
        
        <a href="/" class="flex flex-row items-center">
            <LeaveIcon class="w-[32px] h-[48px]"/>
            <p class="text-[12pt] font-medium">{{ $t("admin.menu.leave") }}</p>
        </a>
    </nav>
</template>