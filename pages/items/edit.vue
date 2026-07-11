<script setup lang="ts">
import { useI18n } from 'vue-i18n';

definePageMeta({
  layout: 'navbar'
});

const { t } = useI18n();
</script>

<template>
    <div class="w-full h-full flex flex-col justify-center items-center">
        <h2 class="w-[50%] text-[24pt] text-left font-bold">{{ $t("admin.items.edit_title") }}</h2>

        
    </div>
</template>