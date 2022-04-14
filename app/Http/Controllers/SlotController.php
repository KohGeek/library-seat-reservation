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
}
