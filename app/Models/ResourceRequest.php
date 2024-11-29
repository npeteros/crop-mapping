<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ResourceRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category',
        'fertilizer_id',
        'equipment_id',
        'seed_id',
        'status',
        'date_approved'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
    public function fertilizer(): BelongsTo
    {
        return $this->belongsTo(Fertilizer::class);
    }

    public function equipment(): BelongsTo
    {
        return $this->belongsTo(Equipment::class);
    }

    public function seed(): BelongsTo
    {
        return $this->belongsTo(Seed::class);
    }
}
