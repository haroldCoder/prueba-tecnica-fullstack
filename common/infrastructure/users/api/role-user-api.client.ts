export interface RoleResponse {
    role: string;
}

export interface RoleError {
    message: string;
}

export async function fetchUserRole(userId: string): Promise<RoleResponse> {
    const response = await fetch(`/api/auth/${userId}/role`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error: RoleError = await response.json();
        throw new Error(error.message || 'Failed to fetch user role');
    }

    return response.json();
}
