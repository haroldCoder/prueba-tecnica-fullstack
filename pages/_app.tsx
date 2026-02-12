import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useAuth } from '@/common/auth/hooks/use-auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Spinner } from '@/common/components/ui/spinner';
import { NavMenuMain } from '@/common/components/NavMenuMain';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const App = ({ Component, pageProps }: AppProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            gcTime: 5 * 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const publicRoutes = ['/auth/login'];
  const isPublicRoute = publicRoutes.includes(router.pathname);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isPublicRoute) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, isPublicRoute, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated && !isPublicRoute) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Spinner />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      {isAuthenticated && user && <NavMenuMain userId={user.id} />}
      <div className={!isAuthenticated ? "" : "p-4"}>
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
};

export default App;
