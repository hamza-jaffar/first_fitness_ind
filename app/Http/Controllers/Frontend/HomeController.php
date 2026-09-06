<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('frontend/welcome', [
            'categories' => Category::whereNull('parent_category_id')
                ->orderBy('name')
                ->get(['id', 'name', 'slug', 'image', 'desc']),
            'featuredProducts' => Product::where('is_active', true)
                ->where('is_featured', true)
                ->latest()
                ->limit(8)
                ->get(['id', 'title', 'slug', 'art_no', 'thumbnail']),
        ]);
    }
}