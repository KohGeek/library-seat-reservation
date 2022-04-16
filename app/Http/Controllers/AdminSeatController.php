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
        $req->validate([
            'table_number' => 'required|numeric|min:1|max:100',
            'closed' => 'required|boolean',
            'closed_reason' => ['required_if:closed,1', 'nullable', 'string']
        ]);

        return Seat::create($req->all());
    }

    // Edit a SEAT
    public function update(Request $req, $id)
    {
        $req->validate([
            'table_number' => 'required|numeric|min:1|max:100',
            'closed' => 'required|boolean',
            'closed_reason' => ['required_if:closed,1', 'nullable', 'string']
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
