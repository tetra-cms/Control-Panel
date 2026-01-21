<script setup lang="ts">
import type GridListItem from '~/types/gridlist/GridListItem';

definePageMeta({
  layout: 'navbar'
});
</script>

<template>
    <div class="w-full h-full flex flex-col justify-center items-center">
        <h2 class="text-[24pt] font-bold">{{ $t("admin.items.title") }}</h2>
    </div>
</template>