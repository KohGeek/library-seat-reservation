<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminSeatController;
use App\Http\Controllers\LoginController;


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


// Admin Seats' API
Route::get('adminseats',[AdminSeatController::class, 'index']);
Route::post('adminseat',[AdminSeatController::class, 'create']);
Route::put('adminseat/{id}',[AdminSeatController::class, 'update']);
Route::delete('adminseat/{id}',[AdminSeatController::class, 'destroy']);


// Login API
// Route::get('users/email/{email}/password/{password}',[LoginController::class,'login']);
Route::get('users',[LoginController::class,'login']);