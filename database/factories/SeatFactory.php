<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Seat>
 */
class SeatFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'table_number' => $this->faker->numberBetween(1, 10),
            'closed' => false,
        ];
    }

    /**
     * Indicate that the model's availability should be closed.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function closed()
    {
        return $this->state(function (array $attributes) {
            return [
                'closed' => true,
                'closed_reason' => $this->faker->sentence,
            ];
        });
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
