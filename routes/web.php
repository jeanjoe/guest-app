<?php

use App\Http\Controllers\GuestController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware('guest')->group(function () {
    Route::get('/', [GuestController::class, 'welcome'])->name('welcome');
    Route::get('/ticket/new', [GuestController::class, 'newTicket'])->name('tickets.new');
    Route::get('/tickets/search', [GuestController::class, 'ticketSearch'])->name('tickets.search');
    Route::post('/tickets/generate', [GuestController::class, 'generateTicket'])->name('tickets.generate');
});

Route::group(['prefix' => 'admin'], function () {
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');
        Route::resource('tickets', TicketController::class);
        Route::resource('users', UserController::class);
        Route::resource('services', ServiceController::class);
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});


require __DIR__ . '/auth.php';
