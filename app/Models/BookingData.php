<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class BookingData extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'booked_by',
        'purpose',
        'timeslot',
        'seat',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'booked_by' => 'integer',
        'timeslot' => 'integer',
        'seat' => 'integer',
    ];
}
