<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'frontend/welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard/dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
