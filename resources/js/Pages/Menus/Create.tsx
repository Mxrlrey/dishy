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
    FormField,
    StatusToggle,
    SlugPreview,
    TextArea
} from '@/Components';

export default function Create({ auth }: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        description: '',
        set_order: 0,
        is_active: true,
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
        post(route('menus.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Novo Menu</h2>}
        >
            <Head title="Criar Novo Menu" />

            <Container>
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <div className="mb-6 border-b border-gray-100 pb-4">
                            <h3 className="text-lg font-medium text-gray-900">Cadastrar Categoria</h3>
                            <p className="text-sm text-gray-500 italic">Configure como a categoria aparecerá no cardápio.</p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Nome */}
                            <FormField label="Nome" htmlFor="name" error={errors.name}>
                                <TextInput
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                    isFocused
                                    placeholder="Ex: Pratos Executivos"
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
                                    placeholder="Ex: Conheça nossa seleção de hambúrgueres artesanais, preparados com blends exclusivos e ingredientes selecionados."
                                />
                            </FormField>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                                {/* Ordem de Exibição */}
                                <div className="md:col-span-3">
                                    <FormField label="Ordem de Exibição" htmlFor="set_order" error={errors.set_order}>
                                        <TextInput
                                            id="set_order"
                                            type="number"
                                            value={data.set_order.toString()}
                                            onChange={(e) => setData('set_order', parseInt(e.target.value) || 0)}
                                            placeholder="Ex: 1"
                                            className="block w-full"
                                        />
                                    </FormField>
                                </div>

                                {/* Status */}
                                <div className="md:col-span-1">
                                    <FormField
                                        label="Status"
                                        htmlFor="is_active"
                                        error={errors.is_active}
                                    >
                                        <div className="mt-3 flex">
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
                                prefix="/menu"
                                slug={data.slug}
                            />

                            {/* Ações */}
                            <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
                                <Link href={route('menus.index')}>
                                    <InverseButton icon="fa-arrow-left">
                                        Cancelar
                                    </InverseButton>
                                </Link>

                                <PrimaryButton disabled={processing}>
                                    {processing ? 'Salvando...' : 'Salvar Categoria'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </Card>
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
