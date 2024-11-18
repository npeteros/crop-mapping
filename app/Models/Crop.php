<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Crop extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'color'
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'farmer_crops')
            ->withTimestamps();
    }
}
