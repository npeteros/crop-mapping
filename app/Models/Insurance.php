<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Insurance extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'rsba',
        'last_name',
        'first_name',
        'middle_name',
        'sex',
        'mobile',
        'dob',
        'email',
        'civil_status',
        'spouse',
        'crop_type',
        'planting_season',
        'planting_date',
        'harvest_date',
        'cultivation_area',
        'coverage_type',
        'sum_insured',
        'beneficiary_name_a',
        'beneficiary_age_a',
        'beneficiary_relationship_a',
        'beneficiary_name_b',
        'beneficiary_age_b',
        'beneficiary_relationship_b',
        'farm_image',
        'approved',
        'schedule_date',
        'schedule_time',
        'application_pdf'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
