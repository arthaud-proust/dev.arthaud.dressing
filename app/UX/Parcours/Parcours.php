<?php

namespace App\UX\Parcours;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use function auth;

abstract class Parcours
{
    abstract public function setup(): User;

    abstract public function redirect(): RedirectResponse;

    public function start(): RedirectResponse
    {
        $user = $this->setup();

        auth()->login($user);

        return $this->redirect();
    }
}
