<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\SiteSettingController;
use App\Http\Controllers\Frontend\ContactController;
use App\Http\Controllers\Frontend\PageController;
use App\Http\Controllers\Frontend\ProductController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'frontend/welcome')->name('home');
Route::inertia('/contact-us', 'frontend/contact-us')->name('contactus');
Route::post('/contact-us/store', [ContactController::class, 'store'])->name('contactstore');
Route::get('/category/{slug}', [ProductController::class, 'index'])->name('products');
Route::get('/category/{parent_category}/{slug}', [ProductController::class, 'index'])
    ->name('products.subcategory');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard/dashboard')->name('dashboard');
    Route::get('dashboard/contacts', [App\Http\Controllers\Admin\ContactController::class, 'index'])->name('dashboard.contacts.index');
    Route::delete('dashboard/contacts/{contact}', [App\Http\Controllers\Admin\ContactController::class, 'destroy'])->name('dashboard.contacts.destroy');

    // Categories
    Route::get('dashboard/categories', [CategoryController::class, 'index'])->name('dashboard.categories.index');
    Route::post('dashboard/categories', [CategoryController::class, 'store'])->name('dashboard.categories.store');
    Route::put('dashboard/categories/{category}', [CategoryController::class, 'update'])->name('dashboard.categories.update');
    Route::delete('dashboard/categories/{category}', [CategoryController::class, 'destroy'])->name('dashboard.categories.destroy');

    // Products
    Route::resource('dashboard/products', AdminProductController::class)
        ->except(['show'])
        ->names('dashboard.products');
    Route::get('dashboard/products/{product}', [AdminProductController::class, 'show'])->name('dashboard.products.show');

    Route::get('dashboard/pages/{slug}/edit', [App\Http\Controllers\Admin\PageController::class, 'edit'])->name('dashboard.pages.edit');
    Route::put('dashboard/pages/{slug}', [App\Http\Controllers\Admin\PageController::class, 'update'])->name('dashboard.pages.update');

    Route::get('dashboard/settings/site', [SiteSettingController::class, 'edit'])->name('dashboard.settings.site.edit');
    Route::post('dashboard/settings/site', [SiteSettingController::class, 'update'])->name('dashboard.settings.site.update');
});

require __DIR__.'/settings.php';
Route::get('/{slug}', [PageController::class, 'index'])->name('page');
