<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useMailConfigurationApi } from "~/composables/Api/useMailConfigurationApi";
import type ApiMailConfiguration from "~/types/api/ApiMailConfiguration";

import type IFormElement from "~/types/form/FormField";
import { FieldType } from "~/types/form/FormField";

definePageMeta({
    layout: "navbar",
});

const { t } = useI18n();

const mailApi = useMailConfigurationApi();
const configuration = await mailApi.get();

const configurationFields: Array<IFormElement> = [
    {
        name: "mailer",
        placeholder: t("admin.columns.mail.mailer"),
        default: configuration.mailer,
        type: FieldType.Input,
    },
    {
        name: "scheme",
        placeholder: t("admin.columns.mail.scheme"),
        default: configuration.scheme,
        type: FieldType.Input,
    },
    {
        name: "host",
        placeholder: t("admin.columns.mail.host"),
        default: configuration.host,
        type: FieldType.Input,
    },
    {
        name: "port",
        placeholder: t("admin.columns.mail.port"),
        default: String(configuration.port),
        type: FieldType.Input,
    },
    {
        name: "username",
        placeholder: t("admin.columns.mail.username"),
        default: configuration.username,
        type: FieldType.Input,
    },
    {
        name: "password",
        placeholder: t("admin.columns.mail.password"),
        default: configuration.password,
        type: FieldType.InputPassword,
    },
    {
        name: "from_address",
        placeholder: t("admin.columns.mail.from_address"),
        default: configuration.from_address,
        type: FieldType.InputEmail,
    },
    {
        name: "from_name",
        placeholder: t("admin.columns.mail.from_name"),
        default: configuration.from_name,
        type: FieldType.Input,
    },
    {
        name: "submit",
        placeholder: t("common.actions.save_changes"),
        type: FieldType.Button,
    },
];

async function editConfiguration(
    configuration: ApiMailConfiguration
): Promise<boolean> {
    try {
        await mailApi.update(configuration);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
</script>

<template>
    <div class="w-full h-full flex flex-col justify-center items-center">
        <CustomForm
            :title="$t('admin.mail.title')"
            :fields="configurationFields"
            :text-labels="true"
            class="w-[50%] bg-secondary-primary shadow-lg rounded-[10px] p-[40px] border-none"
            @submitinfo="editConfiguration"
        />
    </div>
</template>