<?php

namespace App\Http\Controllers;

use App\Mail\ApprovedResourceRequest;
use App\Models\Equipment;
use App\Models\Fertilizer;
use App\Models\ResourceRequest;
use App\Models\Seed;
use Illuminate\Http\Request;
use Log;
use Mail;

class ResourceRequestController extends Controller
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

        Log::info($request->all());
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'category' => 'required|in:seed,equipment,fertilizer',
            'resource_id' => [
                'required',
                function ($attribute, $value, $fail) use ($request) {
                    if ($request->category === 'fertilizer' && !Fertilizer::where('id', $value)->exists()) {
                        $fail('The selected fertilizer resource does not exist.');
                    } elseif ($request->category === 'equipment' && !Equipment::where('id', $value)->exists()) {
                        $fail('The selected equipment resource does not exist.');
                    } elseif ($request->category === 'seed' && !Seed::where('id', $value)->exists()) {
                        $fail('The selected seed resource does not exist.');
                    }
                },
            ]
        ]);

        Log::info($validated);

        switch ($validated['category']) {
            case 'fertilizer':
                $fertilizer = Fertilizer::where('id', $validated['resource_id'])->first();
                ResourceRequest::create([
                    'user_id' => $validated['user_id'],
                    'category' => 'fertilizer',
                    'fertilizer_id' => $fertilizer->id,
                ]);
                break;
            case 'equipment':
                $equipment = Equipment::where('id', $validated['resource_id'])->first();
                ResourceRequest::create([
                    'user_id' => $validated['user_id'],
                    'category' => 'equipment',
                    'equipment_id' => $equipment->id,
                ]);
                break;
            case 'seed':
                $seed = Seed::where('id', $validated['resource_id'])->first();
                $seed->resourceRequests()->create([
                    'user_id' => $validated['user_id'],
                    'category' => 'seed',
                    'seed_id' => $seed->id,
                ]);
                break;

            default:
                break;
        }

        return redirect(route('my-requests'));
    }

    /**
     * Display the specified resource.
     */
    public function show(ResourceRequest $resourceRequest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ResourceRequest $resourceRequest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ResourceRequest $resourceRequest)
    {
        $validated = $request->validate([
            'deliveryDate' => 'required|date|after:today',
        ]);
        // $resourceRequest->update([
        //     'status' => 'approved',
        //     'date_approved' => now()
        // ]);
        $resource = ResourceRequest::with(['fertilizer', 'equipment', 'seed', 'user'])
            ->where('id', $resourceRequest->id)
            ->get()
            ->map(function ($request) {
                $requestName = null;

                if ($request->category === 'fertilizer' && $request->fertilizer) {
                    $requestName = $request->fertilizer->name;
                } elseif ($request->category === 'equipment' && $request->equipment) {
                    $requestName = $request->equipment->name;
                } elseif ($request->category === 'seed' && $request->seed) {
                    $requestName = $request->seed->name;
                }

                return [
                    'farmer' =>$request->user->first_name . ' ' . $request->user->middle_name . ' ' . $request->user->last_name,
                    'name' => $requestName,
                ];
            })->first();
        $resource['delivery_date'] = $request->deliveryDate;

        Mail::to($resourceRequest->user->contact_email)->send(new ApprovedResourceRequest($resource));

        return redirect(route(name: 'manage-requests'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ResourceRequest $resourceRequest)
    {
        if (auth()->user()->role == 'bmao') {
            $resourceRequest->update(['status' => 'rejected']);
            return redirect(route('manage-requests'));
        } else {
            $resourceRequest->delete();

            return redirect(route('my-requests'));
        }
    }
}
