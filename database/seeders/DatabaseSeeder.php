<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Seat;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->count(10)->create();
        User::factory()->count(2)->librarian()->create();
        Seat::factory()->count(12)->create();
        Seat::factory()->count(2)->closed()->create();
        Seat::factory()->count(1)->deleted()->create();
        $this->call(BookingDataSeeder::class);
    }
}
