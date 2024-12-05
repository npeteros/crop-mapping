<?php

namespace App\Http\Controllers;

use App\Models\CropType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Log;

class CropTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('CropTypes/Index', [
            'cropTypes' => CropType::all(),
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
            'name' => 'required|string|unique:crop_types',
            'color' => 'required|string',
        ]);

        CropType::create([
            'name' => $validated['name'],
            'color' => $validated['color'],
        ]);

        return redirect(route('crop-types.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(CropType $cropType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CropType $cropType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CropType $cropType)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'color' => 'required|string',
        ]);

        $cropType->name = $validated['name'];
        $cropType->color = $validated['color'];
        $cropType->save();

        return redirect(route('crop-types.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CropType $cropType)
    {
        $cropType->delete();

        return redirect(route('crop-types.index'));
    }
}
