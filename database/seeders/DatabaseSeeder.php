<?php

namespace Database\Seeders;

use App\Models\Barangay;
use App\Models\Crop;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Hash;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('test')
        ]);

        for ($i = 0; $i < 30; $i++) {
            Barangay::factory()->hasUsers(rand(1, 10))->create();
        }
        User::factory(50)->create();

        Crop::factory()->create([
            'name' => 'Rice',
            'color' => '#BCFF79'
        ]);

        Crop::factory()->create([
            'name' => 'Corn',
            'color' => '#FCE450'
        ]);

        $allCrops = Crop::all();
        
        User::where('role', 'Farmer')->each(function ($farmer) use ($allCrops) {
            $farmer->crops()->attach(
                $allCrops->random(rand(1, $allCrops->count()))->pluck('id')->toArray()
            );
        });
    }
}
