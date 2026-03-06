<?php

use App\Http\Controllers\MenuController;
use App\Http\Controllers\DishController;
use Illuminate\Support\Facades\Route;

Route::apiResource('menus', MenuController::class);
Route::apiResource('dishes', DishController::class);
