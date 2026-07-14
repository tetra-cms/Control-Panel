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

const contentFields : Array<IFormElement> = [
    {
        name: "route",
        placeholder: t("admin.columns.content.route"),
        type: FieldType.Input
    } as IFormElement,
    {
        name: "content",
        placeholder: t("admin.columns.content.content"),
        type: FieldType.TextArea
    } as IFormElement,
    {
        name: "submit",
        placeholder: t("admin.content.create_button"),
        type: FieldType.Button
    } as IFormElement,
]

const contentApi = useContentApi();
async function createPage(content: ApiContent): Promise<boolean> {
    try {
        await contentApi.create(content);
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
            :title="$t('admin.content.create_title')"
            :fields="contentFields"
            :text-labels="true"
            class="w-[50%] bg-secondary-primary shadow-lg rounded-[10px] p-[40px] border-none"
            @submitinfo="createPage"
        />
    </div>
</template>