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
    public function store(Request $request)
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
            'specifiedHigh' => 'required_if:cropType,high',
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

            $user = User::where('rsba', $validated['rsba'])->first();

            $pdf = new Fpdi();
            $pdf->AddPage();
            $pdf->setSourceFile(storage_path('app/template.pdf')); // Path to your PDF template
            $templateId = $pdf->importPage(1);
            $pdf->useTemplate($templateId);

            $pdf->SetFont('helvetica');
            $pdf->SetFontSize(8);
            $pdf->SetTextColor(0, 0, 0);
            $pdf->SetXY(15, 64); // last name
            $pdf->Write(10, $validated['lastName']);
            $pdf->SetXY(80, 64); // first name
            $pdf->Write(10, $validated['firstName']);
            $pdf->SetXY(150, 66); // middle name
            $pdf->Write(10, $validated['middleName']);
            $pdf->SetXY(15, 71); // address
            $pdf->Write(10, $user->address . ", " . $user->barangay->name . ", Balamban City, Cebu");
            $pdf->SetXY(162, 74); // mobile
            $pdf->Write(10, $validated['mobile']);

            if ($validated['sex'] == 'male') {
                $pdf->SetXY(21, 85); // male
            } else {
                $pdf->SetXY(21, 89); // female
            }
            $pdf->Write(10, "X");

            list($year, $month, $day) = explode('-', $validated['dob']);
            list($M1, $M2) = str_split($month);
            list($D1, $D2) = str_split($day);
            list($Y1, $Y2, $Y3, $Y4) = str_split($year);
            $pdf->SetXY(40, 85); // M1
            $pdf->Write(10, $M1);
            $pdf->SetXY(45, 85); // M2
            $pdf->Write(10, $M2);
            $pdf->SetXY(53, 85); // D1
            $pdf->Write(10, $D1);
            $pdf->SetXY(58, 85); // D2
            $pdf->Write(10, $D2);
            $pdf->SetXY(67, 85); // Y1
            $pdf->Write(10, $Y1);
            $pdf->SetXY(72, 85); // Y2
            $pdf->Write(10, $Y2);
            $pdf->SetXY(77, 85); // Y3
            $pdf->Write(10, $Y3);
            $pdf->SetXY(82, 85); // Y4
            $pdf->Write(10, $Y4);

            $age = date_diff(date_create($validated['dob']), date_create('now'))->y;
            $pdf->SetXY(99, 83); // age
            $pdf->Write(10, $age);

            if ($validated['civilStatus'] == 'single') {
                $pdf->SetXY(29, 94); // single
            } else if ($validated['civilStatus'] == 'married') {
                $pdf->SetXY(41.5, 94); // married
            } else if ($validated['civilStatus'] == 'widowed') {
                $pdf->SetXY(57, 94); // widowed
            } else if ($validated['civilStatus'] == 'separated') {
                $pdf->SetXY(75.5, 94); // separated
            }
            $pdf->Write(10, "X");

            if ($validated['civilStatus'] == 'married') {
                $pdf->SetXY(46, 97.5); // spouse
                $pdf->Write(10, $validated['spouse']);
            }

            $pdf->SetXY(38, 106); // beneficiaryNameA
            $pdf->Write(10, $validated['beneficiaryNameA']);
            $pdf->SetXY(114, 106); // beneficiaryAgeA
            $pdf->Write(10, $validated['beneficiaryAgeA']);
            $pdf->SetXY(152, 106); // beneficiaryRelationshipA
            $pdf->Write(10, $validated['beneficiaryRelationshipA']);
            $pdf->SetXY(38, 110); // beneficiaryNameB
            $pdf->Write(10, $validated['beneficiaryNameB']);
            $pdf->SetXY(114, 110); // beneficiaryAgeB
            $pdf->Write(10, $validated['beneficiaryAgeB']);
            $pdf->SetXY(152, 110); // beneficiaryRelationshipB
            $pdf->Write(10, $validated['beneficiaryRelationshipB']);

            if ($validated['cropType'] == 'rice') {
                $pdf->SetXY(23, 231); //RiceCoverage
            } else if($validated['cropType'] == 'corn') {
                $pdf->SetXY(23, 236); // CornCoverage
            } else {
                $pdf->SetXY(37, 236); // HighValuedCrop
            }
            $pdf->Write(10, "X");

            if($validated['cropType'] == 'high') {
                $pdf->SetXY(50, 240); // SpecifiedHigh
                $pdf->Write(10, $validated['specifiedHigh']);
            }

            // $pdf->SetXY(38, 243.5); // AmountCovered
            // $pdf->Write(10, $validated['sumInsured']);

            if ($validated['coverageType'] == "multirisk") {
                $pdf->SetXY(83, 231.5); // Multi-Risk 231.5
            } else {
                $pdf->SetXY(83, 236); // Natural Disaster
            }
            $pdf->Write(10, "X");

            $baseOutputPath = storage_path('app/public/');
            $addedOutputPath = 'forms/filled_form_' . now()->timestamp . '.pdf';
            // $addedOutputPath = 'filled_form.pdf';
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
