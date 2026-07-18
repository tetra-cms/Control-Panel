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

const route = useRoute();

const categoriesApi = useCategoriesApi();
const category = await categoriesApi.getById(Number(route.params.id));

const categoryFields : Array<IFormElement> = [
    {
        name: "id",
        placeholder: '',
        default: route.params.id,
        type: FieldType.Hidden
    } as IFormElement,
    {
        name: "name",
        placeholder: t("admin.columns.common.techinal_name"),
        default: category.name,
        type: FieldType.Input
    } as IFormElement,
    {
        name: "title",
        placeholder: t("admin.columns.common.name"),
        default: category.title,
        type: FieldType.Input
    } as IFormElement,
    {
        name: "icon_url",
        placeholder: t("admin.columns.common.icon_name"),
        default: category.icon_url,
        type: FieldType.Input
    } as IFormElement,
    {
        name: "submit",
        placeholder: t("admin.categories.edit_button"),
        type: FieldType.Button
    } as IFormElement,
]

async function editCategory(categoryInfo): Promise<boolean> {
    try {
        categoryInfo.append("_method", "PUT");
        await categoriesApi.update(Number(route.params.id), categoryInfo);
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
            :title="$t('admin.categories.edit_title')"
            :fields="categoryFields"
            :text-labels="true"
            class="w-[50%] bg-secondary-primary shadow-lg rounded-[10px] p-[40px] border-none"
            @submitinfo="editCategory"
            />
    </div>
</template>