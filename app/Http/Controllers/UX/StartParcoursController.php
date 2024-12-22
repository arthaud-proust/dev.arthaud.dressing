<?php

namespace App\Http\Controllers\UX;

use App\Http\Controllers\Controller;
use App\UX\Parcours\EmptyUserParcours;
use App\UX\Parcours\SuitcaseParcours;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use function abort;

class StartParcoursController extends Controller
{

    public function __construct(
        private readonly EmptyUserParcours $emptyUserParcours,
        private readonly SuitcaseParcours $suitcaseParcours
    ) {
    }

    public function __invoke(Request $request, string $parcours): RedirectResponse
    {
        return match ($parcours) {
            "empty" => $this->emptyUserParcours->start(),
            "suitcase" => $this->suitcaseParcours->start(),
            default => abort(404)
        };
    }
}
