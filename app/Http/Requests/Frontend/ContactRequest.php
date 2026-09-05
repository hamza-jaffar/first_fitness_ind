<?php

namespace App\Http\Requests\Frontend;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'full_name' => [
                'required',
                'string',
                'min:2',
                'max:100',
            ],

            'email' => [
                'required',
                'string',
                'email:rfc',
                'max:255',
            ],

            'phone_no' => [
                'nullable',
                'string',
                'max:30',
            ],

            'subject' => [
                'nullable',
                'string',
                'min:3',
                'max:150',
            ],

            'comment' => [
                'required',
                'string',
                'min:10',
                'max:5000',
            ],
        ];
    }
}
