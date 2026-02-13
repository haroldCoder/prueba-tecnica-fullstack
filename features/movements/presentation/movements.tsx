import { useAuth } from '@/common/auth/hooks/use-auth';
import { Spinner } from '@/common/components/ui/spinner';
import { useUserRole } from '@/common/infrastructure/users/hooks'
import React, { useMemo } from 'react'
import { useFetchMovements } from '@/features/movements/infrastructure/hooks';
import { DataTable } from '@/common/components/DataTable';
import styles from './styles/movements.module.css';
import { Button } from '@base-ui/react';
import { format } from 'date-fns';
import { dataTableColumns } from './data/data-table';

const Movements = () => {
    const { user } = useAuth();
    const { data, isLoading } = useUserRole(user?.id || '');
    const { data: movements, isLoading: movementsLoading } = useFetchMovements();

    const formattedMovements = useMemo(() => {
        if (!movements) return []

        return movements.map((movement) => ({
            ...movement,
            date: format(new Date(movement.date), 'yyyy/MM/dd'),
        }))
    }, [movements])

    if (isLoading || movementsLoading) {
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
                    className={styles.movementsTable}
                    columns={dataTableColumns}
                    data={formattedMovements?.map(movement => ({
                        concept: movement.concept,
                        amount: movement.amount,
                        date: movement.date,
                        user: movement.user.name
                    })) || []}
                />
            </div>
            <div className='flex justify-end w-full px-16'>
                <Button className='bg-blueCyan px-4 py-2 rounded-full'>Agregar movimiento</Button>
            </div>
        </div>
    )
}

export default Movements