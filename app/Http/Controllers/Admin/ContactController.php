<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        $query = Contact::query();

        // Filtering
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('subject', 'like', "%{$search}%")
                  ->orWhere('phone_no', 'like', "%{$search}%");
            });
        }

        // Sorting
        $sortField = $request->input('sort', 'created_at');
        $sortDirection = $request->input('direction', 'desc');
        
        $allowedSortFields = ['id', 'full_name', 'email', 'phone_no', 'subject', 'created_at'];
        if (in_array($sortField, $allowedSortFields)) {
            $query->orderBy($sortField, $sortDirection === 'asc' ? 'asc' : 'desc');
        }

        // Pagination
        $perPage = $request->input('per_page', 10);
        $contacts = $query->paginate($perPage)->withQueryString();

        return Inertia::render('dashboard/contacts/index', [
            'contacts' => $contacts,
            'filters' => $request->only(['search', 'sort', 'direction', 'per_page']),
        ]);
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();

        return redirect()->back()->with('success', 'Contact deleted successfully.');
    }
}
