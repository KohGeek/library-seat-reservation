<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Seat;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BookingData>
 */
class BookingDataFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $date = $this->faker->dateTimeBetween('-1 month', '+1 month');
        $datetime = date('U', strtotime($date->format('Y-m-d') . ' ' . str(rand(10, 20)) . '00H'));

        return [
            'booked_by' => User::inRandomOrder()->first()->id,
            'purpose' => $this->faker->sentence,
            'datetime' => $datetime,
            'seat' => Seat::inRandomOrder()->first()->id,
        ];
    }

    /**
     * Indicate soft-deleted model
     * 
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */

    public function deleted()
    {
        return $this->state(function (array $attributes) {
            return [
                'deleted_at' => now(),
            ];
        });
    }
}
