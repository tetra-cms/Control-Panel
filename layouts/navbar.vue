<script setup lang="ts">
import NagivationBar from '~/components/navigationbar/NagivationBar.vue';
import { NavigationBarItems } from '~/content/navigationbar/NavigationBarItems';

watchEffect(async () => {
  useAuthorized();
});
</script>

<template>
  <div class="flex w-full h-full flex-row justify-between bg-secondary-light">
      <NagivationBar
        :elements="NavigationBarItems"
        />
      

      <slot/>
  </div>
</template>