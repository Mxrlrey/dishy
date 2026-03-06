<?php

namespace App\Services;

use App\Models\Menu;
use Exception;
use Illuminate\Support\Facades\DB;

class MenuService
{
    /**
     * Cria um novo menu e persiste no banco de dados.
     *
     * @param array $data Dados validados vindos do MenuRequest.
     * @return Menu O objeto do menu recém-criado.
     * @throws \Throwable Lança uma exceção caso ocorra falha na transação ou no banco.
     */
    public function store(array $data): Menu
    {
        return DB::transaction(function () use ($data){
            return Menu::create($data);
        });
    }

    /**
     * Atualiza um menu existente no banco de dados.
     *
     * @param Menu $menu Instância do menu a ser atualizada.
     * @param array $data Novos dados validados vindos do MenuRequest.
     * @return Menu O objeto do menu atualizado.
     * @throws \Throwable Lança uma exceção caso ocorra falha na transação ou no banco.
     */
    public function update(Menu $menu, array $data): Menu
    {
        return DB::transaction(function () use ($menu, $data) {
            $menu->update($data);
            return $menu;
        });
    }

    /**
     * Remove um menu do banco de dados após validar se não há pratos vinculados.
     *
     * @param Menu $menu Instância do menu a ser excluída.
     * @return void
     * @throws \Exception Caso o menu possua pratos vinculados.
     * @throws \Throwable Caso ocorra uma falha na transação ou no banco.
     */
    public function delete(Menu $menu): void
    {
        DB::transaction(function () use ($menu) {
            if ($menu->dishes()->exists()){
                throw new Exception("Não é possível excluir um menu que possui pratos vinculados.");
            }
            $menu->delete();
        });
    }
}
