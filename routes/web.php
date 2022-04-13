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

Auth::routes();

// //Self-defined routes
// //Normal Register
// Route::view('/register','register')->name('register');
Route::post('/register', [RegisterController::class, 'register']);

// //Normal Login
// Route::view('/login','auth.login')->name('login');
Route::post('/login', [LoginController::class, 'login']);

//Librarian Register
Route::view('/librarianRegister','auth.librarianRegister');
Route::post('/librarianRegister', [RegisterController::class, 'register']);

//Viewslot
Route::view('/viewslot','viewslot');
Route::post('/viewslot',[SlotController::class,'showSlots']);

//Dashboard
Route::view('/dashboard','dashboard');



// AdminSeats
Route::get('/adminseat', function() {
    return view('adminseat');
});

// AdminLogs
Route::get('/adminlog', function() {
    return view('adminlog');
});

