<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BookingData;
use App\Models\Seat;
use App\Models\TimeSlot;

class AdminLogController extends Controller
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

    // Search Booking Datas
    public function search(Request $req)
    {
        

        if ($req->name != null) {
            if ($req->seat != null) {
                $data = BookingData::join('time_slots', 'time_slots.id', '=', 'booking_data.timeslot')
                            ->join('users', 'users.id', '=', 'booking_data.booked_by')
                            ->where('users.name','LIKE', '%'.$req->name.'%' )
                            ->where('booking_data.seat', $req->seat)
                            ->get(['booking_data.id', 'users.name', 'booking_data.purpose', 'time_slots.date_time', 'booking_data.seat', 'booking_data.created_at']);
            }
            else
            {
                $data = BookingData::join('time_slots', 'time_slots.id', '=', 'booking_data.timeslot')
                            ->join('users', 'users.id', '=', 'booking_data.booked_by')
                            ->where('users.name','LIKE', '%'.$req->name.'%' )
                            ->get(['booking_data.id', 'users.name', 'booking_data.purpose', 'time_slots.date_time', 'booking_data.seat', 'booking_data.created_at']);
            }

        }
        else
        {
            if ($req->seat != null) {
                $data = BookingData::join('time_slots', 'time_slots.id', '=', 'booking_data.timeslot')
                            ->join('users', 'users.id', '=', 'booking_data.booked_by')
                            ->where('booking_data.seat', $req->seat)
                            ->get(['booking_data.id', 'users.name', 'booking_data.purpose', 'time_slots.date_time', 'booking_data.seat', 'booking_data.created_at']);
            }
            else
            {
                $data = BookingData::join('time_slots', 'time_slots.id', '=', 'booking_data.timeslot')
                            ->join('users', 'users.id', '=', 'booking_data.booked_by')
                            ->get(['booking_data.id', 'users.name', 'booking_data.purpose', 'time_slots.date_time', 'booking_data.seat', 'booking_data.created_at']);
            }
        }

        return $data;
    }

    // Get Seat Data
    public function getSeat()
    {
        return Seat::all();
    }

    // Get Timeslot Data
    public function getTimeslot()
    {
        $data = Timeslot::all();

        foreach($data as $d)
        {
            $d->date_time = ((string)$d->date_time . "000");
        }
        
        return $data;
    }
}
 