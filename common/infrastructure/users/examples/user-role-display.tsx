import { useUserRole } from '@/common/infrastructure/users/hooks';

interface UserRoleDisplayProps {
    userId: string;
}

export function UserRoleDisplay({ userId }: UserRoleDisplayProps) {
    const { data, isLoading, isError, error } = useUserRole(userId);

    if (isLoading) {
        return <div>Loading user role...</div>;
    }

    if (isError) {
        return <div>Error: {error?.message || 'Failed to load user role'}</div>;
    }

    return (
        <div>
            <h3>User Role</h3>
            <p>Role: {data?.role}</p>
        </div>
    );
}
