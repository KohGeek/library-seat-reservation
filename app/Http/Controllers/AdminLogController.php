<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BookingData;
use App\Models\Seat;

class AdminLogController extends Controller
{
    // Load all Booking Datas
    public function index()
    {
        $data = BookingData::join('users', 'users.id', '=', 'booking_data.booked_by')
                            ->get(['booking_data.id', 'users.name', 'booking_data.purpose', 'booking_data.datetime', 'booking_data.seat', 'booking_data.created_at']);
        
        foreach($data as $d)
        {
            $d->datetime = ((string)$d->datetime . "000");
        }

        return $data;
        
        
    }

    // Search Booking Datas
    public function search(Request $req)
    {
        

        if ($req->name != null) {
            if ($req->seat != null) {
                $data = BookingData::join('users', 'users.id', '=', 'booking_data.booked_by')
                            ->where('users.name','LIKE', '%'.$req->name.'%' )
                            ->where('booking_data.seat', $req->seat)
                            ->get(['booking_data.id', 'users.name', 'booking_data.purpose', 'booking_data.datetime', 'booking_data.seat', 'booking_data.created_at']);
                }
            else
            {
                $data = BookingData::join('users', 'users.id', '=', 'booking_data.booked_by')
                            ->where('users.name','LIKE', '%'.$req->name.'%' )
                            ->get(['booking_data.id', 'users.name', 'booking_data.purpose', 'booking_data.datetime', 'booking_data.seat', 'booking_data.created_at']);
            }

        }
        else
        {
            if ($req->seat != null) {
                $data = BookingData::join('users', 'users.id', '=', 'booking_data.booked_by')
                            ->where('booking_data.seat', $req->seat)
                            ->get(['booking_data.id', 'users.name', 'booking_data.purpose', 'booking_data.datetime', 'booking_data.seat', 'booking_data.created_at']);
            }
            else
            {
                $data = BookingData::join('users', 'users.id', '=', 'booking_data.booked_by')
                            ->get(['booking_data.id', 'users.name', 'booking_data.purpose', 'booking_data.datetime', 'booking_data.seat', 'booking_data.created_at']);
            }
        }

        foreach($data as $d)
        {
            $d->datetime = ((string)$d->datetime . "000");
        }
        
        return $data;
    }

    // Get Seat Data
    public function getSeat()
    {
        return Seat::all();
    }
}
 