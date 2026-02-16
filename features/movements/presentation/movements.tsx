import { useAuth } from '@/common/auth/hooks/use-auth';
import { Spinner } from '@/common/components/ui/spinner';
import { useUserRole } from '@/common/infrastructure/users/hooks'
import React, { useMemo } from 'react'
import { useFetchMovements } from '@/features/movements/infrastructure/hooks';
import { DataTable } from '@/common/components/DataTable';
import stylesTable from '@/common/styles/table.module.css';
import { Button } from '@base-ui/react';
import { format } from 'date-fns';
import { dataTableColumns } from './data/data-table';
import Link from 'next/link';
import { UserRoleEnum } from '@/common/domain/users/entities';
import { useState } from 'react';
import { QueryParamsDto } from '@/common/infrastructure/dto';;

const Movements = () => {
    const { user } = useAuth();
    const [params, setParams] = useState<QueryParamsDto>({ page: 1, pageSize: 10 });
    const { data: dataRole, isLoading } = useUserRole(user?.id || '');
    const { data: movementsData, isLoading: movementsLoading } = useFetchMovements({ params });

    const formattedMovements = useMemo(() => {
        if (!movementsData) return []

        return movementsData.movements.map((movement) => ({
            ...movement,
            date: format(new Date(movement.date), 'yyyy/MM/dd'),
        }))
    }, [movementsData])

    if (isLoading) {
        return (
            <div className="flex justify-center h-screen">
                <Spinner />
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center w-full h-[calc(100vh-135px)]">
            <div className="w-full max-w-7xl h-full max-h-[500px]">
                <DataTable
                    className={stylesTable.table}
                    columns={dataTableColumns}
                    data={formattedMovements?.map(movement => ({
                        concept: movement.concept,
                        amount: movement.amount,
                        date: movement.date,
                        user: movement.user.name
                    })) || []}
                    pagination={{
                        currentPage: params.page!,
                        pageSize: params.pageSize!,
                        total: movementsData?.total || 0,
                        onPageChange: (page: number) => setParams(prev => ({ ...prev, page })),
                    }}
                    loading={movementsLoading}
                />
            </div>

            {
                dataRole?.role === UserRoleEnum.ADMIN && (
                    <div className='flex justify-end w-full px-16'>
                        <Link href="/movements/create">
                            <Button className='bg-blueCyan px-4 py-2 rounded-full'>Agregar movimiento</Button>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}

export default Movements