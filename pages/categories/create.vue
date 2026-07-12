<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type ApiCategoryInfo from '~/types/api/ApiCategoryInfo';
import type IFormElement from '~/types/form/FormField';
import { FieldType } from '~/types/form/FormField';

definePageMeta({
  layout: 'navbar'
});

const { t } = useI18n();

const categoryFields : Array<IFormElement> = [
    {
        name: "name",
        placeholder: t("admin.columns.common.techinal_name"),
        type: FieldType.Input
    } as IFormElement,
    {
        name: "title",
        placeholder: t("admin.columns.common.name"),
        type: FieldType.Input
    } as IFormElement,
    {
        name: "icon_url",
        placeholder: t("admin.columns.common.icon_name"),
        type: FieldType.Input
    } as IFormElement,
    {
        name: "submit",
        placeholder: t("admin.items.create_button"),
        type: FieldType.Button
    } as IFormElement,
]

async function createCategory(categoryInfo: ApiCategoryInfo) {
    
}
</script>

<template>
    <div class="w-full h-full flex flex-col justify-center items-center">
        <CustomForm
            :title="$t('admin.items.create_title')"
            :fields="categoryFields"
            :text-labels="true"
            class="w-[50%] bg-secondary-primary shadow-lg rounded-[10px] p-[40px]"
            @submitinfo="createCategory"
            />
    </div>
</template>