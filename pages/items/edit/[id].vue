<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import { useCategoriesApi } from '~/composables/Api/useCategoriesApi';
import { useProductApi } from '~/composables/Api/useProductApi';
import type ApiProductInfo from '~/types/api/ApiProductInfo';

import type IFormElement from '~/types/form/FormField';
import { FieldType } from '~/types/form/FormField';

definePageMeta({
  layout: 'navbar'
});

const { t } = useI18n();

const route = useRoute();

const categoriesApi = useCategoriesApi();
const categories = await categoriesApi.getFormItems();

const productApi = useProductApi();
const product = await productApi.getById(Number(route.params.id));

const productFields : Array<IFormElement> = [
    {
        name: "id",
        placeholder: 'id',
        default: route.params.id,
        type: FieldType.Hidden
    } as IFormElement,
    {
        name: "name",
        placeholder: t("admin.columns.common.name"),
        default: product.name,
        type: FieldType.Input
    } as IFormElement,
    {
        name: "description",
        placeholder: t("admin.columns.product.description"),
        default: product.description,
        type: FieldType.TextArea
    } as IFormElement,
    {
        name: "category_id",
        placeholder: t("admin.columns.product.category"),
        default: product.category?.id,
        type: FieldType.List,
        listItems: categories
    } as IFormElement,
    {
        name: "price",
        placeholder: t("admin.columns.product.price"),
        default: String(product.price),
        type: FieldType.Input
    } as IFormElement,
    {
        name: "supply_quantum",
        placeholder: t("admin.columns.product.supply_quantum"),
        default: String(product.supply_quantum),
        type: FieldType.Input
    } as IFormElement,
    {
        name: "stock",
        placeholder: t("admin.columns.product.stock"),
        default: String(product.stock),
        type: FieldType.Input
    } as IFormElement,
    {
        name: "submit",
        placeholder: t("admin.items.edit_button"),
        type: FieldType.Button
    } as IFormElement,
]

async function editProduct(productInfo): Promise<boolean> {
    try {
        productInfo.append("_method", "PUT");
        await productApi.update(Number(route.params.id), productInfo);
        await navigateTo("/items")
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
            <NuxtLink class="font-bold" to="/items">
                {{ $t("admin.items.back_button") }}
            </NuxtLink>
        </div>

        <CustomForm
            :title="$t('admin.items.edit_title')"
            :fields="productFields"
            :text-labels="true"
            class="w-[50%] bg-secondary-primary shadow-lg rounded-[10px] p-[40px] border-none"
            @submitinfo="editProduct"
            />
    </div>
</template>