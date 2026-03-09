import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Container,
    Card,
    PrimaryButton,
    TextInput,
    InverseButton,
    TextArea,
    SelectInput,
    FormField,
    StatusToggle,
    SlugPreview
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar {dish.name}</h2>}
        >
            <Head title={`Editar: ${dish.name}`} />

            <Container>
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <div className="mb-6 border-b border-gray-100 pb-4">
                            <h3 className="text-lg font-medium text-gray-900">Alterar Item</h3>
                            <p className="text-sm text-gray-500 italic">Editando as informações de: <strong>{dish.name}</strong></p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Nome*/}
                            <FormField label="Nome" htmlFor="name" error={errors.name}>
                                <TextInput
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                    isFocused
                                    placeholder="Ex: Filé à Parmegiana"
                                    className="block w-full"
                                />
                            </FormField>

                            {/* Descrição */}
                            <FormField label="Descrição" htmlFor="description" error={errors.description}>
                                <TextArea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={3}
                                    placeholder="Detalhes do item, ingredientes ou volume (ex: 500ml)..."
                                />
                            </FormField>

                            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-start">
                                {/* Categoria */}
                                <div className="md:col-span-3">
                                    <FormField label="Menu (Categoria)" htmlFor="menu_id" error={errors.menu_id}>
                                        <SelectInput
                                            id="menu_id"
                                            value={data.menu_id}
                                            onChange={(e) => setData('menu_id', e.target.value)}
                                        >
                                            <option value="">Selecione um menu</option>
                                            {menus?.map((menu) => (
                                                <option key={menu.id} value={menu.id}>
                                                    {menu.name}
                                                </option>
                                            ))}
                                        </SelectInput>
                                    </FormField>
                                </div>

                                {/* Preço */}
                                <div className="md:col-span-2">
                                    <FormField label="Preço (R$)" htmlFor="price" error={errors.price}>
                                        <TextInput
                                            id="price"
                                            type="number"
                                            step="0.01"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            className="w-full"
                                        />
                                    </FormField>
                                </div>

                                {/* Status do Item */}
                                <div className="md:col-span-1">
                                    <FormField
                                        label="Status"
                                        htmlFor="is_active"
                                        error={errors.is_active}
                                    >
                                        <div className="mt-3">
                                            <StatusToggle
                                                value={data.is_active}
                                                onChange={(newValue) => setData('is_active', newValue)}
                                            />
                                            <input type="hidden" name="is_active" value={data.is_active ? 1 : 0} />
                                        </div>
                                    </FormField>
                                </div>
                            </div>

                            {/* Slug */}
                            <SlugPreview
                                prefix="/item"
                                slug={data.slug}
                            />

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
