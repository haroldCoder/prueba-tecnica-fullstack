import { StaticImageData } from 'next/image';
import { routes } from '@/common/constants/routes';

import IconIncome from '@/common/assets/income.svg';
import IconUsers from '@/common/assets/users.svg';
import IconReport from '@/common/assets/report.svg';
import { UserRole } from '@/common/domain/users/entities';

export interface CardDashboardFeature {
    href: string;
    title: string;
    image: StaticImageData;
    alt: string;
    items: string[];
    roles: UserRole[];
}

export const cardDashboardFeatures: CardDashboardFeature[] = [
    {
        href: routes.movements,
        title: 'Sistema de gestión de ingresos y gastos',
        image: IconIncome,
        alt: 'Icon Income',
        items: [
            'Vista de Ingresos y Egresos',
            'Formulario de Nuevo Ingreso/Egreso',
        ],
        roles: ['ADMIN', 'USER']
    },
    {
        href: routes.users,
        title: 'Gestión de usuarios',
        image: IconUsers,
        alt: 'Icon Users',
        items: [
            'Vista de Usuarios',
            'Edición de Usuario',
        ],
        roles: ['ADMIN']
    },
    {
        href: routes.reports,
        title: 'Reportes',
        image: IconReport,
        alt: 'Icon Report',
        items: [
            'Gráfico de movimientos financieros',
            'Mostrar el saldo actual',
            'Descargar el reporte en formato CSV',
        ],
        roles: ['ADMIN']
    },
];