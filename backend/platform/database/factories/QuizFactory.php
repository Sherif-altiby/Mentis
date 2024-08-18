<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;


class QuizFactory extends Factory
{
    public function definition()
    {
        return [
            'course_id' => 1,
            'title' => 'Geography Quiz',
            'description' => 'A quiz on basic geography questions.',
            'type' => 'multiple_choice',
            'is_published' => true,
            'start_time' => '2024-08-18 10:00:00',
            'end_time' => '2024-08-18 11:00:00',
        ];
    }
}

\App\Models\Quiz::factory()->createMany([
    ['course_id' => 1, 'title' => 'Math Quiz', 'description' => 'A quiz on basic math questions.', 'type' => 'multiple_choice', 'is_published' => true, 'start_time' => '2024-08-19 10:00:00', 'end_time' => '2024-08-19 11:00:00'],
    ['course_id' => 2, 'title' => 'History Quiz', 'description' => 'A quiz on world history.', 'type' => 'multiple_choice', 'is_published' => false, 'start_time' => '2024-08-20 10:00:00', 'end_time' => '2024-08-20 11:00:00'],
    ['course_id' => 2, 'title' => 'Science Quiz', 'description' => 'A quiz on basic science.', 'type' => 'short_answer', 'is_published' => true, 'start_time' => '2024-08-21 10:00:00', 'end_time' => '2024-08-21 11:00:00'],
    ['course_id' => 3, 'title' => 'Literature Quiz', 'description' => 'A quiz on classic literature.', 'type' => 'multiple_choice', 'is_published' => true, 'start_time' => '2024-08-22 10:00:00', 'end_time' => '2024-08-22 11:00:00'],
]);
