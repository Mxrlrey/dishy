<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
