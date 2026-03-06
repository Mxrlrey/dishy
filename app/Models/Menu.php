<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

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


