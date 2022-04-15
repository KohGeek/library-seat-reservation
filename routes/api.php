<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminSeatController;
use App\Http\Controllers\AdminLogController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\BookingController;

use App\Http\Controllers\Auth\AuthController;


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

Route::group([
    'middleware' => 'api',
], function ($router) {
    // Admin Logs' API
    Route::get('adminlogs', [AdminLogController::class, 'index']);
    Route::get('adminlogs/seats', [AdminLogController::class, 'getSeat']);

    // Admin Seats' API
    Route::get('adminseats', [AdminSeatController::class, 'index']);
    Route::post('adminseat', [AdminSeatController::class, 'create']);
    Route::put('adminseat/{id}', [AdminSeatController::class, 'update']);
    Route::delete('adminseat/{id}', [AdminSeatController::class, 'destroy']);

    // Dashboard API
    Route::get('booking', [DashboardController::class, 'show']);
    Route::delete('booking/{id}', [DashboardController::class, 'destroy']);

    // Booking API
    Route::get('slots', [BookingController::class, 'index']);
    Route::post('addBooking', [BookingController::class, 'store']);
});

Route::group([
    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers\Auth',
    'prefix' => 'auth'
], function ($router) {
    // JWT Auth
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
});
