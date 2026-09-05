<?php

use App\Http\Controllers\Frontend\ContactController;
use App\Http\Controllers\Frontend\PageController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'frontend/welcome')->name('home');
Route::inertia('/contact-us', 'frontend/contact-us')->name('contactus');
Route::post('/contact-us/store', [ContactController::class, 'store'])->name('contactstore');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard/dashboard')->name('dashboard');
    Route::get('dashboard/contacts', [\App\Http\Controllers\Admin\ContactController::class, 'index'])->name('dashboard.contacts.index');
    Route::delete('dashboard/contacts/{contact}', [\App\Http\Controllers\Admin\ContactController::class, 'destroy'])->name('dashboard.contacts.destroy');
    
    // Categories
    Route::get('dashboard/categories', [\App\Http\Controllers\Admin\CategoryController::class, 'index'])->name('dashboard.categories.index');
    Route::post('dashboard/categories', [\App\Http\Controllers\Admin\CategoryController::class, 'store'])->name('dashboard.categories.store');
    Route::put('dashboard/categories/{category}', [\App\Http\Controllers\Admin\CategoryController::class, 'update'])->name('dashboard.categories.update');
    Route::delete('dashboard/categories/{category}', [\App\Http\Controllers\Admin\CategoryController::class, 'destroy'])->name('dashboard.categories.destroy');
    
    Route::get('dashboard/pages/{slug}/edit', [\App\Http\Controllers\Admin\PageController::class, 'edit'])->name('dashboard.pages.edit');
    Route::put('dashboard/pages/{slug}', [\App\Http\Controllers\Admin\PageController::class, 'update'])->name('dashboard.pages.update');
    
    Route::get('dashboard/settings/site', [\App\Http\Controllers\Admin\SiteSettingController::class, 'edit'])->name('dashboard.settings.site.edit');
    Route::post('dashboard/settings/site', [\App\Http\Controllers\Admin\SiteSettingController::class, 'update'])->name('dashboard.settings.site.update');
});

require __DIR__.'/settings.php';
Route::get('/{slug}', [PageController::class, 'index'])->name('page');
