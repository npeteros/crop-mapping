<?php

namespace App\Http\Controllers;

use App\Models\Farm;
use App\Models\PrecreatedUser;
use Hash;
use Illuminate\Http\Request;
use Log;

class PrecreatedUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
            'rsba' => 'required|unique:users,rsba',
            'lastName' => 'required|string',
            'firstName' => 'required|string',
            'middleName' => 'nullable|string',
            'email' => 'required|email|unique:users,email',
            'barangayId' => 'required|exists:barangays,id',
            'password' => 'required',
        ]);
    
        $user = PrecreatedUser::create([
            'rsba' => $validated['rsba'],
            'last_name' => $validated['lastName'],
            'first_name' => $validated['firstName'],
            'middle_name' => $validated['middleName'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'unhashed_password' => $validated['password'],
            'barangay_id' => $validated['barangayId'],
        ]);
    
        return redirect(route('farms.create', ['user' => $user->rsba]));
    }

    /**
     * Display the specified resource.
     */
    public function show(PrecreatedUser $precreatedUser)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PrecreatedUser $precreatedUser)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PrecreatedUser $precreatedUser)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PrecreatedUser $precreatedUser)
    {
        $precreatedUser->delete();

        return redirect(route('manage-accounts'));
    }
}
