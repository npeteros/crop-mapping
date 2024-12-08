<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use setasign\Fpdi\Fpdi;

class PdfController extends Controller
{
    public function generate(Request $request)
    {
        $validated = [
            'lastName' => 'Peteros',
            'firstName' => 'Neal Andrew',
            'middleName' => 'Borbon',
            'sex' => 'M',
            'mobile' => '09123456789',
            'dob' => '1999-01-01',
            'email' => 'zV4Q8@example.com',
            'civilStatus' => 'single',
            'spouse' => null,
            'cropType' => 'rice',
            'plantingSeason' => 'wet',
            'plantingDate' => '2023-01-01',
            'harvestDate' => '2023-01-01',
            'cultivationArea' => 100,
            'coverageType' => 'multirisk',
            'sumInsured' => 1000,
            'beneficiaryNameA' => 'John Doe',
            'beneficiaryAgeA' => 30,
            'beneficiaryRelationship_a' => 'son',
            'beneficiaryNameB' => 'Jane Doe',
            'beneficiaryAgeB' => 25,
            'beneficiaryRelationshipB' => 'daughter',
        ];

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

        if($validated['civilStatus'] == 'single') {
            $pdf->SetXY(29, 96.5); // single
        } else if($validated['civilStatus'] == 'married') {
            $pdf->SetXY(41.5, 96.5); // married
        } else if($validated['civilStatus'] == 'widowed') {
            $pdf->SetXY(57, 96.5); // widowed
        } else if($validated['civilStatus'] == 'separated') {
            $pdf->SetXY(75.5, 96.5); // separated
        }
        $pdf->Write(10, "X");
        
        if($validated['civilStatus'] == 'married') {
            $pdf->SetXY(23, 101); // spouse
            $pdf->Write(10, $validated['spouse']);
        }
        
        $pdf->SetXY(38, 109); // beneficiaryNameA
        $pdf->Write(10, $validated['beneficiary_name_a']);
        $pdf->SetXY(114, 109); // beneficiaryAgeA
        $pdf->Write(10, $validated['beneficiary_age_a']);
        $pdf->SetXY(152, 109); // beneficiaryRelationshipA
        $pdf->Write(10, $validated['beneficiary_relationship_a']);
        $pdf->SetXY(38, 112.5); // beneficiaryNameB
        $pdf->Write(10, $validated['beneficiary_name_b']);
        $pdf->SetXY(114, 112.5); // beneficiaryAgeB
        $pdf->Write(10, $validated['beneficiary_age_b']);
        $pdf->SetXY(152, 112.5); // beneficiaryRelationshipB
        $pdf->Write(10, $validated['beneficiary_relationship_b']);

        if($validated['cropType'] == 'rice') {
            $pdf->SetXY(23, 233.5); //RiceCoverage
        } else {
            $pdf->SetXY(23, 238); // CornCoverage
        }
        $pdf->Write(10, "X");
        

        $pdf->SetXY(38, 243.5); // AmountCovered
        $pdf->Write(10, $validated['sum_insured']);

        if($validated['coverage_type'] == "multirisk") {
            $pdf->SetXY(83, 233.5); // Multi-Risk
        } else {
            $pdf->SetXY(83, 238); // Natural Disaster
        }
        $pdf->Write(10, "X");

        $baseOutputPath = storage_path('app/filled_form');
        $outputPath = $baseOutputPath . '_' . now()->timestamp . '.pdf';
        $pdf->Output($outputPath, 'F');

        // Return the filled PDF for download
        return response()->download($outputPath)->deleteFileAfterSend();
    }
}
