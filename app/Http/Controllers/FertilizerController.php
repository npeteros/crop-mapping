<?php

namespace App\Http\Controllers;

use App\Models\Fertilizer;
use Illuminate\Http\Request;

class FertilizerController extends Controller
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
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Fertilizer $fertilizer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Fertilizer $fertilizer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Fertilizer $fertilizer)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'type' => 'required|string|in:organic,inorganic',
            'quantity' => 'required|integer|min:0',
        ]);

        $fertilizer->update([
            'name' => $validated['name'],
            'type' => $validated['type'],
            'stock' => $validated['quantity'],
        ]);

        return redirect(route('resources.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Fertilizer $fertilizer)
    {
        $fertilizer->delete();

        return redirect(route('resources.index'));
    }
}
