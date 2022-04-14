<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\SlotController;



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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

//Librarian Register
Route::view('/librarianRegister', 'auth.librarianRegister');
Route::post('/librarianRegister', [RegisterController::class, 'register']);

//Viewslot
Route::view('/viewslots', 'viewslot');

//Dashboard
Route::view('/dashboard', 'dashboard');

// AdminSeats
Route::view('adminseat', 'adminseat');

// AdminLogs
Route::view('adminlog', 'adminlog');
