import type { NavigationBarElement } from "~/types/navigationbar/NavigationBarElement.ts";

import StatisticIcon from '~/assets/svg/statistic.svg?skipsvgo';
import OrderIcon from '~/assets/svg/order.svg?skipsvgo';
import ProductIcon from '~/assets/svg/product.svg?skipsvgo';
import UsersIcon from '~/assets/svg/personal.svg?skipsvgo';
import WrenchIcon from '~/assets/svg/wrench.svg?skipsvgo';

import EyeIcon from '~/assets/svg/eye.svg?skipsvgo';
import MailIcon from '~/assets/svg/mail.svg?skipsvgo';
import GearIcon from '~/assets/svg/gear.svg?skipsvgo';


export const NavigationBarItems : Array<NavigationBarElement> = [
    {
        icon: StatisticIcon,
        label: "Статистика",
        category: "Статистика",
        route: "/dashboard"
    },
    {
        icon: ProductIcon,
        label: "Товары",
        category: "Товары",
        route: "/items"
    },
    {
        icon: WrenchIcon,
        label: "Категории товаров",
        category: "Товары",
        route: "/categories"
    },
    {
        icon: OrderIcon,
        label: "Заказы",
        category: "Отчёты",
        route: "/orders"
    },
    {
        icon: UsersIcon,
        label: "Пользователи",
        category: "Система",
        route: "/users"
    },
    {
        icon: EyeIcon,
        label: "Страницы контента",
        category: "Система",
        route: "/content/"
    },
    {
        icon: MailIcon,
        label: "Рассылка",
        category: "Система",
        route: "/mailer"
    },
    {
        icon: GearIcon,
        label: "Настройки",
        category: "Система",
        route: "/settings"
    },
]