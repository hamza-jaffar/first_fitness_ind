<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PageController extends Controller
{
    public function edit($slug)
    {
        $pageNames = [
            'about-us' => 'About Us',
            'sublimation-process' => 'Sublimation Process',
            'privacy-policy' => 'Privacy Policy',
            'terms-and-conditions' => 'Terms and Conditions',
            'production-tour' => 'Production Tour',
        ];

        if (!array_key_exists($slug, $pageNames)) {
            abort(404);
        }

        $page = Page::firstOrCreate(
            ['slug' => $slug],
            ['name' => $pageNames[$slug], 'status' => 'publish']
        );

        return Inertia::render('dashboard/pages/edit', [
            'page' => $page
        ]);
    }

    public function update(Request $request, $slug)
    {
        $page = Page::where('slug', $slug)->firstOrFail();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'content' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'canonical_url' => 'nullable|url',
            'og_title' => 'nullable|string|max:255',
            'og_description' => 'nullable|string',
            'og_image' => 'nullable|url',
            'status' => 'required|in:publish,draft',
        ]);

        $page->update($validated);

        return redirect()->back()->with('success', 'Page updated successfully.');
    }
}
