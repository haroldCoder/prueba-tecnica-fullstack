import { authClient } from '@/common/auth/client';

export const useAuth = () => {
    const session = authClient.useSession();

    return {
        user: session.data?.user,
        session: session.data?.session,
        isLoading: session.isPending,
        isAuthenticated: !!session.data?.user,
    };
};
