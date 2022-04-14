<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BookingData;
use App\Models\Seat;
use App\Models\TimeSlot;

class DashboardController extends Controller
{
    // Load all Booking Datas
    public function index()
    {
        $data = BookingData::join('time_slots', 'time_slots.id', '=', 'booking_data.timeslot')
                            ->join('users', 'users.id', '=', 'booking_data.booked_by')
                            ->get(['booking_data.id', 'users.name', 'booking_data.purpose', 'time_slots.date_time', 'booking_data.seat', 'booking_data.created_at']);
        
        return $data;
        // return BookingData::all();
    }
  
     // Get Seat Data
     public function getSeat()
     {
         return Seat::all();
     }

     // Get Timeslot Data
    
}
