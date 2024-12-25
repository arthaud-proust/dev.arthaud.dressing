<?php

namespace App\Http\Controllers;

use App\Dtos\ClothesCategoryDto;
use App\Dtos\FlashMessageDto;
use App\Http\Requests\StoreClothingCategoryRequest;
use App\Http\Requests\UpdateClothingCategoryRequest;
use App\Models\ClothesCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;
use function redirect;
use function str_ends_with;

class ClothesCategoryController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('ClothesCategory/Index', [
            'clothesCategories' => ClothesCategoryDto::collect($request->user()->clothesCategories()->exceptUncategorized()->latest()->get()),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('ClothesCategory/Create');
    }

    public function store(StoreClothingCategoryRequest $request): RedirectResponse
    {
        Gate::authorize('create', ClothesCategory::class);

        $validated = $request->validated();

        $clothesCategory = $request->user()->clothesCategories()->create([
            'name' => $validated['name'],
        ]);

        foreach ($validated['clothesMinByDressing'] as $dressingId => $min) {
            $clothesCategory->clothesCategoryRequirements()->where('dressing_id', $dressingId)->update([
                'min' => $min,
            ]);
        }

        Session::flash('success', new FlashMessageDto("Catégorie $clothesCategory->name créée"));

        if (str_ends_with(url()->previous(), '/clothes/create')) {
            return redirect()->back();
        }

        return redirect()
            ->route('clothes-categories.index');
    }

    public function edit(Request $request, ClothesCategory $clothesCategory): Response
    {
        return Inertia::render('ClothesCategory/Edit', [
            'clothesCategory' => ClothesCategoryDto::from($clothesCategory),
            'clothesMinByDressing' => $clothesCategory->clothesCategoryRequirements()->pluck('min', 'dressing_id'),
        ]);
    }

    public function update(UpdateClothingCategoryRequest $request, ClothesCategory $clothesCategory): RedirectResponse
    {
        Gate::authorize('update', $clothesCategory);

        $validated = $request->validated();
        $clothesCategory->update([
            'name' => $validated['name'],
        ]);

        foreach ($validated['clothesMinByDressing'] as $dressingId => $min) {
            $clothesCategory->clothesCategoryRequirements()->where('dressing_id', $dressingId)->update([
                'min' => $min,
            ]);
        }

        return redirect()
            ->route('clothes-categories.index')
            ->with('success', new FlashMessageDto("Catégorie $clothesCategory->name modifiée"));
    }

    public function destroy(ClothesCategory $clothesCategory): RedirectResponse
    {
        Gate::authorize('delete', $clothesCategory);

        $clothesCategory->delete();

        return redirect()
            ->route('clothes-categories.index')
            ->with('success', new FlashMessageDto("Catégorie $clothesCategory->name supprimée"));
    }
}
