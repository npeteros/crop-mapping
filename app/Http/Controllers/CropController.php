<?php

namespace App\Http\Controllers;

use App\Models\Crop;
use App\Models\CropType;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Log;

class CropController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return auth()->user()->role === 'bmao' ? Inertia::render('Crops/AdminIndex', [
            'crops' => Crop::with(['cropType', 'user'])->where('approved', 1)->get(),
        ]) : Inertia::render('Crops/Index', [
                        'crops' => Crop::with(['cropType', 'user'])->where('user_id', auth()->user()->id)->get(),
                        'cropTypes' => CropType::all()
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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'crop_type_id' => 'required|exists:crop_types,id',
            'planting_date' => 'required|date',
            'harvest_date' => 'required|date|after:planting_date',
            'land_area' => 'required|integer',
        ]);

        $request->user()->crops()->create($validated);

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
    public function update(Request $request, Crop $crop): RedirectResponse
    {
        if (auth()->user()->role === 'bmao') {
            $crop->update([
                'approved' => 1,
            ]);

            return redirect(route('pending-crops'));
        } else {
            $validated = $request->validate([
                'planting_date' => 'required|date',
                'harvest_date' => 'required|date|after:planting_date',
                'land_area' => 'required|integer',
            ]);

            $crop->where('id', $crop->id)->update([
                'planting_date' => $validated['planting_date'],
                'harvest_date' => $validated['harvest_date'],
                'land_area' => $validated['land_area'],
            ]);

            return redirect(route('crops.index'));
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Crop $crop)
    {
        $crop->delete();

        return redirect(auth()->user()->role === 'bmao' ? route('pending-crops') : route('crops.index'));
    }
}
