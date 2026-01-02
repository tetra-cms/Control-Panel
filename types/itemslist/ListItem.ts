import type { DefineComponent } from "vue";

export interface ListItem {
    title: string;
    emit: string;
    icon?: DefineComponent;
}