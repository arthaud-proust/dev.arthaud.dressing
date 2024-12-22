<?php

namespace App\Http\Requests;

use App\Enums\DressingColor;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreDressingRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'color' => ['required', Rule::enum(DressingColor::class)],
            'clothesMinByCategory' => ['nullable', 'array'],
            'clothesMinByCategory.*' => ['integer'],
        ];
    }
}
