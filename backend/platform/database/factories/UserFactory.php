<?php


namespace Database\Factories;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;


class UserFactory extends Factory
{
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail, // Ensure email is unique
            'password' => Hash::make('password123'), // Default password
            'phone_number' => $this->faker->phoneNumber,
            'role' => $this->faker->randomElement(['student', 'teacher', 'parent', 'admin']),
        ];
    }
}

\App\Models\User::factory()->createMany([
    [
        'name' => 'John Doe',
        'email' => 'john.doe@example.com',
        'password' => Hash::make('johnpassword'),
        'phone_number' => '01098765432',
        'role' => 'student',
    ],
    [
        'name' => 'Jane Smith',
        'email' => 'jane.smith@example.com',
        'password' => Hash::make('janesmith123'),
        'phone_number' => '01112345678',
        'role' => 'teacher',
    ],
    [
        'name' => 'Michael Johnson',
        'email' => 'michael.johnson@example.com',
        'password' => Hash::make('michael2024'),
        'phone_number' => '01234567890',
        'role' => 'parent',
    ],
    [
        'name' => 'Emily Davis',
        'email' => 'emily.davis@example.com',
        'password' => Hash::make('emilydavis'),
        'phone_number' => '01198765432',
        'role' => 'student',
    ],
]);
