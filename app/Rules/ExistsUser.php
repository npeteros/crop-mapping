<?php

namespace App\Rules;

use Closure;
use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Validation\ValidationRule;

class ExistsUser implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (
            DB::table('users')->where('id', $value)->exists() ||
            DB::table('precreated_users')->where('id', $value)->exists()
        ) {
            return;
        } else {
            $fail('The selected user does not exist.');
        }
    }
}
