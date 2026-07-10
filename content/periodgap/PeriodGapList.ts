import type { ListItem } from "~/types/itemslist/ListItem";

export const PeriodGapList : Array<ListItem> = [
    {
        title: "День",
        emit: "day"
    },
    {
        title: "Неделя",
        emit: "week"
    },
    {
        title: "Месяц",
        emit: "month"
    }
];