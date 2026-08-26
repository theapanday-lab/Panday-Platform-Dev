<?php

namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'program' => $this->faker->randomElement(['BSIT', 'BSCS', 'BSIS']),
            'gender' => $this->faker->randomElement(['Male', 'Female']), 
            
            'birthdate' => fake()
            ->dateTimeBetween('-30 years', '-18 years')
            ->format('Y-m-d'),

            'year_level' => fake()->numberBetween(1, 4),
        ];
    }
}  
