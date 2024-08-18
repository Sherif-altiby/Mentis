<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;

class CourseFactory extends Factory
{
    public function definition()
    {
        return [
            'teacher_id' => 3, // Jane Smith
            'title' => 'Introduction to Geography',
            'description' => 'A beginner course in Geography.',
            'price' => 49.99,
        ];
    }
}

\App\Models\Course::factory()->createMany([
    ['teacher_id' => 3, 'title' => 'Advanced Mathematics', 'description' => 'An advanced course in Mathematics.', 'price' => 59.99],
    ['teacher_id' => 3, 'title' => 'World History', 'description' => 'A comprehensive course on World History.', 'price' => 69.99],
    ['teacher_id' => 3, 'title' => 'Basic Science', 'description' => 'An introduction to basic Science concepts.', 'price' => 39.99],
    ['teacher_id' => 3, 'title' => 'Classic Literature', 'description' => 'Exploring the classics in Literature.', 'price' => 79.99],
    ['teacher_id' => 3, 'title' => 'Art Appreciation', 'description' => 'Understanding the world of Art.', 'price' => 89.99],
]);
