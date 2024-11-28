<?php

use App\Http\Controllers\BarangayController;
use App\Http\Controllers\CropController;
use App\Http\Controllers\FarmController;
use App\Http\Controllers\InsuranceController;
use App\Http\Controllers\PrecreatedUserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\ZoneController;
use App\Http\Middleware\AdminAccess;
use App\Models\Barangay;
use App\Models\Crop;
use App\Models\Equipment;
use App\Models\Farm;
use App\Models\Fertilizer;
use App\Models\PrecreatedUser;
use App\Models\Seed;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register')
    ]);
})->name('home');

Route::get('/profiles', function () {
    return Inertia::render('Profiles', [
        'farmers' => User::with('barangay')->where('role', 'Farmer')->has('barangay')->get(),
    ]);
})->middleware(['auth', 'verified'])->name('profiles');

Route::get('/maps', function () {
    $farmId = auth()->user()->farm_id;

    return Inertia::render('Maps', [
        'barangays' => Barangay::withCount([
            'users as users_count' => function ($query) {
                $query->where('role', 'farmer');
            }
        ])->get(),
        'farms' => auth()->user()->role === 'farmer' ? Farm::with(['zones'])->find($farmId) : Farm::with(['zones', 'user', 'precreatedUser', 'user.barangay', 'precreatedUser.barangay'])->get(),
    ]);
})->middleware(['auth', 'verified'])->name('maps');

Route::resource('farms', FarmController::class)
    ->only(['store', 'create', 'show'])
    ->middleware(['auth', 'verified', AdminAccess::class]);

Route::resource('zones', ZoneController::class)
    ->only(['store'])
    ->middleware(['auth', 'verified', AdminAccess::class]);

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
    return Inertia::render('ManageAccounts', [
        'precreated' => PrecreatedUser::with(['barangay', 'farm'])->get(),
        'users' => User::with(['barangay', 'crops'])->where('role', 'Farmer')->has('barangay')->get(),
        'barangays' => Barangay::all()
    ]);
})->middleware(['auth', 'verified', AdminAccess::class])->name('manage-accounts');

Route::get('/farmer-registrations', function () {
    return Inertia::render('FarmerRegistrations', [
        'users' => User::where(['role' => 'Farmer', 'approved' => '0'])->get()
    ]);
})->middleware(['auth', 'verified', AdminAccess::class])->name('farmer-registrations');

Route::post('/farmer-registrations', function (Request $request) {
    $validated = $request->validate([
        'id' => 'required|exists:users,id',
    ]);

    $user = User::find($validated['id']);
    $user->approved = '1';
    $user->save();

    return redirect(route('farmer-registrations'));
})->middleware(['auth', 'verified', AdminAccess::class])->name('farmer-registrations');

Route::resource('precreated-users', PrecreatedUserController::class)
    ->only(['store', 'destroy'])
    ->middleware(['auth', 'verified', AdminAccess::class]);

Route::resource('insurance', InsuranceController::class)
    ->only(['index', 'create', 'store', 'show'])
    ->middleware(['auth', 'verified']);

Route::resource('resources', ResourceController::class)
    ->only(['index', 'create', 'store', 'show'])
    ->middleware(['auth', 'verified']);

// Route::get('/resources', function () {
//     return Inertia::render('Resources', [
//         'fertilizers' => Fertilizer::all(),
//         'equipments' => Equipment::all(),
//         'seeds' => Seed::all(),
//     ]);
// })->middleware(['auth', 'verified'])->name('resources');

Route::get('/requests', function () {
    return Inertia::render('Requests', [
        'fertilizers' => Fertilizer::all(),
        'equipments' => Equipment::all(),
        'seeds' => Seed::all(),
    ]);
})->middleware(['auth', 'verified'])->name('requests');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('barangays', BarangayController::class)
    ->only(['index', 'store'])
    ->middleware(['auth', 'verified']);

require __DIR__ . '/auth.php';
