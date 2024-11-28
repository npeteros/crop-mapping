<?php

namespace App\Http\Controllers;

use App\Models\Barangay;
use App\Models\Farm;
use App\Models\PrecreatedUser;
use App\Models\User;
use App\Models\Zone;
use App\Rules\ExistsUser;
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
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Farms/Create', [
            'user' => $request->precreated_user ? PrecreatedUser::find($request->precreated_user)->load(['barangay']) : User::find($request->user)->load(['barangay']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'color' => 'required|string',
            'coords' => 'required|array|min:1',
            'coords.*.0' => 'required|numeric',
            'coords.*.1' => 'required|numeric',
        ]);

        foreach ($validated['coords'] as $coord) {
            Zone::create([
                'farm_id' => $request->farmId,
                'latitude' => $coord[0],
                'longitude' => $coord[1],
            ]);
        }

        return redirect(route('manage-accounts'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Farm $farm)
    {
        return Inertia::render('Farms/Show', [
            'farm' => $farm->load(['user', 'user.barangay', 'precreatedUser', 'precreatedUser.barangay', 'zones']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Farm $farm)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Farm $farm)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Farm $farm)
    {
        //
    }
}
