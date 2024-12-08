<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Crop extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'user_id',
        'farm_id',
        'crop_type_id',
        'planting_date',
        'harvest_date',
        'land_area',
        'approved',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo (User::class);
    }

    public function cropType(): BelongsTo
    {
        return $this->belongsTo(CropType::class);
    }

    public function farm(): BelongsTo
    {
        return $this->belongsTo(Farm::class);
    }
}
