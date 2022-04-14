<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BookingData;
use App\Models\Seat;

class BookingController extends Controller
{
    public function index(Request $req)
    {
        $dbseats = Seat::where('closed', '=', 0)
            ->select('id', 'table_number')->get();

        $availabletime = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
        $seats = [];

        foreach ($dbseats as $dbseat) {
            foreach ($availabletime as $time) {
                $seat = new Seat();
                $seat->id = $dbseat->id;
                $seat->table_number = $dbseat->table_number;
                $seat->time = $time;
                array_push($seats, $seat);
            }
        }

        return $seats;
    }
}
