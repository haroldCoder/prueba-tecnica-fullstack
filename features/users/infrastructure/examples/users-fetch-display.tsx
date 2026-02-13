import { useFetchUsers } from "../hooks/use-fetch-users";

// ejemplo de uso de useFetchUsers
export const UsersFetchDisplay = () => {
    const { data, isLoading, error } = useFetchUsers();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {data?.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}