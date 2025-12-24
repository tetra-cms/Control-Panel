import type { DefineComponent } from "vue";

export interface NavigationBarElement {
    icon: DefineComponent,
    label: string,
    category?: string,
    route: string
}