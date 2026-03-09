import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Container,
    Card,
    PrimaryButton,
    TextInput,
    InputLabel,
    InputError,
    Checkbox,
    InverseButton
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
    menu_id: number;
    is_active: boolean;
}

interface Props extends PageProps {
    dish: Dish;
    menus: Menu[];
}

export default function Edit({ auth, dish, menus }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        name: dish.name || '',
        slug: dish.slug || '',
        description: dish.description || '',
        price: dish.price || '',
        menu_id: dish.menu_id || '',
        is_active: Boolean(dish.is_active),
    });

    const handleNameChange = (name: string) => {
        const slug = name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/--+/g, '-')
            .trim();

        setData((prev) => ({ ...prev, name, slug }));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('dishes.update', dish.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Prato</h2>}
        >
            <Head title={`Editar: ${dish.name}`} />

            <Container>
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <div className="mb-6 border-b border-gray-100 pb-4">
                            <h3 className="text-lg font-medium text-gray-900">Alterar Prato</h3>
                            <p className="text-sm text-gray-500 italic">Editando as informações de: <strong>{dish.name}</strong></p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Nome do Prato */}
                            <div>
                                <InputLabel htmlFor="name" value="Nome do Prato" />
                                <TextInput
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                    placeholder="Ex: Filé à Parmegiana"
                                    isFocused={true}
                                />
                                <InputError message={errors.name} />
                            </div>

                            {/* Descrição */}
                            <div>
                                <InputLabel htmlFor="description" value="Descrição do Prato" />
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={3}
                                    className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-[1px] shadow-sm mt-1 text-sm transition-colors"
                                    placeholder="Ingredientes e detalhes do prato..."
                                />
                                <InputError message={errors.description} />
                            </div>

                            {/* Categoria (Menu) */}
                            <div>
                                <InputLabel htmlFor="menu_id" value="Categoria (Menu)" />
                                <select
                                    id="menu_id"
                                    value={data.menu_id}
                                    onChange={(e) => setData('menu_id', e.target.value)}
                                    className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-[1px] shadow-sm mt-1 text-sm transition-colors"
                                >
                                    <option value="">Selecione uma categoria</option>
                                    {menus?.map((menu) => (
                                        <option key={menu.id} value={menu.id}>
                                            {menu.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.menu_id} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                {/* Preço */}
                                <div>
                                    <InputLabel htmlFor="price" value="Preço (R$)" />
                                    <TextInput
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                    />
                                    <InputError message={errors.price} />
                                </div>

                                {/* Status Checkbox */}
                                <div className="flex items-center h-[42px] mt-6">
                                    <label className="flex items-center cursor-pointer group">
                                        <Checkbox
                                            name="is_active"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                        />
                                        <span className="ms-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                                            Prato Ativo
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Slug */}
                            <div className="bg-gray-50 p-3 border border-dashed border-gray-200 rounded-[1px]">
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">URL Atual:</span>
                                <div className="text-sm font-mono text-blue-600 mt-1 truncate">
                                    /prato/{data.slug}
                                </div>
                            </div>

                            {/* Ações */}
                            <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
                                <Link href={route('dishes.index')}>
                                    <InverseButton icon="fa-arrow-left">
                                        Cancelar
                                    </InverseButton>
                                </Link>

                                <PrimaryButton disabled={processing}>
                                    {processing ? 'Atualizando...' : 'Salvar Alterações'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </Card>
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
