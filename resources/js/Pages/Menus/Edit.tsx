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
    slug: string;
    set_order: number;
    is_active: boolean;
}

interface Props extends PageProps {
    menu: Menu;
}

export default function Edit({ auth, menu }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        name: menu.name || '',
        slug: menu.slug || '',
        set_order: menu.set_order || 0,
        is_active: Boolean(menu.is_active),
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
        patch(route('menus.update', menu.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Menu</h2>}
        >
            <Head title={`Editar: ${menu.name}`} />

            <Container>
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <div className="mb-6 border-b border-gray-100 pb-4">
                            <h3 className="text-lg font-medium text-gray-900">Alterar Categoria</h3>
                            <p className="text-sm text-gray-500 italic">Editando as informações de: <strong>{menu.name}</strong></p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Nome do Menu */}
                            <div>
                                <InputLabel htmlFor="name" value="Nome da Categoria" />
                                <TextInput
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                    placeholder="Ex: Pratos Executivos"
                                    isFocused={true}
                                />
                                <InputError message={errors.name} />
                            </div>

                            {/* Slug (Visualização) */}
                            <div className="bg-gray-50 p-3 border border-dashed border-gray-200 rounded">
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">URL Atual:</span>
                                <div className="text-sm font-mono text-blue-600 mt-1 truncate">
                                    /menu/{data.slug}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Ordem */}
                                <div>
                                    <InputLabel htmlFor="set_order" value="Ordem de Exibição" />
                                    <TextInput
                                        id="set_order"
                                        type="number"
                                        value={data.set_order.toString()}
                                        onChange={(e) => setData('set_order', parseInt(e.target.value))}
                                    />
                                    <InputError message={errors.set_order} />
                                </div>

                                {/* Status Checkbox */}
                                <div className="flex items-end pb-2">
                                    <label className="flex items-center cursor-pointer group">
                                        <Checkbox
                                            name="is_active"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                        />
                                        <span className="ms-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                                            Categoria Ativa
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Ações */}
                            <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
                                <Link href={route('menus.index')}>
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
