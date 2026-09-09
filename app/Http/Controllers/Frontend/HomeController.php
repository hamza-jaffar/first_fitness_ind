<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\FrontendData;
use App\Models\Product;
use App\Models\Slider;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $frontendData = FrontendData::all()->pluck('content', 'key');

        $sliders = Slider::where('status', 'active')->get();
        if ($sliders->isEmpty()) {
            $sliders = Slider::all();
        }

        $categories = Category::whereNull('parent_category_id')->get();

        $featuredProducts = Product::where('is_active', true)
            ->where('is_featured', true)
            ->latest()
            ->limit(8)
            ->get(['id', 'title', 'slug', 'art_no', 'thumbnail']);

        if ($featuredProducts->isEmpty()) {
            $featuredProducts = Product::where('is_active', true)
                ->latest()
                ->limit(8)
                ->get(['id', 'title', 'slug', 'art_no', 'thumbnail']);
        }

        return Inertia::render('frontend/welcome', [
            'sliders' => $sliders,
            'frontendData' => $frontendData,
            'categories' => $categories,
            'featuredProducts' => $featuredProducts,
        ]);
    }
}

