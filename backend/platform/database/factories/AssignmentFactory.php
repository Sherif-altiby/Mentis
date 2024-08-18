<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;


class AssignmentFactory extends Factory
{
    public function definition()
    {
        return [
            'course_id' => 1,
            'title' => 'Geography Assignment 1',
            'description' => 'Complete the map exercises.',
            'due_date' => '2024-08-25',
        ];
    }
}

\App\Models\Assignment::factory()->createMany([
    ['course_id' => 1, 'title' => 'Math Assignment 1', 'description' => 'Solve the equations.', 'due_date' => '2024-08-26'],
    ['course_id' => 2, 'title' => 'History Assignment 1', 'description' => 'Write an essay on World War II.', 'due_date' => '2024-08-27'],
    ['course_id' => 2, 'title' => 'Science Assignment 1', 'description' => 'Describe the scientific method.', 'due_date' => '2024-08-28'],
    ['course_id' => 3, 'title' => 'Literature Assignment 1', 'description' => 'Analyze a classic novel.', 'due_date' => '2024-08-29'],
    ['course_id' => 3, 'title' => 'Art Assignment 1', 'description' => 'Create a piece of art.', 'due_date' => '2024-08-30'],
]);
