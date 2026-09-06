<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Product::with('category');

        if ($search = $request->string('search')->trim()->toString()) {
            $query->where(function ($productQuery) use ($search) {
                $productQuery->where('title', 'like', "%{$search}%")
                    ->orWhere('art_no', 'like', "%{$search}%")
                    ->orWhere('sku', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%")
                    ->orWhereHas('category', fn ($categoryQuery) => $categoryQuery->where('name', 'like', "%{$search}%"));
            });
        }

        if ($categoryId = $request->integer('category_id')) {
            $query->where('category_id', $categoryId);
        }

        if ($request->has('status') && in_array($request->input('status'), ['active', 'inactive'], true)) {
            $query->where('is_active', $request->input('status') === 'active');
        }

        $sort = $request->input('sort', 'created_at');
        $direction = $request->input('direction') === 'asc' ? 'asc' : 'desc';
        if (in_array($sort, ['id', 'title', 'art_no', 'sku', 'created_at', 'updated_at'], true)) {
            $query->orderBy($sort, $direction);
        }

        $perPage = min(max($request->integer('per_page', 10), 5), 50);

        return Inertia::render('dashboard/products/index', [
            'products' => $query->paginate($perPage)->withQueryString(),
            'categories' => Category::orderBy('name')->get(['id', 'name']),
            'filters' => $request->only(['search', 'category_id', 'status', 'sort', 'direction', 'per_page']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/products/create', [
            'categories' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Product::create($this->validatedData($request));

        return redirect()->route('dashboard.products.index')->with('success', 'Product created successfully.');
    }

    public function show(Product $product): Response
    {
        return Inertia::render('dashboard/products/show', [
            'product' => $product->load('category'),
        ]);
    }

    public function edit(Product $product): Response
    {
        return Inertia::render('dashboard/products/edit', [
            'product' => $product,
            'categories' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $product->update($this->validatedData($request, $product));

        return redirect()->route('dashboard.products.show', $product)->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return redirect()->route('dashboard.products.index')->with('success', 'Product deleted successfully.');
    }

    /** @return array<string, mixed> */
    private function validatedData(Request $request, ?Product $product = null): array
    {
        $ignoreId = $product ? $product->id : 'NULL';

        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'title' => ['required', 'string', 'max:255'],
            'art_no' => ['required', 'string', 'max:255', 'unique:products,art_no,' . $ignoreId],
            'sku' => ['nullable', 'string', 'max:255', 'unique:products,sku,' . $ignoreId],
            'short_desc' => ['nullable', 'string', 'max:255'],
            'desc' => ['nullable', 'string'],
            'material' => ['nullable', 'string', 'max:255'],
            'gender' => ['nullable', 'string', 'max:255'],
            'fit' => ['nullable', 'string', 'max:255'],
            'sizes' => ['nullable', 'array'],
            'sizes.*' => ['string', 'max:50'],
            'colors' => ['nullable', 'array'],
            'colors.*' => ['string', 'max:100'],
            'thumbnail' => ['nullable', 'string', 'max:255'],
            'thumbnail_file' => ['nullable', 'image', 'max:5120'],
            'existing_images' => ['nullable', 'array'],
            'existing_images.*' => ['string', 'max:255'],
            'image_files' => ['nullable', 'array'],
            'image_files.*' => ['image', 'max:5120'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:255'],
            'meta_keywords' => ['nullable', 'array'],
            'meta_keywords.*' => ['string', 'max:100'],
            'is_active' => ['boolean'],
            'is_featured' => ['boolean'],
        ]);

        $thumbnail = $validated['thumbnail'] ?? null;
        if ($request->hasFile('thumbnail_file')) {
            $thumbnail = $this->storeImage($request->file('thumbnail_file'));
        }

        $images = $validated['existing_images'] ?? [];
        foreach ($request->file('image_files', []) as $image) {
            $images[] = $this->storeImage($image);
        }

        return array_merge($validated, [
            'slug' => $this->generateSlug($validated['title'], $product),
            'thumbnail' => $thumbnail,
            'images' => $images,
            'is_active' => $request->boolean('is_active'),
            'is_featured' => $request->boolean('is_featured'),
        ]);
    }

    private function generateSlug(string $title, ?Product $product = null): string
    {
        $baseSlug = Str::slug($title) ?: 'product';
        $slug = $baseSlug;
        $suffix = 2;

        while (Product::withTrashed()
            ->where('slug', $slug)
            ->when($product, fn ($query) => $query->where($product->getQualifiedKeyName(), '!=', $product->getKey()))
            ->exists()) {
            $slug = $baseSlug . '-' . $suffix++;
        }

        return $slug;
    }

    private function storeImage(UploadedFile $image): string
    {
        $path = $image->store('products', 'public');

        if ($path === false) {
            throw new \RuntimeException('Unable to store product image.');
        }

        return asset('storage/' . $path);
    }
}