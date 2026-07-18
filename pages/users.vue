<script setup lang="ts">
import { useI18n } from 'vue-i18n';

definePageMeta({
  layout: 'navbar'
});

const { t } = useI18n();
</script>

<template>
    <div class="w-full min-h-screen flex flex-col items-center py-10 h-fit bg-secondary-light">
        <h2 class="w-[50%] text-[24pt] text-left font-bold">{{ $t("admin.users.title") }}</h2>

        <GridList
            endpoint="/admin/users"
            :columns="[
                { key: 'id', label: t('admin.columns.common.id') },
                { key: 'username', label: t('admin.columns.user.username') },
                { key: 'email', label: t('admin.columns.user.email') },
                { 
                    key: 'role', 
                    label: t('admin.columns.user.role'),
                    formatter: (value: string) => {
                        switch(value) {
                            case 'USER': {
                                return t('common.roles.user');
                            }

                            case 'EMPLOYEE': {
                                return t('common.roles.employee');
                            }

                            case 'ADMIN': {
                                return t('common.roles.admin');
                            }

                            default: return t('common.roles.user');
                        }
                    }
                },
                { 
                    key: 'created_at', 
                    label: t('admin.columns.common.created_at'), 
                    formatter: (value: string) => {
                        if (!value) {
                            return t('common.none')
                        }

                        const date = new Date(value);
                        const pad = (num: number) => String(num).padStart(2, '0');
                        return `${pad(date.getHours())}:${pad(date.getMinutes())} ${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()}`;
                    }
                },
            ]"
        />
    </div>
</template>