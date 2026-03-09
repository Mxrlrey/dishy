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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Visualizar Prato</h2>}
        >
            <Head title={`Prato: ${dish.name}`} />

            <Container>
                <div className="space-y-6">
                    {/* Ações Superiores */}
                    <div className="flex justify-between items-center">
                        <Link href={route('dishes.index')}>
                            <InverseButton icon="fa-arrow-left">Voltar para a Listagem</InverseButton>
                        </Link>

                        <Link href={route('dishes.edit', dish.id)}>
                            <SecondaryButton>Editar Prato</SecondaryButton>
                        </Link>
                    </div>

                    {/* SEÇÃO 1: Dados Principais */}
                    <Card>
                        <div className="mb-6 border-b border-gray-100 pb-4 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 uppercase">Informações do Item</h3>
                                <p className="text-sm text-gray-500 italic">Detalhes técnicos do prato no Dishy</p>
                            </div>
                            <Badge type={dish.is_active ? 'success' : 'danger'}>
                                {dish.is_active ? 'Ativo' : 'Inativo'}
                            </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Nome do Prato</label>
                                <p className="mt-1 text-sm font-bold text-gray-800">{dish.name}</p>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Preço de Venda</label>
                                <p className="mt-1 text-sm font-bold text-green-600">
                                    R$ {Number(dish.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Categoria / Menu</label>
                                <p className="mt-1 text-sm text-gray-800">
                                    {dish.menu ? (
                                        <Link href={route('menus.show', dish.menu.id)} className="text-blue-600 hover:underline">
                                            {dish.menu.name}
                                        </Link>
                                    ) : 'Sem categoria'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">URL (Slug)</label>
                                <p className="mt-1 text-xs font-mono text-blue-600 truncate">/prato/{dish.slug}</p>
                            </div>
                        </div>
                    </Card>

                    {/* SEÇÃO 2: Descrição Detalhada */}
                    <Card>
                        <div className="mb-4 border-b border-gray-100 pb-4">
                            <h3 className="text-lg font-bold text-gray-900 uppercase">Descrição do Cardápio</h3>
                        </div>
                        <div className="bg-gray-50 p-4 border border-gray-200 rounded-[1px]">
                            <p className="text-sm text-gray-700 leading-relaxed italic">
                                {dish.description || 'Nenhuma descrição informada para este prato.'}
                            </p>
                        </div>
                    </Card>
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
