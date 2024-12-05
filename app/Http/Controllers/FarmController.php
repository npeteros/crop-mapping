<?php

namespace App\Http\Controllers;

use App\Models\Barangay;
use App\Models\Farm;
use App\Models\PrecreatedUser;
use App\Models\User;
use App\Models\Zone;
use DB;
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
        $farms = Farm::with(['zones'])->get();

        $farms->each(function ($farm) {
            $farm->user = User::with([
                'barangay',
                'crops' => function ($query) {
                    $query->where('approved', 1);
                },
                'crops.cropType'
            ])->where('rsba', $farm->rsba)->first() ??
                PrecreatedUser::with(['barangay'])->where('rsba', $farm->rsba)->first();
        });

        return Inertia::render('Farms/Index', [
            'farms' => $farms,
            'users' => User::where('role', 'farmer')->get(),
            'precreatedUsers' => PrecreatedUser::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $user = User::where('rsba', $request->user)->with('barangay')->first() ?? PrecreatedUser::where('rsba', $request->user)->with('barangay')->first();
        Log::info('User: ' . $request->user);
        return Inertia::render('Farms/Create', [
            'user' => $user,
            'barangays' => Barangay::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'rsba' => [
                'required',
                function ($attribute, $value, $fail) {
                    $existsInPrecreatedUsers = DB::table('precreated_users')->where('rsba', $value)->exists();
                    $existsInUsers = DB::table('users')->where('rsba', $value)->exists();

                    if (!$existsInPrecreatedUsers && !$existsInUsers) {
                        $fail('The RSBA must exist in either the precreated_users or users table.');
                    }
                },
            ],
            'color' => 'required|string',
            'coords' => 'required|array|min:1',
            'coords.*.0' => 'required|numeric',
            'coords.*.1' => 'required|numeric',
        ]);

        $farm = Farm::create([
            'rsba' => $validated['rsba'],
            'color' => $validated['color']
        ]);

        foreach ($validated['coords'] as $coord) {
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
    public function show(Farm $farm)
    {
        $user = User::where('rsba', $farm->rsba)->with('barangay')->first() ?? PrecreatedUser::where('rsba', $farm->rsba)->with('barangay')->first();
        $farm->user = $user;
        return Inertia::render('Farms/Show', [
            'farm' => $farm->load(['zones']),
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
        $farm->delete();

        return redirect(route('farms.index'));
    }
}
