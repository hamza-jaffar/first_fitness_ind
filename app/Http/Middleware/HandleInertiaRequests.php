<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {

        $settings = Setting::whereIn('key', [
            'logo_black',
            'logo_white',
            'name',
            'description',
            'location',
            'email',
            'phone',
        ])->pluck('content', 'key');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'settings' => [
                'logo_black' => $settings['logo_black'] ?? '',
                'logo_white' => $settings['logo_white'] ?? '',
                'name' => $settings['name'] ?? '',
                'description' => $settings['description'] ?? '',
                'location' => $settings['location'] ?? '',
                'email' => $settings['email'] ?? '',
                'phone' => $settings['phone'] ?? '',
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
