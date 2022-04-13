<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BookingData;
use App\Models\TimeSlot;

class AdminLogController extends Controller
{
    // Load all Booking Datas
    public function index()
    {
        $data = BookingData::join('timeslots', 'timeslots.id', '=', 'bookingdatas.timeslot')
                            ->join('users', 'users.id', '=', 'bookingdatas.booked_by')
                            ->get(['bookingdatas.id', 'users.name', 'bookingdatas.purpose', 'timeslots.date_time', 'bookingdatas.seat', 'bookingdatas.created_at']);
        
        return $data;
        // return BookingData::all();
    }
}
 