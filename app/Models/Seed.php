<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Seed extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'stock'
    ];

    public function resourceRequests(): HasMany
    {
        return $this->hasMany(ResourceRequest::class);
    }
}
