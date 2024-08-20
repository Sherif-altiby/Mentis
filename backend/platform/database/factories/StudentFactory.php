<?php

namespace Database\Factories;

use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class StudentFactory extends Factory
{
    protected $model = Student::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(), // Assumes you have a UserFactory
            'grade_level' => 'first', // Random grade level between 1 and 12
        ];
    }
}
