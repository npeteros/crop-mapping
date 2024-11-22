<?php

namespace Database\Seeders;

use App\Models\Barangay;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BarangaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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
            'Cantu-od',
            'Duangan',
            'Gaas',
            'Ginatilan',
            'Hingatmonan',
            'Lamesa',
            'Liki',
            'Luca',
            'Matun-og',
            'Nangka',
            'Pondol',
            'Prenza',
            'Singsing',
            'Sta Cruz - Sto. Nino',
            'Sunog',
            'Vito'
        ];

        foreach ($barangays as $barangay) {
            Barangay::create([
                'name' => $barangay
            ]);
        }
    }
}
