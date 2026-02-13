import React from 'react';
import { Button } from '@/common/components/ui/button';
import { FaEdit } from "react-icons/fa";
import Link from 'next/link';

interface UserTableActionsProps {
    userId: string;
}

export const UserTableActions: React.FC<UserTableActionsProps> = ({ userId }) => {
    return (
        <Link href={`/users/${userId}`}>
            <Button
                className='bg-transparent hover:bg-blueCyan text-gray-400 hover:text-white  px-2 py-1 rounded-xl'
            >
                <FaEdit size={20} />
            </Button>
        </Link >
    );
};
