<script setup lang="ts">
import type { NavigationBarElement } from '~/types/navigationbar/NavigationBarElement';

import TetraIcon from '~/assets/svg/tetra-icon.svg?skipsvgo';
import LeaveIcon from '~/assets/svg/leave.svg?skipsvgo';

const props = defineProps<{
    elements: Array<NavigationBarElement>
}>();
</script>

<template>
    <div class="w-[250px] fixed left-0 top-0 bottom-0 h-full shadow-lg flex justify-between flex-col items-center">

        <div class="w-full">
            <div class="p-[10px] flex flex-row items-center">
                <TetraIcon class="w-[48px] h-[48px]"/>
                <h1 class="text-[20pt] font-black">TETRA</h1>
            </div>
            <p class="text-[10pt] w-full pl-[20px] pt-[20px] text-secondary-wrapper-light">{{ $t("admin.menu.title") }}</p>

            <ul class="flex w-full flex-col justify-center py-[20px]">
                <li v-for="navbarItem in props.elements" :class="'w-full p-[15px] px-[20px] transition-all duration-300 hover:bg-secondary-wrapper-light ' + (navbarItem.route == $route.path ? 'bg-secondary-wrapper-dark' : '[&>*]:fill-secondary-wrapper-dark')">
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
    </div>
</template>