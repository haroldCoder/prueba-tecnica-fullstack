import React, { useMemo } from 'react'
import { useFetchUsers } from '@/features/users/infrastructure/hooks'
import { DataTable } from '@/common/components';
import { DataTableUserColumns } from '@/features/users/presentation/data';
import { Spinner } from '@/common/components/ui/spinner';
import { UserTableDTO } from '@/features/users/application/dto';
import stylesTable from '@/common/styles/table.module.css';
import { UserTableActions } from './components';

const Users = () => {
    const { data, isLoading, error } = useFetchUsers();

    const usersTableData = useMemo<UserTableDTO[] | undefined>(() => {
        return data?.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone || '-',
            edit: <UserTableActions userId={user.id} />
        }));
    }, [data]);

    if (isLoading) return (<div className='flex items-center justify-center h-screen'>
        <Spinner />
    </div>)

    return (
        <div className='flex flex-col items-center w-full h-[calc(100vh-135px)]'>
            <div className='w-full max-w-4xl'>
                <DataTable className={stylesTable.table} columns={DataTableUserColumns} data={usersTableData || []} />
            </div>
        </div>
    )
}

export default Users