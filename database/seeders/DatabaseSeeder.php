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

        foreach ($barangays as $barangay) {
            Barangay::factory()->create([
                'name' => $barangay
            ]);
        }

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('test'),
            'barangay_id' => 1
        ]);

        // User::factory(50)->create();

        // for ($i = 0; $i < 50; $i++) {
        //     $user = User::factory()->create();

        //     Crop::factory()->create([
        //         'user_id' => $user->id
        //     ]);
        // }
    }
}
