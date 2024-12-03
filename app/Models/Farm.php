<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Farm extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'precreated_user_id',
        'color'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function precreatedUser(): BelongsTo
    {
        return $this->belongsTo(PrecreatedUser::class);
    }

    public function zones(): HasMany
    {
        return $this->hasMany(Zone::class);
    }
}
