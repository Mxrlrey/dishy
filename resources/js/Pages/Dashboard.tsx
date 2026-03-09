import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';

import { Container, Card } from '@/Components';

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Painel Principal
                </h2>
            }
        >
            <Head title="Dashboard" />

            <Container>
                <Card>
                    <div className="p-6 text-gray-900">
                        Bem-vindo ao Dishy, {auth.user.name}! <br />
                        Você está logado e pronto para gerenciar seu cardápio.
                    </div>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
