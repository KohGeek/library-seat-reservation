<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminSeatController;
use App\Http\Controllers\AdminLogController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;



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

// Admin Seats' API
Route::get('adminseats', [AdminSeatController::class, 'index']);
Route::post('adminseat', [AdminSeatController::class, 'create']);
Route::put('adminseat/{id}', [AdminSeatController::class, 'update']);
Route::delete('adminseat/{id}', [AdminSeatController::class, 'destroy']);


// Login API
// Route::get('users/email/{email}/password/{password}',[LoginController::class,'login']);
Route::post('users', [LoginController::class, 'login']);

// Register API
Route::post('user', [RegisterController::class, 'register']);
