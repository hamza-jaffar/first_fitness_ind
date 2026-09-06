<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Category::with('parent');

        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('slug', 'like', "%{$search}%");
        }

        $sortField = $request->input('sort', 'created_at');
        $sortDirection = $request->input('direction', 'desc');
        
        $allowedSortFields = ['id', 'name', 'slug', 'created_at'];
        if (in_array($sortField, $allowedSortFields)) {
            $query->orderBy($sortField, $sortDirection === 'asc' ? 'asc' : 'desc');
        }

        $perPage = $request->input('per_page', 10);
        $categories = $query->paginate($perPage)->withQueryString();

        // All categories for the parent dropdown
        $allCategories = Category::orderBy('name')->get();

        return Inertia::render('dashboard/categories/index', [
            'categories' => $categories,
            'allCategories' => $allCategories,
            'filters' => $request->only(['search', 'sort', 'direction', 'per_page']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories,slug',
            'parent_category_id' => 'nullable|exists:categories,id',
            'desc' => 'nullable|string',
            'image_file' => 'nullable|image|max:5120',
        ]);

        Category::create($this->categoryData($request, $validated));

        return redirect()->back()->with('success', 'Category created successfully.');
    }

    public function update(Request $request, Category $category): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories,slug,' . $category->id,
            'parent_category_id' => 'nullable|exists:categories,id|not_in:' . $category->id,
            'desc' => 'nullable|string',
            'image_file' => 'nullable|image|max:5120',
        ]);

        $category->update($this->categoryData($request, $validated, $category));

        return redirect()->back()->with('success', 'Category updated successfully.');
    }

    public function destroy(Category $category): RedirectResponse
    {
        $category->delete();
        return redirect()->back()->with('success', 'Category deleted successfully.');
    }

    /** @param array<string, mixed> $validated */
    /**
     * @param array<string, mixed> $validated
     * @return array<string, mixed>
     */
    private function categoryData(Request $request, array $validated, ?Category $category = null): array
    {
        if ($request->hasFile('image_file')) {
            $validated['image'] = $this->storeImage($request->file('image_file'));
        } elseif ($category) {
            $validated['image'] = $category->image;
        }

        unset($validated['image_file']);

        return $validated;
    }

    private function storeImage(UploadedFile $image): string
    {
        $path = $image->store('categories', 'public');

        if ($path === false) {
            throw new \RuntimeException('Unable to store category image.');
        }

        return asset('storage/' . $path);
    }
}
