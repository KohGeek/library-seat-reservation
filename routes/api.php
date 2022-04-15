<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminSeatController;
use App\Http\Controllers\AdminLogController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\BookingController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Admin Logs' API
Route::get('adminlogs', [AdminLogController::class, 'index']);
Route::get('adminlogs/seats', [AdminLogController::class, 'getSeat']);

// Admin Seats' API
Route::get('adminseats', [AdminSeatController::class, 'index']);
Route::post('adminseat', [AdminSeatController::class, 'create']);
Route::put('adminseat/{id}', [AdminSeatController::class, 'update']);
Route::delete('adminseat/{id}', [AdminSeatController::class, 'destroy']);

// Dashboard API
Route::get('booking', [DashboardController::class, 'index']);
//Route::get('booking_listseat', [AdminLogController::class, 'getSeat']);
Route::delete('booking_seat/{id}', [DashboardController::class, 'destroy']);

// Booking API
Route::get('slots', [BookingController::class, 'index']);
Route::post('addBooking', [BookingController::class, 'store']);
