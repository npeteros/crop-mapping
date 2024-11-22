<?php

namespace App\Http\Controllers;

use App\Models\Barangay;
use App\Models\Crop;
use App\Models\User;
use App\Models\Zone;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log; 

class CropController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Crops', [
            'barangays' => Barangay::withCount('users')->get(),
            'farmers' => User::with('barangay')->where('role', 'Farmer')->has('barangay')->get(),
            'crops' => Crop::with(['zones', 'user'])->get(),
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

        // Log::info("message", $request->all());
        // $validated = $request->validate([
        //     'name' => 'required|string',
        //     'color' => 'required|string',
        //     'user_id' => 'required|exists:users,id|not_in:-1',
        //     'coords' => 'required|array|min:1',
        //     'coords.*.0' => 'required|numeric',
        //     'coords.*.1' => 'required|numeric',
        // ]);

        // $crop = Crop::create([
        //     'color' => $validated['color'],
        //     'user_id' => $validated['user_id'],
        //     'name' => $validated['name'],
        // ]);

        // foreach($validated['coords'] as $coord) {
        //     Zone::create([
        //         'crop_id' => $crop->id,
        //         'latitude' => $coord[0],
        //         'longitude' => $coord[1],
        //     ]);
        // }

        return redirect(route('crops.index'));
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
