import React, { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

import {
    InputError,
    PrimaryButton,
    TextInput
} from '@/Components';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Esqueci minha senha" />

            <div className="mb-4 text-sm text-gray-600 leading-relaxed">
                Esqueceu sua senha? Sem problemas. Basta nos informar seu endereço de e-mail
                e enviaremos um link de redefinição que permitirá que você escolha uma nova senha.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="seu@email.com"
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Enviar Link de Redefinição
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
