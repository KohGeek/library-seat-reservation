<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HomeController;


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

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/home', [HomeController::class, 'index']);
Route::get('/dashboard', [HomeController::class, 'index']);

Auth::routes();

// Student only
Route::view('/booking', 'booking')->middleware('can:isStudent')->name('booking');

// Librarian Only
Route::view('/adminseat', 'adminseat')->middleware('can:isLibrarian')->name('adminseat');
Route::view('/adminlog', 'adminlog')->middleware('can:isLibrarian')->name('adminlog');
