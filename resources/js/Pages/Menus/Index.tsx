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

interface Menu {
    id: number;
    name: string;
    slug: string;
    set_order: number;
    is_active: boolean;
}

interface Props extends PageProps {
    menus: Menu[];
}

interface SharedProps {
    flash: {
        success?: string;
        error?: string;
    };
}

export default function Index({ auth, menus }: Props) {
    const { flash } = usePage<PageProps & SharedProps>().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Gerenciar Menus (Categorias)</h2>}
        >
            <Head title="Menus" />

            <Container>
                {flash?.success && <Alert type="success" message={flash.success} />}
                {flash?.error && <Alert type="error" message={flash.error} />}

                <Card>
                    <CardHeader
                        title="Organize as categorias do seu cardápio."
                        buttonHref={route('menus.create')}
                        buttonLabel="Novo Menu"
                    />

                    <Table headers={['ID', 'Nome do Menu', 'Status', 'Ações']}>
                        {menus.length > 0 ? (
                            menus.map((menu) => (
                                <tr key={menu.id} className="hover:bg-[#f9f9f9] transition-colors text-sm">
                                    {/* Adicionado w-16 para o ID */}
                                    <td className="border border-gray-200 px-4 py-2 text-gray-700 w-16">
                                        {menu.id}
                                    </td>
                                    {/* Nome do Menu expande (sem largura fixa) */}
                                    <td className="border border-gray-200 px-4 py-2 font-medium text-gray-900">
                                        {menu.name}
                                    </td>
                                    {/* Adicionado w-24 para o Badge de Status */}
                                    <td className="border border-gray-200 px-4 py-2 text-center w-24">
                                        <Badge type={menu.is_active ? 'success' : 'danger'}>
                                            {menu.is_active ? 'Ativo' : 'Inativo'}
                                        </Badge>
                                    </td>
                                    {/* Adicionado w-40 para a coluna de Ações */}
                                    <td className="border border-gray-200 px-4 py-2 text-center w-40">
                                        <div className="flex justify-center gap-1">
                                            <Link href={route('menus.show', menu.id)} title="Visualizar Menu">
                                                <InfoButton />
                                            </Link>
                                            <Link href={route('menus.edit', menu.id)} title="Editar Menu">
                                                <SecondaryButton />
                                            </Link>
                                            <Link
                                                href={route('menus.destroy', menu.id)}
                                                method="delete"
                                                as="button"
                                                title="Excluir Menu"
                                                onBefore={() => confirm('Deseja realmente excluir este menu?')}
                                            >
                                                <DangerButton />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="border border-gray-200 px-4 py-8 text-center text-gray-500 italic">
                                    Nenhum menu encontrado.
                                </td>
                            </tr>
                        )}
                    </Table>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
