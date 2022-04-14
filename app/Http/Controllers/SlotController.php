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
        
        $data = BookingData::
        
        return BookingData::all();
    }

}
