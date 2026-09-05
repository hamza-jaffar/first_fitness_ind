<?php

use App\Http\Controllers\Frontend\ContactController;
use App\Http\Controllers\Frontend\PageController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'frontend/welcome')->name('home');
Route::inertia('/contact-us', 'frontend/contact-us')->name('contactus');
Route::post('/contact-us/store', [ContactController::class, 'store'])->name('contactstore');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard/dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
Route::get('/{slug}', [PageController::class, 'index'])->name('page');
