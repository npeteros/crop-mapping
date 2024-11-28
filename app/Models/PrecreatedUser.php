<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class PrecreatedUser extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'last_name',
        'first_name',
        'middle_name',
        'email',
        'password',
        'address',
        'rsba',
        'birthdate',
        'barangay_id',
        'farm_id'
    ];
    
    protected $hidden = [
        'password',
        'remember_token',
    ];
    
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function barangay(): BelongsTo
    {
        return $this->belongsTo(Barangay::class);
    }

    public function farm(): BelongsTo
    {
        return $this->belongsTo(Farm::class);
    }
}
