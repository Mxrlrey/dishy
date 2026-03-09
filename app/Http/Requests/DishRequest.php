<?php

namespace App\Http\Requests;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class DishRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        // Tenta pegar o objeto da rota. No 'Update' ele existe, no 'Store' ele é nulo.
        $dish = $this->route('dish');
        /**
         * Se $dish for um objeto (Model), extraímos o ID.
         * Se for apenas um número/string (ID direto na URL), usamos ele mesmo.
         */
        $dishId = ($dish instanceof Model) ? $dish->id : $dish;

        return [
            'name' => [
                'required',
                'string',
                'max:150',
                Rule::unique('dishes', 'name')
                    ->ignore($dishId)
            ],
            'slug' => [
                'required',
                'string',
                'max:150',
                Rule::unique('dishes', 'slug')
                    ->ignore($dishId)
            ],
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0|decimal:0,2',
            // Garante que o prato seja vinculado a um menu.
            'menu_id' => 'required|exists:menus,id',
            'is_active' => 'sometimes|boolean',
        ];
    }

    public function prepareForValidation(): void
    {
        $this->merge([
            'slug' => Str::slug($this->slug ?? $this->name),
            'is_active' => filter_var($this->is_active, FILTER_VALIDATE_BOOLEAN),
        ]);
    }
}
