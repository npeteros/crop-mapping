<?php

namespace App\Http\Controllers;

use App\Models\Barangay;
use App\Models\Farm;
use App\Models\PrecreatedUser;
use App\Models\User;
use App\Models\Zone;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Log;

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
            'user' => $request->user_type == 'precreated' ? PrecreatedUser::find($request->user)->load(['barangay']) : User::find($request->user)->load(['barangay']),
            'user_type' => $request->user_type,
            'barangays' => Barangay::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'user_id' => $request->userType == 'precreated' ? 'required|exists:precreated_users,id' : 'required|exists:users,id',
            'userType' => 'required|in:precreated,user',
            'color' => 'required|string',
            'coords' => 'required|array|min:1',
            'coords.*.0' => 'required|numeric',
            'coords.*.1' => 'required|numeric',
        ]);

        $farm = $validated['userType'] == 'precreated' ? Farm::create([
            'precreated_user_id' => $validated['user_id'],
            'color' => $validated['color']
        ]) : Farm::create([
                        'user_id' => $validated['user_id'],
                        'color' => $validated['color']
                    ]);

        foreach ($validated['coords'] as $coord) {
            Zone::create([
                'farm_id' => $farm->id,
                'latitude'  => $coord[0],
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
        Log::info($farm);
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
