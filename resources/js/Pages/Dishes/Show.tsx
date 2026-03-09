import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Container,
    Card,
    InverseButton,
    Badge,
    SecondaryButton,
    DataField
} from '@/Components';

interface Menu {
    id: number;
    name: string;
}

interface Dish {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string | number;
    is_active: boolean;
    menu?: Menu;
}

interface Props extends PageProps {
    dish: Dish;
}

export default function Show({ auth, dish }: Props) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Visualizar item</h2>}
        >
            <Head title={`Item: ${dish.name}`} />

            <Container>
                <div className="space-y-6">
                    {/* Ações Superiores */}
                    <div className="flex justify-between items-center">
                        <Link href={route('dishes.index')}>
                            <InverseButton icon="fa-arrow-left">Voltar para a Listagem</InverseButton>
                        </Link>

                        <Link href={route('dishes.edit', dish.id)}>
                            <SecondaryButton>Editar Item</SecondaryButton>
                        </Link>
                    </div>

                    <Card>
                        {/* CABEÇALHO DO CARD (Info + Badge) */}
                        <div className="mb-6 border-b border-gray-100 pb-4 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 uppercase">Informações do Item</h3>
                                <p className="text-sm text-gray-500 italic">Detalhes técnicos do item no Dishy</p>
                            </div>
                            <Badge type={dish.is_active ? 'success' : 'danger'}>
                                {dish.is_active ? 'Ativo' : 'Inativo'}
                            </Badge>
                        </div>

                        {/* SEÇÃO 1: Dados Técnicos (Grid de 4 colunas) */}
                        <div className="pb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Nome */}
                                <DataField label="Nome do Item" value={dish.name} />

                                {/* Preço */}
                                <DataField
                                    label="Preço de Venda"
                                    valueClassName="text-green-600"
                                    value={`R$ ${Number(dish.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                                />

                                {/* Menu */}
                                <DataField
                                    label="Categoria / Menu"
                                    value={dish.menu ? (
                                        <Link href={route('menus.show', dish.menu.id)} className="text-blue-600 hover:underline">
                                            {dish.menu.name}
                                        </Link>
                                    ) : null}
                                />

                                {/* Slug */}
                                <DataField
                                    label="URL (Slug)"
                                    valueClassName="font-mono text-blue-600 truncate"
                                    value={`/item/${dish.slug}`}
                                />
                            </div>
                        </div>

                        {/* Descrição */}
                        <div className="border-t border-gray-100 py-6 mt-2">
                            <div className="mb-4">
                                <h3 className="text-base font-bold text-gray-900 uppercase tracking-tight">Descrição no Cardápio</h3>
                            </div>
                            <div className="bg-gray-50 p-4 border border-dashed border-gray-200 rounded-[1px]">
                                <p className="text-sm text-gray-700 leading-relaxed italic">
                                    {dish.description || 'Nenhuma descrição informada para este item.'}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
