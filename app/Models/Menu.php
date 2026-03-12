<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Representa a entidade de uma Categoria (Menu) no sistema.
 *
 * @property int $id Identificador único da categoria.
 * @property string $name Nome da categoria (ex: Bebidas, Sobremesas).
 * @property string $slug URL amigável para navegação.
 * @property int $set_order Ordem de exibição na listagem do cardápio.
 * @property string|null $description Breve resumo sobre os itens desta categoria.
 * @property bool $is_active Define se a categoria e seus pratos estão visíveis.
 * @property \Illuminate\Support\Carbon|null $created_at Data de criação.
 * @property \Illuminate\Support\Carbon|null $updated_at Data de atualização.
 * * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Dish> $dishes Coleção de pratos vinculados.
 * @property-read int|null $dishes_count Contador de pratos vinculados (gerado pelo withCount).
 */

class Menu extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'set_order',
        'description',
        'is_active',
    ];

    protected $casts = [
      'is_active' => 'boolean',
    ];

    /**
     * Um menu possui muitos pratos.
     */
    public function dishes(): hasMany
    {
        return $this->hasMany(Dish::class);
    }
}


