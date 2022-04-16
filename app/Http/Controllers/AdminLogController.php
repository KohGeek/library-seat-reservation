<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BookingData;
use App\Models\Seat;

class AdminLogController extends Controller
{

    // Get booking datas
    public function index(Request $req)
    {

        // Data Validation Example ONLY
        // $req -> validate ([
        //     'name' => 'required',
        //     'seat' => 'required'
        // ]);

        $query = [];
        $date = $req->date;
        $time = $req->time;

        if ($req->name != null) {
            array_push($query, ['users.name', 'LIKE', '%' . $req->name . '%']);
        }
        if ($req->seat != null) {
            array_push($query, ['booking_data.seat', '=', $req->seat]);
        }

        $data = BookingData::join('users', 'users.id', '=', 'booking_data.booked_by')
            ->where($query)
            ->when($date, function ($query, $date) {
                $query->whereDate("datetime", $date);
            })
            ->when($time, function ($query, $time) {
                $query->whereTime("datetime", $time);
            })
            ->get(['booking_data.id', 'users.name', 'booking_data.purpose', 'booking_data.datetime', 'booking_data.seat', 'booking_data.created_at']);


        foreach ($data as $d) {
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
