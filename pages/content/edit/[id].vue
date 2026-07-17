<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useContentApi } from '~/composables/Api/useContentApi';
import type ApiContent from '~/types/api/ApiContent';

import type IFormElement from '~/types/form/FormField';
import { FieldType } from '~/types/form/FormField';

definePageMeta({
  layout: 'navbar'
});

const { t } = useI18n();

const route = useRoute();

const contentApi = useContentApi();
const content = await contentApi.getById(Number(route.params.id));

const contentFields : Array<IFormElement> = [
    {
        name: "id",
        placeholder: t("admin.columns.common.id"),
        default: route.params.id,
        type: FieldType.Hidden
    } as IFormElement,
    {
        name: "route",
        placeholder: t("admin.columns.content.route"),
        default: content.route,
        type: FieldType.Input
    } as IFormElement,
    {
        name: "content",
        placeholder: t("admin.columns.content.content"),
        default: content.content,
        type: FieldType.TextArea
    } as IFormElement,
    {
        name: "submit",
        placeholder: t("admin.content.edit_button"),
        type: FieldType.Button
    } as IFormElement,
]

async function editContent(content): Promise<boolean> {
    try {
        content.append("_method", "PUT");
        await contentApi.update(Number(route.params.id), content);
        await navigateTo("/content")
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
</script>

<template>
    <div class="w-full h-full flex flex-col justify-center items-center">
        <div class="w-[50%] my-[20px]">
            <NuxtLink class="font-bold" to="/content">
                {{ $t("admin.content.back_button") }}
            </NuxtLink>
        </div>

        <CustomForm
            :title="$t('admin.content.edit_title')"
            :fields="contentFields"
            :text-labels="true"
            class="w-[50%] bg-secondary-primary shadow-lg rounded-[10px] p-[40px] border-none"
            @submitinfo="editContent"
            />
    </div>
</template>