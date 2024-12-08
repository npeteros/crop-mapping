<?php

use App\Events\EmailApproved;
use App\Events\UserApproved;
use App\Http\Controllers\BarangayController;
use App\Http\Controllers\CropController;
use App\Http\Controllers\CropTypeController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\FarmController;
use App\Http\Controllers\FertilizerController;
use App\Http\Controllers\InsuranceController;
use App\Http\Controllers\PdfController;
use App\Http\Controllers\PrecreatedUserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\ResourceRequestController;
use App\Http\Controllers\SeedController;
use App\Http\Controllers\ZoneController;
use App\Http\Middleware\AdminAccess;
use App\Mail\ApprovedUserEmail;
use App\Models\Barangay;
use App\Models\Crop;
use App\Models\CropType;
use App\Models\Equipment;
use App\Models\Farm;
use App\Models\Fertilizer;
use App\Models\PrecreatedUser;
use App\Models\ResourceRequest;
use App\Models\Seed;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register')
    ]);
})->name('home');

// Route::get('/pdf/generate', function () {
//     return Inertia::render('Pdf');
// });

// Route::post('/pdf/generate', [PdfController::class, 'generate'])->name('pdf.generate');

Route::get('/profiles', function () {
    return Inertia::render('Profiles', [
        'farmers' => User::with('barangay')->where('role', 'Farmer')->has('barangay')->get(),
    ]);
})->middleware(['auth', 'verified'])->name('profiles');

Route::get('/maps', function () {
    return Inertia::render('Maps', [
        'barangays' => Barangay::with([
            'users.crops.cropType',
        ])->withCount([
                    'users as users_count' => function ($query) {
                        $query->where('role', 'farmer');
                    }
                ])->get(),
        'farms' => Farm::with([
            'zones',
            'user',
            'crops',
            'crops.cropType',
            'precreatedUser',
            'user.barangay',
            'precreatedUser.barangay',
            'user.crops' => function ($query) {
                $query->where('approved', 1);
            },
            'user.crops.cropType'
        ])->get()
    ]);

})->middleware(['auth', 'verified'])->name('maps');

Route::resource('zones', ZoneController::class)
    ->only(['store'])
    ->middleware(['auth', 'verified', AdminAccess::class]);

Route::resource('crops', CropController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::resource('crop-types', CropTypeController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::get('/pending-crops', function (): Response {
    return Inertia::render('Crops/PendingCrops', [
        'crops' => Crop::with(['cropType', 'user'])->where('approved', 0)->get(),
    ]);
})->middleware(['auth', 'verified', AdminAccess::class])->name('pending-crops');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'barangays' => Barangay::withCount([
            'users as users_count' => function ($query) {
                $query->where('role', 'farmer');
            }
        ])->get(),
        'statistics' => [
            'total_barangays' => Barangay::count(),
            'total_farmers' => User::where('role', 'Farmer')->get(),
            'total_crops' => Crop::count()
        ],
    ]);
})->middleware(['auth', 'verified', AdminAccess::class])->name('dashboard');

Route::get('/manage-accounts', function () {
    $precreated = PrecreatedUser::with(['barangay'])->get();

    $precreated->each(function ($user) {
        $user->farms = Farm::where('rsba', $user->rsba)->get();
    });

    return Inertia::render('ManageAccounts', [
        'precreated' => $precreated,
        'users' => User::with([
            'barangay',
            'crops' => function ($query) {
                $query->where('approved', 1);
            },
            'crops.cropType'
        ])->where('role', 'Farmer')->has('barangay')->get(),
        'barangays' => Barangay::all()
    ]);
})->middleware(['auth', 'verified', AdminAccess::class])->name('manage-accounts');

Route::get('/manage-requests', function () {
    return Inertia::render('Resources/ManageRequests', [
        'requests' => ResourceRequest::with(['fertilizer', 'equipment', 'seed', 'user'])
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
                    'id' => $request->id,
                    'user_id' => $request->user_id,
                    'farmer' => $request->user->last_name . ', ' . $request->user->first_name . ' ' . $request->user->middle_name,
                    'name' => $requestName,
                    'status' => $request->status,
                    'date_approved' => $request->date_approved
                ];
            })
    ]);
})->middleware(['auth', 'verified', AdminAccess::class])->name('manage-requests');

Route::get('my-requests', function () {
    return Inertia::render('Resources/MyRequests', [
        'requests' => ResourceRequest::with(['fertilizer', 'equipment', 'seed'])
            ->where('user_id', auth()->user()->id)
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
                    'id' => $request->id,
                    'name' => $requestName,
                    'status' => ucfirst($request->status),
                ];
            })
    ]);
})->middleware(['auth', 'verified'])->name('my-requests');

Route::get('/farmer-registrations', function () {
    return Inertia::render('FarmerRegistrations', [
        'users' => User::where(['role' => 'Farmer', 'approved' => '0'])->get()
    ]);
})->middleware(['auth', 'verified', AdminAccess::class])->name('farmer-registrations');

Route::post('/farmer-registrations', function (Request $request) {
    $validated = $request->validate([
        'rsba' => 'required|exists:users,rsba',
    ]);

    $precreatedUser = PrecreatedUser::where('rsba', $validated['rsba'])->first();
    $user = User::where('rsba', $validated['rsba'])->first();
    $user->approved = '1';
    $user->save();

    Mail::to($user->contact_email)->send(new ApprovedUserEmail($precreatedUser));

    $precreatedUser->delete();

    return redirect(route('farmer-registrations'));
})->middleware(['auth', 'verified', AdminAccess::class])->name('farmer-registrations');

Route::resource('precreated-users', PrecreatedUserController::class)
    ->only(['store', 'destroy'])
    ->middleware(['auth', 'verified', AdminAccess::class]);

Route::resource('insurance', InsuranceController::class)
    ->only(['index', 'create', 'store', 'show', 'update'])
    ->middleware(['auth', 'verified']);

Route::resource('resources', ResourceController::class)
    ->only(['index', 'create', 'store', 'show'])
    ->middleware(['auth', 'verified']);

Route::resource('fertilizers', FertilizerController::class)
    ->only(['update', 'destroy'])
    ->middleware(['auth', 'verified', AdminAccess::class]);
Route::resource('equipments', EquipmentController::class)
    ->only(['update', 'destroy'])
    ->middleware(['auth', 'verified', AdminAccess::class]);
Route::resource('seeds', SeedController::class)
    ->only(['update', 'destroy'])
    ->middleware(['auth', 'verified', AdminAccess::class]);
Route::resource('resource-requests', ResourceRequestController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);
Route::resource('farms', FarmController::class)
    ->only(['index', 'store', 'create', 'show', 'destroy'])
    ->middleware(['auth', 'verified', AdminAccess::class]);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('barangays', BarangayController::class)
    ->only(['index', 'store'])
    ->middleware(['auth', 'verified']);

require __DIR__ . '/auth.php';
