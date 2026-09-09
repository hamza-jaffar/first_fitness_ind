<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BannerController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Slider::query();

        if ($search = $request->string('search')->trim()->toString()) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('badge_text', 'like', "%{$search}%")
                    ->orWhere('desc', 'like', "%{$search}%")
                    ->orWhere('button_text', 'like', "%{$search}%");
            });
        }

        if ($request->has('status') && in_array($request->input('status'), ['active', 'inactive'], true)) {
            $query->where('status', $request->input('status'));
        }

        $sort = $request->input('sort', 'created_at');
        $direction = $request->input('direction') === 'asc' ? 'asc' : 'desc';
        $allowedSorts = ['id', 'title', 'badge_text', 'status', 'created_at'];

        if (in_array($sort, $allowedSorts, true)) {
            $query->orderBy($sort, $direction);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $perPage = min(max($request->integer('per_page', 10), 5), 50);

        return Inertia::render('dashboard/banners/index', [
            'sliders' => $query->paginate($perPage)->withQueryString(),
            'filters' => $request->only(['search', 'status', 'sort', 'direction', 'per_page']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'badge_text' => ['nullable', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'desc' => ['nullable', 'string'],
            'button_text' => ['nullable', 'string', 'max:255'],
            'button_url' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'string', 'max:255'],
            'image_file' => ['nullable', 'image', 'max:5120'],
            'status' => ['required', 'in:active,inactive'],
        ]);

        $image = $validated['image'] ?? null;
        if ($request->hasFile('image_file')) {
            $image = $this->storeImage($request->file('image_file'));
        }

        Slider::create([
            'badge_text' => $validated['badge_text'] ?? null,
            'title' => $validated['title'] ?? null,
            'desc' => $validated['desc'] ?? null,
            'button_text' => $validated['button_text'] ?? null,
            'button_url' => $validated['button_url'] ?? null,
            'image' => $image,
            'status' => $validated['status'],
        ]);

        return redirect()->back()->with('success', 'Slider created successfully.');
    }

    public function update(Request $request, Slider $slider): RedirectResponse
    {
        $validated = $request->validate([
            'badge_text' => ['nullable', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'desc' => ['nullable', 'string'],
            'button_text' => ['nullable', 'string', 'max:255'],
            'button_url' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'string', 'max:255'],
            'image_file' => ['nullable', 'image', 'max:5120'],
            'status' => ['required', 'in:active,inactive'],
        ]);

        $image = $slider->image;
        if ($request->hasFile('image_file')) {
            $this->deleteStoredImage($slider->image);
            $image = $this->storeImage($request->file('image_file'));
        } elseif (array_key_exists('image', $validated)) {
            $image = $validated['image'];
        }

        $slider->update([
            'badge_text' => $validated['badge_text'] ?? null,
            'title' => $validated['title'] ?? null,
            'desc' => $validated['desc'] ?? null,
            'button_text' => $validated['button_text'] ?? null,
            'button_url' => $validated['button_url'] ?? null,
            'image' => $image,
            'status' => $validated['status'],
        ]);

        return redirect()->back()->with('success', 'Slider updated successfully.');
    }

    public function destroy(Slider $slider): RedirectResponse
    {
        $this->deleteStoredImage($slider->image);
        $slider->delete();

        return redirect()->back()->with('success', 'Slider deleted successfully.');
    }

    public function toggleStatus(Slider $slider): RedirectResponse
    {
        $newStatus = $slider->status === 'active' ? 'inactive' : 'active';
        $slider->update(['status' => $newStatus]);

        return redirect()->back()->with('success', "Slider status changed to {$newStatus}.");
    }

    private function storeImage(UploadedFile $image): string
    {
        $path = $image->store('banners', 'public');

        if ($path === false) {
            throw new \RuntimeException('Unable to store banner image.');
        }

        return asset('storage/' . $path);
    }

    private function deleteStoredImage(?string $imageUrl): void
    {
        if (!$imageUrl) {
            return;
        }

        $storagePrefix = asset('storage/');
        if (str_starts_with($imageUrl, $storagePrefix)) {
            $relativePath = str_replace($storagePrefix, '', $imageUrl);
            Storage::disk('public')->delete($relativePath);
        }
    }
}
