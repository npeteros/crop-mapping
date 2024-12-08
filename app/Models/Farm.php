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
        'rsba',
        'color'
    ];

    public function zones(): HasMany
    {
        return $this->hasMany(Zone::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'rsba', 'rsba');
    }

    public function precreatedUser()
    {
        return $this->belongsTo(PrecreatedUser::class, 'rsba', 'rsba');
    }

    public function crops(): HasMany
    {
        return $this->hasMany(Crop::class);
    }
    
    protected function getOwner()
    {
        return $this->user ?? $this->precreatedUser;
    }
}
