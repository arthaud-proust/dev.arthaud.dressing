<?php

namespace App\UX\Parcours;

use App\Models\ClothesCategory;
use App\Models\Clothing;
use App\Models\Dressing;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use function config;
use function redirect;

class SuitcaseParcours extends Parcours
{
    private const USER_EMAIL = 'suitcase@example.com';

    public function setup(): User
    {
        $user = User::firstOrCreate([
            'email' => self::USER_EMAIL,
        ], [
            'name' => 'Suitcase User',

            'password' => config('app.test_user.password'),
        ]);

        $user->dressings()->delete();
        $user->clothesCategories()->delete();

        $trousersCategory = ClothesCategory::factory()->for($user)->create(['name' => "Pantalons et leggings"]);
        $topsCategory = ClothesCategory::factory()->for($user)->create(['name' => "Hauts et t-shirts"]);
        $pullsCategory = ClothesCategory::factory()->for($user)->create(['name' => "Sweats et pulls"]);

        $fatherDressing = Dressing::factory()->for($user)->create(['name' => 'Chez Papa']);
        $trousersCategory->clothesCategoryRequirements()->where('dressing_id', $fatherDressing->id)->update(['min' => 7]);
        Clothing::factory()
            ->for($fatherDressing)
            ->category($trousersCategory)
            ->count(7)
            ->create();
        $topsCategory->clothesCategoryRequirements()->where('dressing_id', $fatherDressing->id)->update(['min' => 7]);
        Clothing::factory()
            ->for($fatherDressing)
            ->category($topsCategory)
            ->count(2)
            ->create();
        $pullsCategory->clothesCategoryRequirements()->where('dressing_id', $fatherDressing->id)->update(['min' => 7]);
        Clothing::factory()
            ->for($fatherDressing)
            ->category($pullsCategory)
            ->count(7)
            ->create();

        $motherDressing = Dressing::factory()->for($user)->create(['name' => 'Chez Maman']);
        $trousersCategory->clothesCategoryRequirements()->where('dressing_id', $motherDressing->id)->update(['min' => 7]);
        Clothing::factory()
            ->for($motherDressing)
            ->category($trousersCategory)
            ->count(5)
            ->create();
        $topsCategory->clothesCategoryRequirements()->where('dressing_id', $motherDressing->id)->update(['min' => 7]);
        Clothing::factory()
            ->for($motherDressing)
            ->category($topsCategory)
            ->count(4)
            ->create();
        $pullsCategory->clothesCategoryRequirements()->where('dressing_id', $motherDressing->id)->update(['min' => 7]);
        Clothing::factory()
            ->for($motherDressing)
            ->category($pullsCategory)
            ->count(7)
            ->create();

        return $user;
    }

    public function redirect(): RedirectResponse
    {
        return redirect()->route('suitcase.index');
    }
}
