import { User } from "@/common/domain/users/entities";
import { ResponseFetchUsersDto } from "@/features/users/infrastructure/dto";
import { QueryParamsDto } from "@/common/infrastructure/dto";

export type UserError = {
    message: string;
}

export const fetchUsers = async (params?: QueryParamsDto): Promise<ResponseFetchUsersDto> => {
    const response = await fetch(`/api/users/all?page=${params?.page}&pageSize=${params?.pageSize}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        const error: UserError = await response.json();
        throw new Error(error.message || 'Failed to fetch users');
    }

    const data: ResponseFetchUsersDto = await response.json();
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