<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(string $slug)
    {
        $category = Category::where('slug', $slug)->first();

        // $products = 

        return Inertia::render('frontend/products', [
            'category' => $category
        ]);
    }
}
