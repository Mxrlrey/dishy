<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Os pratos são os itens individuais do cardápio vinculados a um menu,
     * como: (Ex: Coca-Cola, Batata Frita, X-Salada).
     */
    public function up(): void
    {
        Schema::create('dishes', function (Blueprint $table) {
            $table->id();
            // Nome do prato (Ex: Cheese Bacon)
            $table->string('name');
            // Slug para URLs (Ex: /pratos/cheese-bacon)
            $table->string('slug')->unique();
            // Descrição detalhada dos ingredientes ou preparo
            $table->text('description')->nullable();
            // Preço do item (10 dígitos no total, 2 decimais)
            $table->decimal('price', 10, 2);
            // Relacionamento: O menu/categoria ao qual este prato pertence
            $table->foreignId('menu_id')->constrained();
            // Status de disponibilidade no cardápio
            $table->boolean('is_active');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dishes');
    }
};
