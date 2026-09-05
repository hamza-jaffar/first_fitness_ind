<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class SiteSettingController extends Controller
{
    public function edit()
    {
        // Fetch all settings and format them into an associative array
        $settingsData = Setting::all()->pluck('content', 'key')->toArray();

        return Inertia::render('dashboard/settings/site', [
            'settings' => $settingsData
        ]);
    }

    public function update(Request $request)
    {
        $allInputs = $request->except(['_token', '_method']);

        foreach ($allInputs as $key => $content) {
            // Handle file uploads separately if any (assuming direct upload for logo/favicon)
            if ($request->hasFile($key)) {
                $file = $request->file($key);
                
                $existingSetting = Setting::where('key', $key)->first();
                
                if ($existingSetting && $existingSetting->content) {
                    $filename = basename($existingSetting->content);
                } else {
                    $filename = $file->getClientOriginalName();
                }

                $path = $file->storeAs('uploads/images', $filename, 'public');
                
                // Keep the exact previous path if it existed, otherwise construct new one
                $content = $existingSetting && $existingSetting->content 
                            ? $existingSetting->content 
                            : '/storage/' . $path;
            }

            if ($content !== null) {
                Setting::updateOrCreate(
                    ['key' => $key],
                    ['content' => (string) $content]
                );
            }
        }

        return redirect()->back()->with('success', 'Site settings updated successfully.');
    }
}
