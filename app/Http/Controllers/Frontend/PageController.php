<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Inertia\Inertia;

class PageController extends Controller
{
    public function index(string $slug)
    {
        if (! $slug) {
            abort(404);
        }

        $page = Page::where('slug', $slug)->first();

        if (! $page) {
            abort(404);
        }

        return Inertia::render('frontend/page', ['data' => $page]);
    }
}
