import type { NavigationBarElement } from "~/types/navigationbar/NavigationBarElement.ts";

import StatisticIcon from '~/assets/svg/statistic.svg?skipsvgo';
import OrderIcon from '~/assets/svg/order.svg?skipsvgo';
import ProductIcon from '~/assets/svg/product.svg?skipsvgo';

export const NavigationBarItems : Array<NavigationBarElement> = [
    {
        icon: StatisticIcon,
        label: "Статистика",
        route: "/dashboard"
    },
    {
        icon: ProductIcon,
        label: "Товары",
        route: "/items"
    },
    {
        icon: OrderIcon,
        label: "Заказы",
        route: "/orders"
    }
]