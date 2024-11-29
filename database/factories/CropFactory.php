<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Crop>
 */
class CropFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'crop_type_id' => 1,
            'planting_date' => fake()->date(),
            'harvest_date' => fake()->date(),
            'land_area' => fake()->numberBetween(1, 99),
            'approved' => fake()->boolean(),
        ];
    }
}
