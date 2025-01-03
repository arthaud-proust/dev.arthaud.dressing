<?php

namespace App\Http\Controllers;

use App\Dtos\ClothesCategoryDto;
use App\Dtos\ClothingDto;
use App\Dtos\DressingDto;
use App\Dtos\FlashMessageDto;
use App\Http\Requests\StoreDressingRequest;
use App\Http\Requests\UpdateDressingRequest;
use App\Models\ClothesCategory;
use App\Models\Dressing;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use function redirect;

class DressingController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Dressings/Create');
    }

    public function store(StoreDressingRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $dressing = $request->user()->dressings()->create([
            'name' => $validated['name'],
            'color' => $validated['color'],
        ]);

        foreach ($validated['clothesMinByCategory'] as $categoryId => $min) {
            $dressing->clothesCategoryRequirements()->where('clothes_category_id', $categoryId)->update([
                'min' => $min,
            ]);
        }

        return redirect()
            ->route('dressings.show', $dressing)
            ->with('success', new FlashMessageDto("Dressing $dressing->name créé"));
    }

    public function show(Dressing $dressing): Response
    {
        Gate::authorize('view', $dressing);

        return Inertia::render('Dressings/Show', [
            'dressing' => DressingDto::from($dressing),
            'clothesByCategory' => $dressing->user->clothesCategories->map(function (ClothesCategory $clothesCategory) use ($dressing) {
                return [
                    'category' => ClothesCategoryDto::from($clothesCategory),
                    'clothes' => ClothingDto::collect($clothesCategory->clothes()->where('dressing_id', $dressing->id)->get()),
                ];
            }),
        ]);
    }

    public function edit(Dressing $dressing): Response
    {
        Gate::authorize('update', $dressing);

        return Inertia::render('Dressings/Edit', [
            'dressing' => DressingDto::from($dressing),
            'clothesMinByCategory' => $dressing->clothesCategoryRequirements()->pluck('min', 'clothes_category_id'),
        ]);
    }

    public function update(UpdateDressingRequest $request, Dressing $dressing): RedirectResponse
    {
        Gate::authorize('update', $dressing);

        $validated = $request->validated();

        $dressing->update([
            'name' => $validated['name'],
            'color' => $validated['color'],
        ]);

        foreach ($validated['clothesMinByCategory'] as $categoryId => $min) {
            $dressing->clothesCategoryRequirements()->where('clothes_category_id', $categoryId)->update([
                'min' => $min,
            ]);
        }

        return redirect()
            ->route('dressings.show', $dressing)
            ->with('success', new FlashMessageDto('Modifications enregistrées'));
    }

    public function destroy(Dressing $dressing): RedirectResponse
    {
        Gate::authorize('delete', $dressing);

        $dressing->delete();

        return redirect()
            ->route('dashboard')
            ->with('success', new FlashMessageDto("Dressing $dressing->name supprimé"));
    }
}
