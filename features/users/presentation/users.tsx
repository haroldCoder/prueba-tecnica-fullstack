import React, { useMemo } from 'react'
import { useFetchUsers } from '@/features/users/infrastructure/hooks'
import { DataTable } from '@/common/components';
import { DataTableUserColumns } from '@/features/users/presentation/data';
import { UserTableDTO } from '@/features/users/application/dto';
import stylesTable from '@/common/styles/table.module.css';
import { UserTableActions } from './components';
import { useState } from 'react';
import { QueryParamsDto } from '@/common/infrastructure/dto';

const Users = () => {
    const [params, setParams] = useState<QueryParamsDto>({ page: 1, pageSize: 10 });

    const { data, isLoading } = useFetchUsers({
        params: {
            page: params.page,
            pageSize: params.pageSize
        }
    });

    const usersTableData = useMemo<UserTableDTO[] | undefined>(() => {
        return data?.users.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone || '-',
            edit: <UserTableActions userId={user.id} />
        }));
    }, [data]);

    return (
        <div className='flex flex-col items-center w-full h-[calc(100vh-135px)]'>
            <div className='w-full max-w-4xl'>
                <DataTable
                    className={stylesTable.table}
                    columns={DataTableUserColumns}
                    data={usersTableData || []}
                    pagination={{
                        currentPage: params.page!,
                        pageSize: params.pageSize!,
                        total: data?.total || 0,
                        onPageChange: (page: number) => setParams(prev => ({ ...prev, page })),
                    }}
                    loading={isLoading}
                />
            </div>
        </div>
    )
}

export default Users