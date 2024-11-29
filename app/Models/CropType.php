<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CropType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function crops(): HasMany
    {
        return $this->hasMany(Crop::class);
    }
}
