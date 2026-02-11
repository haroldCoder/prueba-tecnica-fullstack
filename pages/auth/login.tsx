import { authClient } from '@/common/auth/client';
import { Button } from '@/common/components/ui/button';
import { Spinner } from '@/common/components/ui/spinner';
import { Github } from 'lucide-react';
import { useState } from 'react';

const LoginPage = () => {
    const [loading, setLoading] = useState(false);

    const handleGithubLogin = async () => {
        setLoading(true);
        await authClient.signIn.social({
            provider: 'github',
            callbackURL: '/',
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
            <div className="relative z-10 w-full max-w-md px-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 space-y-8">
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mb-4">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-white">Bienvenido</h1>
                        <p className="text-gray-300">
                            Inicia sesión para acceder a tu cuenta
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Button
                            onClick={handleGithubLogin}
                            className="w-full h-12 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                            size="lg"
                        >
                            <Github className="w-5 h-5" />
                            Continuar con GitHub
                        </Button>
                    </div>

                    <div className="text-center text-sm text-gray-400">
                        <p>
                            Al continuar, aceptas nuestros términos de servicio y política de
                            privacidad
                        </p>
                    </div>
                </div>
            </div>
            {
                loading && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <Spinner />
                    </div>
                )
            }
        </div>
    );
};

export default LoginPage;
