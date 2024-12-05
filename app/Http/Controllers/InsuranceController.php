<?php

namespace App\Http\Controllers;

use App\Models\Barangay;
use App\Models\Insurance;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Log;

class InsuranceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Insurance/Index', [
            'insurances' => Insurance::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Insurance/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'rsba' => 'required|exists:users,rsba',
            'lastName' => 'required|string',
            'firstName' => 'required|string',
            'middleName' => 'string',
            'sex' => 'required|string|in:male,female',
            'mobile' => 'required|string',
            'dob' => 'required|date',
            'email' => 'required|email',
            'civilStatus' => 'required|string|in:single,married,widowed,separated',
            'spouse' => 'required_if:civilStatus,married',
            'cropType' => 'required|string',
            'plantingSeason' => 'required|string|in:wet,dry',
            'plantingDate' => 'required|date',
            'harvestDate' => 'required|date|after:plantingDate',
            'cultivationArea' => 'required|integer',
            'coverageType' => 'required|string|in:multirisk,disaster',
            'sumInsured' => 'required|integer',
            'beneficiaryNameA' => 'required|string',
            'beneficiaryAgeA' => 'required|integer',
            'beneficiaryRelationshipA' => 'required|string',
            'beneficiaryNameB' => 'required|string',
            'beneficiaryAgeB' => 'required|integer',
            'beneficiaryRelationshipB' => 'required|string',
            'farmImage' => 'required|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        if($request->hasFile('farmImage')) {
            $image = $request->file('farmImage');
            $path = $image->store('images', 'public');

            Insurance::create([
                'user_id' => auth()->user()->id,
                'rsba' => $validated['rsba'],
                'last_name' => $validated['lastName'],
                'first_name' => $validated['firstName'],
                'middle_name' => $validated['middleName'],
                'sex' => $validated['sex'],
                'mobile' => $validated['mobile'],
                'dob' => $validated['dob'],
                'email' => $validated['email'],
                'civil_status' => $validated['civilStatus'],
                'spouse' => $validated['spouse'] ?? null,
                'crop_type' => $validated['cropType'],
                'planting_season' => $validated['plantingSeason'],
                'planting_date' => $validated['plantingDate'],
                'harvest_date' => $validated['harvestDate'],
                'cultivation_area' => $validated['cultivationArea'],
                'coverage_type' => $validated['coverageType'],
                'sum_insured' => $validated['sumInsured'],                
                'beneficiary_name_a' => $validated['beneficiaryNameA'],
                'beneficiary_age_a' => $validated['beneficiaryAgeA'],
                'beneficiary_relationship_a' => $validated['beneficiaryRelationshipA'],
                'beneficiary_name_b' => $validated['beneficiaryNameB'],
                'beneficiary_age_b' => $validated['beneficiaryAgeB'],
                'beneficiary_relationship_b' => $validated['beneficiaryRelationshipB'],
                'farm_image' => $path
            ]);
        }

        return redirect(route('home'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Insurance $insurance)
    {
        return Inertia::render('Insurance/Show', [
            'insurance' => $insurance
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Insurance $insurance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Insurance $insurance)
    {
        if($request->approved == 1) {
            $validated = $request->validate([
                'approved' => 'required|boolean'
            ]);
    
            $insurance->approved = $validated['approved'];
            $insurance->save();
        } else {
            $validated = $request->validate([
                'approved' => 'required|boolean',
                'reason' => 'required|string'
            ]);
    
            $insurance->approved = $validated['approved'];
            $insurance->reason = $validated['reason'];
            $insurance->save();
        }
        

        return redirect(route('insurance.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Insurance $insurance)
    {
        //
    }
}
