<?php

use App\Http\Controllers\BarangayController;
use App\Http\Controllers\ProfileController;
use App\Models\Barangay;
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
        'farmers' => User::with('barangay')->with('crops')->where('role', 'Farmer')->has('barangay')->get(),
    ]);
})->middleware(['auth', 'verified'])->name('profiles');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'barangays' => Barangay::withCount('users')->get(),
        'statistics' => [
            'total_barangays' => Barangay::count(),
            'total_farmers' => User::where('role', 'Farmer')->get(),
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

require __DIR__.'/auth.php';
