<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'table_number',
        'closed',
        'closed_reason'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'table_number' => 'integer',
        'closed' => 'boolean',
    ];
}
