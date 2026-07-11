<script setup lang="ts">
import { useI18n } from 'vue-i18n';

definePageMeta({
  layout: 'navbar'
});

const { t } = useI18n();
</script>

<template>
    <div class="w-full h-full flex flex-col justify-center items-center">
        <h2 class="w-[50%] text-[24pt] text-left font-bold">{{ $t("admin.users.title") }}</h2>

        <GridList
            endpoint="/admin/users"
            :columns="[
                { key: 'id', label: t('admin.columns.common.id') },
                { key: 'username', label: t('admin.columns.user.username') },
                { key: 'email', label: t('admin.columns.user.email') },
                { key: 'role', label: t('admin.columns.user.role') },
                { key: 'created_at', label: t('admin.columns.common.created_at') },
            ]"
        />
    </div>
</template>