import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import {
    SecondaryButton,
    DangerButton,
    Badge,
    Table,
    Card,
    Alert,
    CardHeader,
    Container,
    InfoButton
} from '@/Components';

interface Dish {
    id: number;
    name: string;
    price: string | number;
    is_active: boolean;
}

interface Props extends PageProps {
    dishes: {
        data: Dish[];
    };
}

interface SharedProps {
    flash: {
        success?: string;
        error?: string;
    };
}

export default function Index({ auth, dishes }: Props) {
    const { flash } = usePage<PageProps & SharedProps>().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Gerenciar Cardápio (Pratos)</h2>}
        >
            <Head title="Pratos" />

            <Container>
                {/* Alertas */}
                {flash?.success && <Alert type="success" message={flash.success} />}
                {flash?.error && <Alert type="error" message={flash.error} />}

                <Card>
                    <CardHeader
                        title="Lista de todos os pratos e produtos."
                        buttonHref={route('dishes.create')}
                        buttonLabel="Novo Prato"
                    />

                    <Table headers={['ID', 'Nome do Prato', 'Preço', 'Status', 'Ações']}>
                        {dishes.data.length > 0 ? (
                            dishes.data.map((dish) => (
                                <tr key={dish.id} className="hover:bg-[#f9f9f9] transition-colors text-sm">
                                    <td className="border border-gray-200 px-4 py-2 text-gray-700 w-16">
                                        {dish.id}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2 font-medium text-gray-900">
                                        {dish.name}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2 text-gray-700">
                                        R$ {Number(dish.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2 text-center w-24">
                                        <Badge type={dish.is_active ? 'success' : 'danger'}>
                                            {dish.is_active ? 'Ativo' : 'Inativo'}
                                        </Badge>
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2 text-center w-40">
                                        <div className="flex justify-center gap-1">
                                            {/* Botão de Visualização (Info) */}
                                            <Link href={route('dishes.show', dish.id)} title="Visualizar Prato">
                                                <InfoButton />
                                            </Link>

                                            {/* Botão de Edição (Secondary) */}
                                            <Link href={route('dishes.edit', dish.id)} title="Editar Prato">
                                                <SecondaryButton/>
                                            </Link>

                                            {/* Botão de Exclusão (Danger) */}
                                            <Link
                                                href={route('dishes.destroy', dish.id)}
                                                method="delete"
                                                as="button"
                                                title="Excluir Prato"
                                                onBefore={() => confirm('Deseja realmente excluir este prato?')}
                                            >
                                                <DangerButton/>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="border border-gray-200 px-4 py-8 text-center text-gray-500 italic">
                                    Nenhum prato encontrado no cardápio.
                                </td>
                            </tr>
                        )}
                    </Table>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
