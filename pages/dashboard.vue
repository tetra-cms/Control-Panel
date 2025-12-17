<script setup lang="ts">
import { NavigationBarItems } from '~/content/navigationbar/NavigationBarItems';

useRedirectUnauthorized();
</script>

<template>
    <div class="w-full h-full flex justify-center flex-col items-center">
        <NagivationBar
            :elements="NavigationBarItems"
            />

        <div class="w-full h-full">
            
        </div>
    </div>
</template>