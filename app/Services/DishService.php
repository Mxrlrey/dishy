<?php

namespace App\Services;

use App\Models\Dish;
use Illuminate\Support\Facades\DB;

class DishService
{
    /**
     * Cria um novo prato vinculado a um menu.
     *
     * @param array $data
     * @return Dish
     * @throws \Throwable
     */
    public function store(array $data): Dish
    {
        return DB::transaction(function () use ($data){
            return Dish::create($data);
        });
    }

    /**
     * Atualiza os dados de um prato existente.
     *
     * @param Dish $dish
     * @param array $data
     * @return Dish
     * @throws \Throwable
     */
    public function update(Dish $dish, array $data): Dish
    {
        return DB::transaction(function () use ($dish, $data){
            $dish->update($data);
            return $dish;
        });
    }

    /**
     * Remove um prato do banco de dados.
     *
     * @param Dish $dish
     * @return void
     * @throws \Throwable
     */
    public function delete(Dish $dish): void
    {
        DB::transaction(function () use ($dish) {
            $dish->delete();
        });
    }
}
