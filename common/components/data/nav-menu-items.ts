import { routes } from '@/common/constants/routes';
import { UserRole } from '@/common/domain/users/entities';

export interface NavMenuItem {
    href: string;
    label: string;
    roles: UserRole[];
}

export const navMenuItems: NavMenuItem[] = [
    {
        href: routes.movements,
        label: 'Ingresos y Egresos',
        roles: ['ADMIN', 'USER']
    },
    {
        href: routes.users,
        label: 'Usuarios',
        roles: ['ADMIN']
    },
    {
        href: routes.reports,
        label: 'Reportes',
        roles: ['ADMIN']
    },
    {
        href: routes.docs,
        label: 'Desarrolladores',
        roles: ['ADMIN']
    }
];
