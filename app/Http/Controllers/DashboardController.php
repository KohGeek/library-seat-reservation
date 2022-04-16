<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BookingData;
use App\Models\Seat;
use App\Models\TimeSlot;

class DashboardController extends Controller
{
    // Load all data from user's booking
    public function show()
    {
        $data = BookingData::join('users', 'users.id', '=', 'booking_data.booked_by')
            ->where('booking_data.booked_by', auth()->user()->id)
            ->get(['booking_data.id as id', 'users.name', 'booking_data.purpose', 'booking_data.datetime', 'booking_data.seat', 'booking_data.created_at']);

        foreach ($data as $d) {
            $d->datetime = ((string)$d->datetime . "000");
        }

        return $data;
    }

    // delete
    public function destroy($id)
    {
        $data = BookingData::findOrFail($id);
        $this->authorize('delete', $data);
        $data->delete();
        return 204;
    }

    // Get Seat Data
    public function getSeat()
    {
        return Seat::all();
    }
}
