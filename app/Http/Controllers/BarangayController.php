<?php

namespace App\Http\Controllers;

use App\Models\Barangay;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BarangayController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Barangays/Index', [

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
        $validated = $request->validate([
            'name' => 'required|string'
        ]);

        $request->user()->barangay()->create($validated);

        return redirect(route('barangays.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Barangay $barangay)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Barangay $barangay)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Barangay $barangay)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Barangay $barangay)
    {
        //
    }
}
