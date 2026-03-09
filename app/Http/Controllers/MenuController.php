<?php

namespace App\Http\Controllers;

use App\Http\Requests\MenuRequest;
use App\Models\Menu;
use App\Services\MenuService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class MenuController extends Controller
{
    public function __construct(
        protected MenuService $menuService
    ) {}

    /**
     * Lista todos os menus.
     */
    public function index()
    {
        return Inertia::render('Menus/Index', [
            'menus' => Menu::all()
        ]);
    }

    /**
     * Mostra o formulário para criar um novo menu.
     */
    public function create(): Response
    {
        return Inertia::render('Menus/Create');
    }

    /**
     * Cria um novo menu e redireciona para a listagem.
     */
    public function store(MenuRequest $request): RedirectResponse
    {
        try {
            // Chama o serviço passando apenas os dados que passaram na validação do MenuRequest
            $this->menuService->store($request->validated());

            // Redireciona para a listagem com a confirmação da criação
            return redirect()->route('menus.index')
                ->with('success', 'Menu criado com sucesso!');

        } catch (Throwable $t) {
            // Em caso de erro técnico ou de regra de negócio, volta ao formulário com a mensagem de erro
            return back()->withErrors(['error' => 'Falha ao criar menu: ' . $t->getMessage()]);
        }
    }

    /**
     * Exibe os detalhes de um menu específico.
     */
    public function show(Menu $menu): Response
    {
        // Pratos em ordem alfabética (A-Z)
        $menu->load(['dishes' => function ($query) {
            $query->orderBy('name', 'asc');
        }]);

        return Inertia::render('Menus/Show', [
            'menu' => $menu
        ]);
    }

    /**
     * Mostra o formulário para editar um menu existente.
     */
    public function edit(Menu $menu): Response
    {
        return Inertia::render('Menus/Edit', [
           'menu' => $menu
        ]);
    }

    /**
     * Atualiza os dados de um menu existente.
     */
    public function update(MenuRequest $request, Menu $menu): RedirectResponse
    {
        try {
            // Chama o metodo update do Service passando o objeto atual e os novos dados validados
            $this->menuService->update($menu, $request->validated());
            // Redireciona para a listagem com a confirmação da alteração
            return redirect()->route('menus.index')
                ->with('success', 'Menu atualizado com sucesso!');
        } catch (Throwable $t) {
            // Em caso de erro técnico ou de regra de negócio, volta ao formulário com a mensagem de erro
            return back()->withErrors(['error'=>'Falha ao atualizar menu:' .$t->getMessage()]);
        }
    }

    /**
     * Remove o menu específico do banco de dados.
     */
    public function destroy(Menu $menu): RedirectResponse
    {
        try {
            // Chama o metodo delete do Service para realizar a exclusão lógica ou física
            $this->menuService->delete($menu);

            // Redireciona para a listagem com a mensagem de confirmação da exclusão
            return redirect()->route('menus.index')
                ->with('success', 'Menu deletado com sucesso!');
        } catch (Throwable $t) {
            // Em caso de erro, volta com a mensagem de falha
            return back()->withErrors(['error' => 'Falha ao deletar menu: ' .$t->getMessage()]);
        }
    }
}
