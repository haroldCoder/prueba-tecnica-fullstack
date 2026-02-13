import { User } from "@/common/domain/users/entities";

export type UserError = {
    message: string;
}

export const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch('/api/users/all');

    if (!response.ok) {
        const error: UserError = await response.json();
        throw new Error(error.message || 'Failed to fetch users');
    }

    const data: User[] = await response.json();
    return data;
}

export const fetchUserById = async (userId: string): Promise<User> => {
    const response = await fetch(`/api/user/${userId}`);

    if (!response.ok) {
        const error: UserError = await response.json();
        throw new Error(error.message || 'Failed to fetch user');
    }

    const data: User = await response.json();
    return data;
}

export const updateUser = async (userId: string, data: { name: string; role: string }): Promise<User> => {
    const response = await fetch(`/api/user/${userId}/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    console.log(response);


    if (!response.ok) {
        const error: UserError = await response.json();
        throw new Error(error.message || 'Failed to update user');
    }

    const result: User = await response.json();
    console.log(result);

    return result;
}