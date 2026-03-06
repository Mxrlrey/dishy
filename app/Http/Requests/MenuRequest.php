<?php

namespace App\Http\Requests;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MenuRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        // Tenta pegar o objeto da rota. No 'Update' ele existe, no 'Store' ele é nulo.
        $menu = $this->route('menu');
        /**
         * Se $menu for um objeto (Model), extraímos o ID.
         * Se for apenas um número/string (ID direto na URL), usamos ele mesmo.
         */
        $menuId = ($menu instanceof Model) ? $menu->id : $menu;

        return [
            'name' => [
                'required',
                'string',
                'max:150',
                Rule::unique('menus', 'name')
                    ->ignore($menuId)
            ],
            'slug' => [
                'required',
                'string',
                'max:150',
                Rule::unique('menus', 'slug')
                    ->ignore($menuId)
            ],
            'set_order' =>'required|integer|min:0',
            'description' => 'nullable|string',
            'is_active' => 'sometimes|boolean',
        ];
    }

    public function prepareForValidation(): void
    {
        $this->merge([
            'is_active' => $this->has('is_active'),
        ]);
    }
}
