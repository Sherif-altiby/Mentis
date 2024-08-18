<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;

class QuizResponseFactory extends Factory
{
    public function definition()
    {
        return [
            'quiz_question_id' => 1,
            'student_id' => 2, // John Doe
            'answer' => 'Option A',
            'is_correct' => true,
        ];
    }
}

\App\Models\QuizResponse::factory()->createMany([
    ['quiz_question_id' => 1, 'student_id' => 2, 'answer' => 'Option B', 'is_correct' => false],
    ['quiz_question_id' => 2, 'student_id' => 2, 'answer' => 'Option C', 'is_correct' => true],
    ['quiz_question_id' => 3, 'student_id' => 5, 'answer' => 'Option D', 'is_correct' => false],
    ['quiz_question_id' => 4, 'student_id' => 5, 'answer' => 'Option A', 'is_correct' => true],
]);

