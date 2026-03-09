import React, { FormEventHandler, useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';

import {
    DangerButton,
    InputError,
    InputLabel,
    Modal,
    SecondaryButton,
    TextInput
} from '@/Components';

export default function DeleteUserForm({
                                           className = '',
                                       }: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Excluir Conta
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Uma vez que sua conta for excluída, todos os seus recursos e dados
                    serão permanentemente apagados. Antes de excluir, por favor, faça o download
                    de qualquer dado que deseje manter.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                Excluir Conta
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Tem certeza que deseja excluir sua conta?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Por favor, insira sua senha para confirmar que você gostaria de
                        excluir permanentemente sua conta e todos os dados associados.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Senha"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Sua Senha"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancelar
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Excluir Conta Permanentemente
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
