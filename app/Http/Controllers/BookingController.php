<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\BookingData;
use App\Models\Seat;

class BookingController extends Controller
{

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function index(Request $req)
    {
        $dbseats = Seat::where('closed', '=', 0)
            ->select('id', 'table_number')->get();
        $seats = [];
        $bookingdata = $this->bookingData($req);
        $availabletime = ["01:00:00", "02:00:00", "03:00:00", "04:00:00", "05:00:00", "06:00:00", "07:00:00", "08:00:00", "09:00:00", "10:00:00", "11:00:00", "12:00:00"];

        if ($req->time != null) {
            $availabletime = [];
            array_push($availabletime, $req->time);
        }

        foreach ($dbseats as $dbseat) {
            foreach ($availabletime as $time) {
                $seat = [];
                $seat['id'] = $dbseat->id;
                $seat['table_number'] = $dbseat->table_number;
                $seat['date'] = $req->date;
                $seat['time'] = $time;
                $seat = json_encode($seat);
                array_push($seats, $seat);
            }
        }

        if ($bookingdata != null) {
            $tempbookingdata = [];
            foreach ($bookingdata as $booking) {
                $booking['time'] = date('H:i:s', strtotime($booking->date));
                $booking['date'] = $req->date;
                $booking = json_encode($booking);
                array_push($tempbookingdata, $booking);
            }
            $seats = array_diff($seats, $tempbookingdata);
        }

        $returnableseats = [];

        foreach ($seats as $seat) {
            $seat = json_decode($seat);
            array_push($returnableseats, $seat);
        }

        return $returnableseats;
    }

    private function bookingData(Request $req)
    {
        return BookingData::join('seats', 'booking_data.seat', '=', 'seats.id')
            ->whereDate('booking_data.datetime', '=', $req->date)
            ->select('booking_data.seat as id', 'seats.table_number', 'booking_data.datetime as date')
            ->get();
    }

    public function store(Request $req)
    {
        return BookingData::create($req->all());
    }
}
