<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ClothesCategory extends Model
{
    /** @use HasFactory<\Database\Factories\ClothesCategoryFactory> */
    use HasFactory;

    public const UNCATEGORIZED_NAME = 'uncategorized';

    protected $fillable = [
        'name',
        'order',
        'user_id',
    ];

    protected $attributes = [
        'order' => 0,
    ];

    protected static function booted(): void
    {
        static::created(static function (self $clothesCategory) {
            $clothesCategory->user->dressings()->each(function (Dressing $dressing) use ($clothesCategory) {
                ClothesCategoryRequirement::firstOrCreate([
                    'dressing_id' => $dressing->id,
                    'clothes_category_id' => $clothesCategory->id,
                ], [
                    'min' => 0,
                ]);
            });
        });

        static::deleting(static function (self $clothesCategory) {
            $clothesCategory->clothes()->update([
                'clothes_category_id' => $clothesCategory->user->uncategorizedClothesCategory()->id,
            ]);
        });
    }

    public function clothes(): HasMany
    {
        return $this->hasMany(Clothing::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function clothesCategoryRequirements(): HasMany
    {
        return $this->hasMany(ClothesCategoryRequirement::class);
    }

    public function scopeExceptUncategorized(Builder $query): Builder
    {
        return $query->where('name', '!=', self::UNCATEGORIZED_NAME);
    }
}
