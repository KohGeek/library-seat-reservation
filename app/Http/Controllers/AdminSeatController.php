<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Seat;

class AdminSeatController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    // Load all SEATS
    public function index()
    {
        return Seat::all();
    }

    // Store a new SEAT
    public function create(Request $req)
    {
        $req->validate([
            'table_number' => 'required|numeric|min:1|max:100'
        ]);

        return Seat::create($req->all());
    }

    // Edit a SEAT
    public function update(Request $req, $id)
    {
        $req->validate([
            'table_number' => 'required|numeric|min:1|max:100'
        ]);

        $seat = Seat::findOrFail($id);
        $seat->update($req->all());
        return $seat;
    }

    // Delete a SEAT
    public function destroy($id)
    {
        $seat = Seat::findOrFail($id);
        $seat->delete();
        return 204;
    }
}
