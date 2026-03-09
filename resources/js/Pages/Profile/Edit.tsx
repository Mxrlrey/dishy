import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

import { Container, Card } from '@/Components';

export default function Edit({
                                 auth,
                                 mustVerifyEmail,
                                 status,
                             }: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Meu Perfil
                </h2>
            }
        >
            <Head title="Perfil" />

            <Container className="space-y-6">
                <Card className="p-4 sm:p-8">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </Card>

                {/* Card para alteração de senha */}
                <Card className="p-4 sm:p-8">
                    <UpdatePasswordForm className="max-w-xl" />
                </Card>

                {/* Card para exclusão de conta */}
                <Card className="p-4 sm:p-8">
                    <DeleteUserForm className="max-w-xl" />
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
