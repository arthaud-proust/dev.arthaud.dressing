<?php

namespace App\Http\Controllers;

use App\Dtos\FlashMessageDto;
use App\Http\Requests\ReorderClothesCategoriesRequest;
use function redirect;

class ReorderClothesCategoriesController extends Controller
{
    public function __invoke(ReorderClothesCategoriesRequest $request)
    {
        foreach ($request->validated('ids') as $order => $categoryId) {
            $request->user()->clothesCategories()->where('id', $categoryId)->update([
                'order' => $order,
            ]);
        }

        return redirect()
            ->route('clothes-categories.index')
            ->with('success', new FlashMessageDto('Catégories réordonnées'));
    }
}
