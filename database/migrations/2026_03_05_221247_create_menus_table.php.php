<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Os menus são as categorias em que os pratos serão seccionados,
     * como: (Ex: bebidas, petiscos, hambúrgueres).
     */
    public function up(): void
    {
        Schema::create('menus', function (Blueprint $table) {
            $table->id();
            // O nome visível (Ex: Hambúrgueres Artesanais)
            $table->string('name');
            // O nome para a URL (Ex: /cardapio/hamburgueres-artesanais)
            $table->string('slug')->unique();
            // Ordem de exibição (Ex: "Bebidas" ficar no topo)
            $table->integer('set_order')->default(0);
            // Uma pequena descrição (Opcional)
            // Ex: "Nossas carnes são grelhadas no fogo forte"
            $table->text('description')->nullable();
            // Status de visibilidade
            $table->boolean('is_active');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('menus');
    }
};
