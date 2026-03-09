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
    InfoButton,
    DataField
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
    description: string;
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
                    {/* Ações Superiores */}
                    <div className="flex justify-between items-center">
                        <Link href={route('menus.index')}>
                            <InverseButton icon="fa-arrow-left">Voltar para a Listagem</InverseButton>
                        </Link>

                        <Link href={route('menus.edit', menu.id)}>
                            <SecondaryButton>Editar Menu</SecondaryButton>
                        </Link>
                    </div>

                    {/* Dados Gerais */}
                    <Card>
                        <div className="mb-6 border-b border-gray-100 pb-4 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 uppercase">Informações do Menu</h3>
                                <p className="text-sm text-gray-500 italic">Dados principais do menu no Dishy</p>
                            </div>
                            <Badge type={menu.is_active ? 'success' : 'danger'}>
                                {menu.is_active ? 'Ativo' : 'Inativo'}
                            </Badge>
                        </div>

                        <div className="pb-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <DataField label="Nome do Menu" value={menu.name} />
                                <DataField
                                    label="URL (Slug)"
                                    valueClassName="font-mono text-blue-600 truncate"
                                    value={`/menu/${menu.slug}`}
                                />
                                <DataField label="Ordem de Exibição" value={menu.set_order} />
                            </div>
                        </div>

                        <div className="border-t border-gray-100 py-6 mt-2">
                            <div className="mb-4">
                                <h3 className="text-base font-bold text-gray-800 uppercase tracking-tight">Descrição do Cardápio</h3>
                            </div>
                            <div className="bg-gray-50 p-4 border border-dashed border-gray-200 rounded-[1px]">
                                <p className="text-sm text-gray-700 leading-relaxed italic">
                                    {menu.description || 'Nenhuma descrição informada para este menu.'}
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Pratos Vinculados */}
                    <Card>
                        <div className="mb-6 border-b border-gray-100 pb-4">
                            <h3 className="text-lg font-bold text-gray-900 uppercase">Pratos Cadastrados</h3>
                            <p className="text-sm text-gray-500 italic">Itens vinculados a este menu</p>
                        </div>

                        <Table headers={['ID', 'Nome do Prato', 'Preço', 'Status', 'Ações']}>
                            {menu.dishes && menu.dishes.length > 0 ? (
                                menu.dishes.map((dish) => (
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
                                                    onBefore={() => confirm('Deseja realmente desvincular e remover este prato?')}
                                                >
                                                    <DangerButton />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="border border-gray-200 px-4 py-8 text-center text-gray-500 italic">
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
