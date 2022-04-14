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
        'datetime',
        'seat',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'booked_by' => 'integer',
        'datetime' => 'timestamp',
        'seat' => 'integer',
    ];

    /**
     * Get the user for the booking data.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the seat for the booking data.
     */
    public function seat()
    {
        return $this->belongsTo(Seat::class);
    }
}
