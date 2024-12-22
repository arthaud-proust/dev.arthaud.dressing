<?php

namespace App\UX\Parcours;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use function config;
use function redirect;

class EmptyUserParcours extends Parcours
{
    private const USER_EMAIL = 'empty@example.com';

    public function setup(): User
    {
        $user = User::firstOrCreate([
            'email' => self::USER_EMAIL,
        ], [
            'name' => 'Empty User',

            'password' => config('app.test_user.password'),
        ]);

        $user->dressings()->delete();
        $user->clothesCategories()->delete();

        return $user;
    }

    public function redirect(): RedirectResponse
    {
        return redirect()->route('dashboard');
    }
}
