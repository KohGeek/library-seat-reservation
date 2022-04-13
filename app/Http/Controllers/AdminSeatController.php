<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Seat;

class AdminSeatController extends Controller
{
    // Load all SEATS
    public function index()
    {
        return Seat::all();
    }

    // Store a new SEAT
    public function create(Request $req) 
    {
        return Seat::create($req->all());
    }

    // Edit a SEAT
    public function update(Request $req, $id) 
    {
        $seat = Seat::findOrFail($id);
        $seat -> update($req->all());
        return $seat;
    }

    // Delete a SEAT
    public function destroy($id) 
    {
        $seat = Seat::findOrFail($id);
        $seat -> delete();
        return 204;
    }
}
