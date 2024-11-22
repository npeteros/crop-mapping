<?php

namespace App\Http\Controllers;

use App\Models\Barangay;
use App\Models\Crop;
use App\Models\Farm;
use App\Models\User;
use App\Models\Zone;
use Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log; 

class FarmController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Farms', [
            'barangays' => Barangay::withCount('users')->get(),
            'farmers' => User::with('barangay')->where('role', 'Farmer')->has('barangay')->get(),
            'farms' => Farm::with(['zones', 'user'])->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        Log::info("message", $request->all());
        $validated = $request->validate([
            'name' => 'required|string',
            'color' => 'required|string',
            'address' => 'required|string',
            'birthdate' => 'required|date|before:today',
            'barangay_id' => 'required|exists:barangays,id|not_in:-1',
            'coords' => 'required|array|min:1',
            'coords.*.0' => 'required|numeric',
            'coords.*.1' => 'required|numeric',
        ]);
        Log::info("validated", $validated);

        $farmer = User::create([
            'name' => $validated['name'],
            'email' => strtolower(str_replace(' ', '', $validated['name'])) . '@bmao.com',
            'password' => Hash::make('password'),
            'address' => $validated['address'],
            'birthdate' => $validated['birthdate'],
            'role' => 'Farmer',
            'barangay_id' => $validated['barangay_id'],
        ]);

        $farm = Farm::create([
            'user_id' => $farmer->id,
            'color' => $validated['color'],
        ]);

        foreach($validated['coords'] as $coord) {
            Zone::create([
                'farm_id' => $farm->id,
                'latitude' => $coord[0],
                'longitude' => $coord[1],
            ]);
        }

        return redirect(route('farms.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Crop $crop)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Crop $crop)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Crop $crop)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Crop $crop)
    {
        //
    }
}
