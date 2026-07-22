import type { NavigationBarElement } from "~/types/navigationbar/NavigationBarElement.ts";

import StatisticIcon from '~/assets/svg/statistic.svg?skipsvgo';
import OrderIcon from '~/assets/svg/order.svg?skipsvgo';
import ProductIcon from '~/assets/svg/product.svg?skipsvgo';
import UsersIcon from '~/assets/svg/personal.svg?skipsvgo';
import WrenchIcon from '~/assets/svg/wrench.svg?skipsvgo';

import EyeIcon from '~/assets/svg/eye.svg?skipsvgo';
import MailIcon from '~/assets/svg/mail.svg?skipsvgo';
import GearIcon from '~/assets/svg/gear.svg?skipsvgo';

import { i18n } from '~/plugins/i18n';
const { t } = i18n.global;

export const NavigationBarItems : Array<NavigationBarElement> = [
    {
        icon: StatisticIcon,
        label: t('admin.nav.items.dashboard'),
        category: t('admin.nav.category.statistic'),
        route: "/dashboard"
    },
    {
        icon: ProductIcon,
        label: t('admin.nav.items.products'),
        category: t('admin.nav.category.products'),
        route: "/items"
    },
    {
        icon: WrenchIcon,
        label: t('admin.nav.items.categories-products'),
        category: t('admin.nav.category.products'),
        route: "/categories"
    },
    {
        icon: OrderIcon,
        label: t('admin.nav.items.orders'),
        category: t('admin.nav.category.reports'),
        route: "/orders"
    },
    {
        icon: UsersIcon,
        label: t('admin.nav.items.users'),
        category: t('admin.nav.category.system'),
        route: "/users"
    },
    {
        icon: EyeIcon,
        label: t('admin.nav.items.content-pages'),
        category: t('admin.nav.category.system'),
        route: "/content/"
    },
    {
        icon: MailIcon,
        label: t('admin.nav.items.mailer'),
        category: t('admin.nav.category.system'),
        route: "/mailer"
    },
    {
        icon: GearIcon,
        label: t('admin.nav.items.settings'),
        category: t('admin.nav.category.system'),
        route: "/settings"
    },
]