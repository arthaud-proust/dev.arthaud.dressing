<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Dressing extends Model
{
    /** @use HasFactory<\Database\Factories\DressingFactory> */
    use HasFactory;

    protected $fillable = [
        "name",
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function clothing(): HasMany
    {
        return $this->hasMany(Clothing::class);
    }
}