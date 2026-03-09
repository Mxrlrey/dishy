<?php

namespace App\Http\Controllers;

use App\Http\Requests\DishRequest;
use App\Models\Dish;
use App\Models\Menu;
use App\Services\DishService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class DishController extends Controller
{
    public function __construct(
        protected DishService $dishService
    ){}

    /**
     * Lista todos os pratos de 10 em 10.
     */
    public function index()
    {
        return Inertia::render('Dishes/Index', [
            'dishes' => Dish::paginate(10)
        ]);
    }

    /**
     * Mostra o formulário para criar um novo prato, com os menus ja no dropdown.
     */
    public function create(): Response
    {
        return Inertia::render('Dishes/Create', [
            'menus' => Menu::select('id', 'name')->orderBy('name')->get()
        ]);
    }

    /**
     * Cria um prato e redireciona para a listagem.
     */
    public function store(DishRequest $request): RedirectResponse
    {
        try {
            // Chama o serviço passando apenas os dados que passaram na validação do DishRequest
            $this->dishService->store($request->validated());

            // Redireciona para a listagem com a confirmação da criação
            return redirect()->route('dishes.index')
                ->with('success', 'Prato criado com sucesso!');

        } catch (Throwable $t) {
            // Em caso de erro técnico ou de regra de negócio, volta ao formulário com a mensagem de erro
            return back()->withErrors(['error' => 'Falha ao criar prato: ' .$t->getMessage()]);
        }
    }

    /**
     * Exibe os detalhes de um prato específico.
     */
    public function show(Dish $dish): Response
    {
        // Carrega o menu atrelado ao prato
        $dish->load('menu');

        return Inertia::render('Dishes/Show', [
            'dish' => $dish
        ]);
    }

    /**
     * Mostra o formulário para editar um prato existente.
     */
    public function edit(Dish $dish): Response
    {

        return Inertia::render('Dishes/Edit', [
            'dish' => $dish,
            'menus' => Menu::select('id', 'name')->get(),
        ]);
    }

    /**
     * Atualiza os dados de um prato existente.
     */
    public function update(DishRequest $request, Dish $dish): RedirectResponse
    {
        try {
            // Chama o metodo update do Service passando o objeto atual e os novos dados validados
            $this->dishService->update($dish, $request->validated());
            // Redireciona para a listagem com a confirmação da alteração
            return redirect()->route('dishes.index')
                ->with('success', 'Prato atualizado com sucesso!');
        } catch (Throwable $t) {
            // Em caso de erro técnico ou de regra de negócio, volta ao formulário com a mensagem de erro
            return back()->withErrors(['error'=>'Falha ao atualizar prato:' .$t->getMessage()]);
        }

    }

    /**
     * Remove o prato específico do banco de dados.
     */
    public function destroy(Dish $dish): RedirectResponse
    {
        try {
            // Chama o metodo delete do Service para realizar a exclusão lógica ou física
            $this->dishService->delete($dish);

            // Redireciona para a listagem com a mensagem de confirmação da exclusão
            return redirect()->route('dishes.index')
                ->with('success', 'Prato deletado com sucesso!');
        } catch (Throwable $t) {
            // Em caso de erro (ex: prato vinculado a um pedido), volta com a mensagem de falha
            return back()->withErrors(['error' => 'Falha ao deletar prato: ' . $t->getMessage()]);
        }
    }
}
