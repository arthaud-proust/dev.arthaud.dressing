<?php

namespace App\Dtos\Overview;

use App\Dtos\ClothingDto;
use App\Dtos\DressingDto;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Dto;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class DressingOverviewDto extends Dto
{
    public function __construct(
        public DressingDto $dressing,
        /** @var ClothingDto[]> */
        public Collection $clothes,
    ) {
    }
}
