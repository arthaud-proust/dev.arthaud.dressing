<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
}
