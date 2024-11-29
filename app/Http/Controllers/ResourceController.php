<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\Fertilizer;
use App\Models\Resource;
use App\Models\Seed;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ResourceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render(auth()->user()->role === 'farmer' ? 'Resources/Index' : 'Resources/AdminIndex', [
            'fertilizers' => Fertilizer::all(),
            'equipments' => Equipment::all(),
            'seeds' => Seed::all(),
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
            'category' => 'required|integer|in:1,2,3',
            'name' => 'required|string',
            'type' => 'required_if:category,1|string',
            'quantity' => 'required|integer|min:0',
        ]);
        
        switch($validated['category']) {
            case 1:
                if (!Fertilizer::where('name', $validated['name'])->exists()) {
                    Fertilizer::create([
                        'name' => $validated['name'],
                        'type' => $validated['type'],
                        'stock' => $validated['quantity'],
                    ]);
                } else {
                    $fertilizer = Fertilizer::where('name', $validated['name'])->first();
                    $fertilizer->update([
                        'stock' => $fertilizer->stock + $validated['quantity'],
                    ]);
                }
                break;
            case 2:
                if (!Equipment::where('name', $validated['name'])->exists()) {
                    Equipment::create([
                        'name' => $validated['name'],
                        'quantity' => $validated['quantity'],
                    ]);
                } else {
                    $equipment = Equipment::where('name', $validated['name'])->first();
                    $equipment->update([
                        'quantity' => $equipment->quantity + $validated['quantity'],
                    ]);
                }
                break;
            case 3:
                if (!Seed::where('name', $validated['name'])->exists()) {
                    Seed::create([
                        'name' => $validated['name'],
                        'stock' => $validated['quantity'],
                    ]);
                } else {
                    $seed = Seed::where('name', $validated['name'])->first();
                    $seed->update([
                        'stock' => $seed->stock + $validated['quantity'],
                    ]);
                }
                break;
        }
        return redirect(route('resources.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Resource $resource)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Resource $resource)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Resource $resource)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Resource $resource)
    {
        //
    }
}
