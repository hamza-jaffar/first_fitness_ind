<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Frontend\ContactRequest;
use App\Models\Contact;
use Exception;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function store(ContactRequest $request)
    {
        try {
            $validated = $request->validated();

            Contact::create($validated);

            Inertia::flash('toast', [
                'type' => 'success',
                'message' => __('Contact Saved Successfully.'),
            ]);

            return redirect()->back();

        } catch (Exception $e) {

            Log::error('Failed to save contact form submission.', [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ]);

            Inertia::flash('toast', [
                'type' => 'error',
                'message' => __('Something went wrong while submitting your message.'),
            ]);

            return redirect()
                ->back()
                ->withInput();
        }
    }
}
