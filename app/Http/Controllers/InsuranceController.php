<?php

namespace App\Http\Controllers;

use App\Mail\InterviewScheduleDetails;
use App\Models\Barangay;
use App\Models\Insurance;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Log;
use Mail;
use setasign\Fpdi\Fpdi;

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

        if ($request->hasFile('farmImage')) {
            $image = $request->file('farmImage');
            $path = $image->store('images', 'public');

            $pdf = new Fpdi();
            $pdf->AddPage();
            $pdf->setSourceFile(storage_path('app/template.pdf')); // Path to your PDF template
            $templateId = $pdf->importPage(1);
            $pdf->useTemplate($templateId);

            $pdf->SetFont('helvetica');
            $pdf->SetFontSize(8);
            $pdf->SetTextColor(0, 0, 0);
            $pdf->SetXY(15, 68); // last name
            $pdf->Write(10, $validated['lastName']);
            $pdf->SetXY(80, 68); // first name
            $pdf->Write(10, $validated['firstName']);
            $pdf->SetXY(150, 68); // middle name
            $pdf->Write(10, $validated['middleName']);
            $pdf->SetXY(15, 77); // address
            $pdf->Write(10, "898 Madelynn Port,Maryjanefort, NJ 87863");
            $pdf->SetXY(162, 77); // mobile
            $pdf->Write(10, $validated['mobile']);

            if ($validated['sex'] == 'male') {
                $pdf->SetXY(21, 87); // male
            } else {
                $pdf->SetXY(21, 91); // female
            }
            $pdf->Write(10, "X");

            list($year, $month, $day) = explode('-', $validated['dob']);
            list($M1, $M2) = str_split($month);
            list($D1, $D2) = str_split($day);
            list($Y1, $Y2, $Y3, $Y4) = str_split($year);
            $pdf->SetXY(40, 87); // M1
            $pdf->Write(10, $M1);
            $pdf->SetXY(45, 87); // M2
            $pdf->Write(10, $M2);
            $pdf->SetXY(53, 87); // D1
            $pdf->Write(10, $D1);
            $pdf->SetXY(58, 87); // D2
            $pdf->Write(10, $D2);
            $pdf->SetXY(67, 87); // Y1
            $pdf->Write(10, $Y1);
            $pdf->SetXY(72, 87); // Y2
            $pdf->Write(10, $Y2);
            $pdf->SetXY(77, 87); // Y3
            $pdf->Write(10, $Y3);
            $pdf->SetXY(82, 87); // Y4
            $pdf->Write(10, $Y4);

            $age = date_diff(date_create($validated['dob']), date_create('now'))->y;
            $pdf->SetXY(99, 86); // age
            $pdf->Write(10, $age);

            if ($validated['civilStatus'] == 'single') {
                $pdf->SetXY(29, 96.5); // single
            } else if ($validated['civilStatus'] == 'married') {
                $pdf->SetXY(41.5, 96.5); // married
            } else if ($validated['civilStatus'] == 'widowed') {
                $pdf->SetXY(57, 96.5); // widowed
            } else if ($validated['civilStatus'] == 'separated') {
                $pdf->SetXY(75.5, 96.5); // separated
            }
            $pdf->Write(10, "X");

            if ($validated['civilStatus'] == 'married') {
                $pdf->SetXY(23, 101); // spouse
                $pdf->Write(10, $validated['spouse']);
            }

            $pdf->SetXY(38, 109); // beneficiaryNameA
            $pdf->Write(10, $validated['beneficiaryNameA']);
            $pdf->SetXY(114, 109); // beneficiaryAgeA
            $pdf->Write(10, $validated['beneficiaryAgeA']);
            $pdf->SetXY(152, 109); // beneficiaryRelationshipA
            $pdf->Write(10, $validated['beneficiaryRelationshipA']);
            $pdf->SetXY(38, 112.5); // beneficiaryNameB
            $pdf->Write(10, $validated['beneficiaryNameB']);
            $pdf->SetXY(114, 112.5); // beneficiaryAgeB
            $pdf->Write(10, $validated['beneficiaryAgeB']);
            $pdf->SetXY(152, 112.5); // beneficiaryRelationshipB
            $pdf->Write(10, $validated['beneficiaryRelationshipB']);

            if ($validated['cropType'] == 'rice') {
                $pdf->SetXY(23, 233.5); //RiceCoverage
            } else {
                $pdf->SetXY(23, 238); // CornCoverage
            }
            $pdf->Write(10, "X");


            $pdf->SetXY(38, 243.5); // AmountCovered
            $pdf->Write(10, $validated['sumInsured']);

            if ($validated['coverageType'] == "multirisk") {
                $pdf->SetXY(83, 233.5); // Multi-Risk
            } else {
                $pdf->SetXY(83, 238); // Natural Disaster
            }
            $pdf->Write(10, "X");

            $baseOutputPath = storage_path('app/public/');
            $addedOutputPath = 'forms/filled_form_' . now()->timestamp . '.pdf';
            $outputPath = $baseOutputPath . $addedOutputPath;
            $pdf->Output($outputPath, 'F');

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
                'farm_image' => $path,
                'application_pdf' => $addedOutputPath
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
        $validated = $request->validate([
            'userId' => 'required|exists:users,id',
            'approved' => 'required|boolean',
            'scheduleDate' => 'required|date|after:today',
            'scheduleTime' => [
                'required',
                'date_format:H:i',
                'after_or_equal:08:00',
            ],
        ]);

        $user = User::find($validated['userId']);

        $insurance->approved = $validated['approved'];
        $insurance->schedule_date = $validated['scheduleDate'];
        $insurance->schedule_time = $validated['scheduleTime'];
        $insurance->save();


        Mail::to($user->contact_email)->send(new InterviewScheduleDetails($user, $insurance->schedule_date, $insurance->schedule_time));

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
