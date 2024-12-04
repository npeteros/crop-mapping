<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\PrecreatedUser;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Log;
use Str;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'rsba' => 'required|string|max:255|unique:' . User::class,
            'birthdate' => 'required|date|before:today',
        ]);

        $precreatedUser = PrecreatedUser::where('rsba', $validated['rsba'])
            ->first();

        if (!$precreatedUser) {
            throw ValidationException::withMessages([
                'rsba' => 'RSBSA Number does not exist',
            ]);
        }

        $user = User::create($precreatedUser->only([
            'rsba',
            'last_name',
            'first_name',
            'middle_name',
            'email',
            'password',
            'barangay_id',
            'farm_id',
            'address'
        ]));
        $user->birthdate = $validated['birthdate'];
        $user->save();

        $precreatedUser->delete();

        event(new Registered($user));

        // Auth::login($user);

        return redirect(route('login', absolute: false));
    }
}
