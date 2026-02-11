import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useAuth } from '@/common/auth/hooks/use-auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Spinner } from '@/common/components/ui/spinner';

const App = ({ Component, pageProps }: AppProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

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

  return <Component {...pageProps} />;
};

export default App;
