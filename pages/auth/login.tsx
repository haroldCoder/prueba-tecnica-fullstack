import { authClient } from '@/common/auth/client';
import { Button } from '@/common/components/ui/button';
import { Spinner } from '@/common/components/ui/spinner';
import { Github } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleGithubLogin = async () => {
    setLoading(true);
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/',
    });
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await authClient.signIn.email({
      email,
      password,
      callbackURL: '/',
    });

    if (result.error) {
      setError(result.error.message ?? 'Credenciales incorrectas');
      setLoading(false);
      return;
    }

    router.push('/');
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className='relative z-10 w-full max-w-md px-6'>
        <div className='bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 space-y-6'>
          {/* Header */}
          <div className='text-center space-y-2'>
            <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mb-4'>
              <svg
                className='w-8 h-8 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                />
              </svg>
            </div>
            <h1 className='text-3xl font-bold text-white'>Bienvenido</h1>
            <p className='text-gray-300'>
              Inicia sesión para acceder a tu cuenta
            </p>
          </div>

          {/* Formulario email/contraseña */}
          <form onSubmit={handleEmailLogin} className='space-y-4'>
            <div className='space-y-2'>
              <label htmlFor='email' className='block text-sm font-medium text-gray-300'>
                Correo electrónico
              </label>
              <input
                id='email'
                type='email'
                autoComplete='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='correo@ejemplo.com'
                className='w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
              />
            </div>

            <div className='space-y-2'>
              <label htmlFor='password' className='block text-sm font-medium text-gray-300'>
                Contraseña
              </label>
              <input
                id='password'
                type='password'
                autoComplete='current-password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='••••••••'
                className='w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
              />
            </div>

            {error && (
              <p className='text-sm text-red-400 bg-red-900/30 border border-red-500/30 rounded-lg px-4 py-2'>
                {error}
              </p>
            )}

            <Button
              type='submit'
              className='w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]'
              size='lg'
              disabled={loading}
            >
              Iniciar sesión
            </Button>
          </form>

          {/* Separador */}
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-white/20' />
            </div>
            <div className='relative flex justify-center text-xs text-gray-400'>
              <span className='px-2 bg-transparent'>o continúa con</span>
            </div>
          </div>

          {/* GitHub */}
          <Button
            onClick={handleGithubLogin}
            className='w-full h-12 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]'
            size='lg'
            disabled={loading}
          >
            <Github className='w-5 h-5' />
            Continuar con GitHub
          </Button>

          <div className='text-center text-sm text-gray-400'>
            <p>
              Al continuar, aceptas nuestros términos de servicio y política de
              privacidad
            </p>
          </div>
        </div>
      </div>

      {loading && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default LoginPage;
