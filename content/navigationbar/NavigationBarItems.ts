import type { NavigationBarElement } from "~/types/navigationbar/NavigationBarElement.ts";

import StatisticIcon from '~/assets/svg/statistic.svg?skipsvgo';
import OrderIcon from '~/assets/svg/order.svg?skipsvgo';
import ProductIcon from '~/assets/svg/product.svg?skipsvgo';
import UsersIcon from '~/assets/svg/personal.svg?skipsvgo';
import WrenchIcon from '~/assets/svg/wrench.svg?skipsvgo';

export const NavigationBarItems : Array<NavigationBarElement> = [
    {
        icon: StatisticIcon,
        label: "Статистика",
        route: "/dashboard"
    },
    {
        icon: UsersIcon,
        label: "Пользователи",
        route: "/users"
    },
    {
        icon: ProductIcon,
        label: "Товары",
        route: "/items"
    },
    {
        icon: WrenchIcon,
        label: "Категории товаров",
        route: "/categories"
    },
    {
        icon: OrderIcon,
        label: "Заказы",
        route: "/orders"
    }
]