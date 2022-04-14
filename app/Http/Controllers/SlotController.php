<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BookingData;
use App\Models\Seat;

class SlotController extends Controller
{
    public function showSlots(Request $req){
        
        $slot = $req;
        
        return $slot;
    }

    public function seatsIndex(){
        return Seat::all();
    }

    public function bookingDataIndex(Request $req){
        $date = $req->date;
        $time = $req->time;
        $data = BookingData::whereDate("datetime", $date) 
            ->when($time, function($query, $time){
                $query->whereTime("datetime", $time);
            })
            ->get(['booking_data.datetime', 'booking_data.seat']);

        
        return $data;
    }

}
