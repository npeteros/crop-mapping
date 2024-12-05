<?php

namespace Database\Seeders;

use App\Models\Barangay;
use App\Models\Crop;
use App\Models\CropType;
use App\Models\Equipment;
use App\Models\Fertilizer;
use App\Models\Seed;
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

        $barangays = [
            'Abucayan',
            'Aliwanay',
            'Arpili',
            'Baliwagan',
            'Bayong',
            'Biasong',
            'Buanoy',
            'Cabagdalan',
            'Cabasiangan',
            'Cambuhawe',
            'Cansomoroy',
            'Cantibas',
            'Cantuod',
            'Duangan',
            'Gaas',
            'Ginatilan',
            'Hingatmonan',
            'Lamesa',
            'Liki',
            'Luca',
            'Matun-Og',
            'Nangka',
            'Pondol',
            'Prenza',
            'Singsing',
            'Santa Cruz-Santo Niño',
            'Sunog',
            'Vito'
        ];

        $cropTypes = [
            'Rice',
            'Corn',
            'Eggplant',
            'Beans',
            'Ampalaya',
            'Pechay',
            'Pepper',
            'Tomatoes',
            'Coconuts',
            'Mango',
            'Guyabano'
        ];

        foreach ($barangays as $barangay) {
            Barangay::factory()->create([
                'name' => $barangay
            ]);
        }

        foreach ($cropTypes as $cropType) {
            $newCropType = CropType::factory()->create([
                'name' => $cropType,
                'color' => fake()->hexColor
            ]);

            // $user = User::factory()->create();

            // for ($i = 1; $i <= 2; $i++) {
            //     Crop::factory()->create([
            //         'user_id' => $user->id,
            //         'crop_type_id' => $newCropType->id,
            //         'planting_date' => fake()->date(),
            //         'harvest_date' => fake()->date(),
            //         'land_area' => fake()->numberBetween(1, 99),
            //         'approved' => fake()->boolean(),
            //     ]);
            // }
        }

        User::factory()->create([
            'last_name' => 'Doe',
            'first_name' => 'John',
            'middle_name' => 'Dane',
            'email' => 'johndoe@example.com',
            'password' => Hash::make('test'),
            'rsba' => '1234',
            'barangay_id' => 1,
            'approved' => 1,
        ]);

        User::factory()->create([
            'last_name' => 'BMAO',
            'first_name' => 'Admin',
            'email' => 'admin@bmao.com',
            'password' => Hash::make('admin123'),
            'rsba' => '4321',
            'barangay_id' => 2,
            'role' => 'bmao'
        ]);

        Fertilizer::factory()->create([
            'name' => 'Urea',
            'type' => 'inorganic',
            'stock' => 3
        ]);

        Fertilizer::factory()->create([
            'name' => 'Chicken Manure',
            'type' => 'organic',
            'stock' => 10
        ]);

        Fertilizer::factory()->create([
            'name' => 'Cow Manure',
            'type' => 'organic',
            'stock' => 15
        ]);

        Equipment::factory()->create([
            'name' => 'Tractor',
            'quantity' => 1
        ]);

        Equipment::factory()->create([
            'name' => 'Water Pumps',
            'quantity' => 2
        ]);

        Equipment::factory()->create([
            'name' => 'Sprayers',
            'quantity' => 20
        ]);

        Seed::factory()->create([
            'name' => 'Rice',
            'stock' => 4
        ]);

        Seed::factory()->create([
            'name' => 'Corn',
            'stock' => 5
        ]);

        Seed::factory()->create([
            'name' => 'Tomato',
            'stock' => 6
        ]);

        // User::factory(50)->create();
    }
}
