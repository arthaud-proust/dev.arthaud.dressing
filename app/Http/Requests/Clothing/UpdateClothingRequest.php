<?php

namespace App\Http\Requests\Clothing;

use App\Models\ClothesCategory;
use App\Models\Dressing;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateClothingRequest extends FormRequest
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
            'clothes_category_id' => [Rule::exists(ClothesCategory::class, 'id')->where('user_id', $this->user()->id)],
            'dressing_id' => [Rule::exists(Dressing::class, 'id')->where('user_id', $this->user()->id)],
            'description' => ['string', 'max:255'],
        ];
    }
}
