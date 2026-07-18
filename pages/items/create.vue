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

const categoriesApi = useCategoriesApi();
const categories = await categoriesApi.getFormItems();

const productFields : Array<IFormElement> = [
    {
        name: "name",
        placeholder: t("admin.columns.common.name"),
        type: FieldType.Input
    } as IFormElement,
    {
        name: "description",
        placeholder: t("admin.columns.product.description"),
        type: FieldType.TextArea
    } as IFormElement,
    {
        name: "image",
        placeholder: t("admin.columns.product.upload-image"),
        type: FieldType.Upload,
        maxSize: 30,
        extensions: ["png", "jpg", "jpeg"]
    },
    {
        name: "category_id",
        placeholder: t("admin.columns.product.category"),
        type: FieldType.List,
        listItems: categories
    } as IFormElement,
    {
        name: "price",
        placeholder: t("admin.columns.product.price"),
        type: FieldType.Input
    } as IFormElement,
    {
        name: "supply_quantum",
        placeholder: t("admin.columns.product.supply_quantum"),
        type: FieldType.Input
    } as IFormElement,
    {
        name: "stock",
        placeholder: t("admin.columns.product.stock"),
        type: FieldType.Input
    } as IFormElement,
    {
        name: "submit",
        placeholder: t("admin.items.create_button"),
        type: FieldType.Button
    } as IFormElement,
]

const productApi = useProductApi();
async function createProduct(productInfo): Promise<boolean> {
    try {
        const image = productInfo.get("image") as File | null;

        const product = await productApi.create(productInfo);

        if (image && image.size > 0) {
            await productApi.uploadImage(product.id, image);
        }

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
            :title="$t('admin.items.create_title')"
            :fields="productFields"
            :text-labels="true"
            class="w-[50%] bg-secondary-primary shadow-lg rounded-[10px] p-[40px] border-none"
            @submitinfo="createProduct"
            />
    </div>
</template>