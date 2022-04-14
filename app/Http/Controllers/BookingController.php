<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\BookingData;
use App\Models\Seat;

class BookingController extends Controller
{
    public function index(Request $req)
    {
        $dbseats = Seat::where('closed', '=', 0)
            ->select('id', 'table_number')->get();
        $seats = [];
        $availabletime = ["01:00:00", "02:00:00", "03:00:00", "04:00:00", "05:00:00", "06:00:00", "07:00:00", "08:00:00", "09:00:00", "10:00:00", "11:00:00", "12:00:00"];

        $bookingdata = $this->bookingdata($req);

        if ($req->time != null) {
            $availabletime = [];
            array_push($availabletime, $req->time);
        }

        foreach ($dbseats as $dbseat) {
            foreach ($availabletime as $time) {
                $seat = new Seat();
                $seat->id = $dbseat->id;
                $seat->date = $req->date;
                $seat->table_number = $dbseat->table_number;
                $seat->time = $time;
                array_push($seats, $seat);
            }
        }

        if ($bookingdata != null) {
            foreach ($bookingdata as $keys => $booking) {
                $booking['time'] = date('H:i:s', strtotime($booking->time));
                $bookingdata[$keys] = $booking;
                Log::error($booking);
            }
        }

        return $seats;
    }

    private function bookingData(Request $req)
    {
        return BookingData::whereDate('datetime', '=', $req->date)
            ->where('seat', '=', $req->seat_id)
            ->select('seat', 'datetime as time')
            ->get();
    }
}
