<?php

use App\Http\Controllers\BarangayController;
use App\Http\Controllers\CropController;
use App\Http\Controllers\FarmController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ZoneController;
use App\Models\Barangay;
use App\Models\Crop;
use App\Models\Farm;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/profiles', function () {
    return Inertia::render('Profiles', [
        'farmers' => User::with('barangay')->where('role', 'Farmer')->has('barangay')->get(),
    ]);
})->middleware(['auth', 'verified'])->name('profiles');

Route::get('/maps', function () {
    return Inertia::render('Maps', [
        'barangays' => Barangay::withCount('users')->get(),
        'farms' => Farm::with(['zones', 'user'])->get(),
    ]);
})->middleware(['auth', 'verified'])->name('maps');

Route::resource('farms', FarmController::class)
    ->only(['index', 'store'])
    ->middleware(['auth', 'verified']);

Route::resource('zones', ZoneController::class)
    ->only(['store'])
    ->middleware(['auth', 'verified']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'barangays' => Barangay::withCount('users')->get(),
        'statistics' => [
            'total_barangays' => Barangay::count(),
            'total_farmers' => User::where('role', 'Farmer')->get(),
            'total_crops' => Crop::count()
        ],
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('barangays', BarangayController::class)
    ->only(['index', 'store'])
    ->middleware(['auth', 'verified']);

require __DIR__ . '/auth.php';
