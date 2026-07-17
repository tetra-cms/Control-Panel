<script lang="ts" setup>
import { useI18n } from "vue-i18n";

import IconCloud from '~/assets/svg/cloud.svg';
import IconFile from '~/assets/svg/file.svg';

const { t } = useI18n();

const props = defineProps<{
    maxSize: number,
    extensions?: string[],
    modelValue?: File | null
}>();

const fileInput = useTemplateRef("fileInput");
function openFileDialog()
{
    fileInput.value?.click();
}

const internalFile = ref<File>();
const currentFile = computed(() => {
    return props.modelValue !== undefined
        ? props.modelValue
        : internalFile.value;
})

const emit = defineEmits<{
    (e: "update:modelValue", value: File | null): void
    (e: "fileChange", value: File): void
}>();

const errorMessage = ref("");
const onFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (!file) return;

    if (file.size <= 10000) { 
        errorMessage.value = "file-upload.errors.zero-size";
        return;
    }

    if ((file.size / 1048576) <= props.maxSize)
    {
        if (!props.extensions || (props.extensions && props.extensions.includes(String(file.name.split(".")[1]))))
        {
            if (props.modelValue !== undefined) {
                emit("update:modelValue", file);
            } else {
                internalFile.value = file;
            }

            emit("fileChange", file);
            errorMessage.value = "";
        } else {
            errorMessage.value = "file-upload.errors.wrong-extension";
        }
    } else {
        errorMessage.value = "file-upload.errors.size-limit";
    }
}

function clearFile() {
    if (props.modelValue !== undefined) {
        emit("update:modelValue", null);
    } else {
        internalFile.value = undefined;
    }

    if (fileInput.value) {
        fileInput.value.value = "";
    }
}
</script>


<template>
    <div
        v-if="!currentFile"
        @click="openFileDialog"
        class="p-2 flex flex-col justify-center items-center border-dashed border-2 border-light-secondary-light dark:border-dark-secondary-light">
        
        <input 
            ref="fileInput"
            type="file" 
            class="hidden"
            :accept="extensions?.map(elem => '.' + elem).join(',')"
            @change="onFileChange"
        />
        
        <IconCloud 
            class="[&>*]:fill-light-primary-primary dark:[&>*]:fill-dark-primary-primary w-[48px] h-[48px]"/>
        
        <div class="text-center" v-if="!errorMessage.length">
            <p>{{ t("file-upload.title") }}</p>
            <p class="text-sm">
                {{ t("file-upload.placeholder") + ' ' + maxSize + ' ' + t("uom.megabyte") }} 
                {{ extensions ? (t("file-upload.placeholder-extensions") + ' ' + extensions.join(", ")) : "" }}
            </p>
        </div>

        <div class="text-center" v-else>
            <p>
                {{ t("file-upload.placeholder", { size: maxSize + t("uom.megabyte") }) }} 
            </p>
            <p class="text-red-700">{{ t(errorMessage) }}</p>
        </div>
    </div>

    <ul
        class="border-2 rounded-lg border-light-secondary-light dark:border-dark-secondary-light" 
        v-else>
        <li class="py-[10px] flex flex-row justify-between">
            <div class="flex gap-[5px] flex-row items-center">
                <IconFile
                    class="w-[36px] h-[36px] [&>*]:stroke-light-primary-primary dark:[&>*]:stroke-dark-primary-primary"
                    />

                <p class="font-medium">
                    {{ currentFile.name }}
                </p>

                <p>
                    ({{ Math.floor(currentFile.size / 1048576) }} {{ t("uom.megabyte") }})
                </p>
            </div>

            <button
                @click="clearFile"
                class="px-[7px] rounded-md hover:[&>*]:fill-secondary-primary">
                X
            </button>
        </li>
    </ul>
</template>