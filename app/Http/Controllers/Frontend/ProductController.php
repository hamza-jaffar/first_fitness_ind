<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request, string $slug, ?string $parent_category = null): Response
    {

        $category = Category::where('slug', $slug)->firstOrFail();

            return $this->renderCategory($category);
        }

        public function subcategory(Request $request, string $parent_category, string $slug): Response
        {
            $category = Category::where('slug', $slug)->firstOrFail();
            $parent = Category::where('slug', $parent_category)->firstOrFail();

            abort_unless((int) $category->parent_category_id === (int) $parent->id, 404);

            return $this->renderCategory($category);
        }

        private function renderCategory(Category $category): Response
        {

        $categoryIds = collect([$category->id]);
        $pendingIds = collect([$category->id]);

        while ($pendingIds->isNotEmpty()) {
            $childIds = Category::whereIn('parent_category_id', $pendingIds)->pluck('id');
            $categoryIds = $categoryIds->merge($childIds);
            $pendingIds = $childIds;
        }

        $products = Product::query()
            ->whereIn('category_id', $categoryIds->unique())
            ->where('is_active', true)
            ->latest()
            ->paginate(9)
            ->withQueryString();

        return Inertia::render('frontend/products', [
            'category' => $category->load(['children', 'parent.children']),
            'products' => $products,
        ]);
    }

    public function show(string $slug): Response
    {
        $product = Product::with('category.parent')
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('is_active', true)
            ->latest()
            ->limit(4)
            ->get();

        return Inertia::render('frontend/product', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
        ]);
    }
}
