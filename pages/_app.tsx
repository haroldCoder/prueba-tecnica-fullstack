import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useAuth } from '@/common/auth/hooks/use-auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Spinner } from '@/common/components/ui/spinner';
import { NavMenuMain } from '@/common/components/NavMenuMain';

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

  return (
    <>
      {isAuthenticated && <NavMenuMain />}
      <div className={!isAuthenticated ? "" : "p-4"}>
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default App;
