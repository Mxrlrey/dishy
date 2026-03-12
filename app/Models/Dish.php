<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Representa a entidade de um Prato no sistema.
 *
 * @property int $id Identificador único do prato.
 * @property string $name Nome do prato exibido no cardápio.
 * @property string $slug URL amigável para acesso direto.
 * @property string|null $description Detalhes, ingredientes ou observações do prato.
 * @property float $price Preço de venda formatado com duas casas decimais.
 * @property int $menu_id Chave estrangeira da categoria (Menu).
 * @property bool $is_active Define se o prato está ativo para os clientes.
 * @property \Illuminate\Support\Carbon|null $created_at Data de criação do registro.
 * @property \Illuminate\Support\Carbon|null $updated_at Data da última atualização.
 * * @property-read \App\Models\Menu $menu Relacionamento com a categoria pai.
 */
class Dish extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'is_active',
        'menu_id',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'price' => 'decimal:2',
    ];

    /**
     * Um prato pertence a um menu.
     */
    public function menu(): BelongsTo
    {
        return $this->BelongsTo(Menu::class);
    }
}
