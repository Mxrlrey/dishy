import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Container,
    Card,
    InverseButton,
    Badge,
    Table,
    SecondaryButton,
    DangerButton,
    InfoButton
} from '@/Components';

interface Dish {
    id: number;
    name: string;
    price: string | number;
    is_active: boolean;
}

interface Menu {
    id: number;
    name: string;
    slug: string;
    set_order: number;
    is_active: boolean;
    dishes: Dish[];
}

interface Props extends PageProps {
    menu: Menu;
}

export default function Show({ auth, menu }: Props) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Visualizar Menu</h2>}
        >
            <Head title={`Menu: ${menu.name}`} />

            <Container>
                <div className="space-y-6">
                    {/* Botão Voltar superior */}
                    <div className="flex justify-start">
                        <Link href={route('menus.index')}>
                            <InverseButton icon="fa-arrow-left">Voltar para Categorias</InverseButton>
                        </Link>
                    </div>

                    {/* SEÇÃO 1: Dados do Menu */}
                    <Card>
                        <div className="mb-6 border-b border-gray-100 pb-4 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 uppercase">Informações da Categoria</h3>
                                <p className="text-sm text-gray-500 italic">Dados principais do menu no Dishy</p>
                            </div>
                            <Badge type={menu.is_active ? 'success' : 'danger'}>
                                {menu.is_active ? 'Ativo' : 'Inativo'}
                            </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Nome</label>
                                <p className="mt-1 text-sm font-bold text-gray-800">{menu.name}</p>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Slug (URL)</label>
                                <p className="mt-1 text-sm font-mono text-blue-600">/menu/{menu.slug}</p>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Peso (Ordem)</label>
                                <p className="mt-1 text-sm text-gray-800">{menu.set_order}</p>
                            </div>
                        </div>
                    </Card>

                    {/* SEÇÃO 2: Listagem de Pratos */}
                    <Card>
                        <div className="mb-6 border-b border-gray-100 pb-4">
                            <h3 className="text-lg font-bold text-gray-900 uppercase">Pratos Cadastrados neste Menu</h3>
                            <p className="text-sm text-gray-500 italic">Lista de itens vinculados a {menu.name}</p>
                        </div>

                        <Table headers={['ID', 'Nome do Prato', 'Preço', 'Status', 'Ações']}>
                            {menu.dishes && menu.dishes.length > 0 ? (
                                menu.dishes.map((dish) => (
                                    <tr key={dish.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600 w-16">
                                            {dish.id}
                                        </td>
                                        <td className="border border-gray-200 px-4 py-2 text-sm font-bold text-gray-800">
                                            {dish.name}
                                        </td>
                                        <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">
                                            R$ {Number(dish.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="border border-gray-200 px-4 py-2 text-center w-24">
                                            <Badge type={dish.is_active ? 'success' : 'danger'}>
                                                {dish.is_active ? 'Ativo' : 'Inativo'}
                                            </Badge>
                                        </td>
                                        <td className="border border-gray-200 px-4 py-2 text-center w-40">
                                            <div className="flex justify-center gap-1">
                                                <Link href={route('dishes.show', dish.id)}>
                                                    <InfoButton />
                                                </Link>
                                                <Link href={route('dishes.edit', dish.id)}>
                                                    <SecondaryButton />
                                                </Link>
                                                <Link
                                                    href={route('dishes.destroy', dish.id)}
                                                    method="delete"
                                                    as="button"
                                                    onBefore={() => confirm('Remover este prato?')}
                                                >
                                                    <DangerButton />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="border border-gray-200 px-4 py-8 text-center text-gray-400 italic">
                                        Nenhum prato encontrado para este menu.
                                    </td>
                                </tr>
                            )}
                        </Table>
                    </Card>
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
