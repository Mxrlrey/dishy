import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import {InverseButton, PrimaryButton} from '@/Components';

export default function Welcome({ auth }: PageProps) {
    return (
        <GuestLayout>
            <Head title="Bem-vindo" />

            <div className="text-center">
                {/* Dishy */}
                <h1 className="text-4xl font-black text-gray-900 mb-2">
                    Dishy<span className="text-red-600">.</span>
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
                    Seu cardápio digital.
                </p>

                <div className="flex flex-col gap-3">
                    {auth.user ? (
                        <Link href={route('dashboard')} className="w-full">
                            <PrimaryButton className="w-full justify-center py-3">
                                Acessar Painel
                            </PrimaryButton>
                        </Link>
                    ) : (
                        <div className="flex flex-col gap-6 items-center">
                            {/* Seção de Login */}
                            <Link href={route('login')}>
                                <PrimaryButton
                                    icon="fa-sign-in"
                                >
                                    Entrar no Sistema
                                </PrimaryButton>
                            </Link>

                            {/* Seção de Cadastro */}
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-sm text-gray-600 font-medium">
                                    Ainda não tem uma conta?
                                </span>

                                <Link href={route('register')}>
                                    <InverseButton
                                        icon="fa-user-plus"
                                        className="shadow-md hover:shadow-lg transition-shadow"
                                    >
                                        Cadastre-se agora
                                    </InverseButton>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Rodapé */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
                <p className="text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} Dishy App
                </p>
            </div>
        </GuestLayout>
    );
}
