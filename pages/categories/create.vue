<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useCategoriesApi } from '~/composables/Api/useCategoriesApi';
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
        placeholder: t("admin.categories.create_button"),
        type: FieldType.Button
    } as IFormElement,
]

const categoriesApi = useCategoriesApi();
async function createCategory(categoryInfo: ApiCategoryInfo): Promise<boolean> {
    try {
        await categoriesApi.create(categoryInfo);
        await navigateTo("/categories")
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
</script>

<template>
    <div class="w-full min-h-screen flex flex-col items-center py-10 h-fit bg-secondary-light">
        <div class="w-[50%] my-[20px]">
            <NuxtLink class="font-bold" to="/categories">
                {{ $t("admin.categories.back_button") }}
            </NuxtLink>
        </div>
            
        <CustomForm
            :title="$t('admin.categories.create_title')"
            :fields="categoryFields"
            :text-labels="true"
            class="w-[50%] bg-secondary-primary shadow-lg rounded-[10px] p-[40px] border-none"
            @submitinfo="createCategory"
        />
    </div>
</template>