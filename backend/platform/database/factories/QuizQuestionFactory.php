<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;

class QuizQuestionFactory extends Factory
{
    public function definition()
    {
        return [
            'quiz_id' => 1,
            'question' => 'What is the capital of France?',
            'options' => json_encode(['Paris', 'London', 'Berlin', 'Madrid']),
            'correct_answer' => 'Paris',
        ];
    }
}

\App\Models\QuizQuestion::factory()->createMany([
    ['quiz_id' => 1, 'question' => 'What is 2 + 2?', 'options' => json_encode(['3', '4', '5', '6']), 'correct_answer' => '4'],
    ['quiz_id' => 1, 'question' => 'What is the largest ocean?', 'options' => json_encode(['Atlantic', 'Indian', 'Pacific', 'Arctic']), 'correct_answer' => 'Pacific'],
    ['quiz_id' => 2, 'question' => 'Who wrote "Hamlet"?', 'options' => json_encode(['Shakespeare', 'Hemingway', 'Orwell', 'Tolkien']), 'correct_answer' => 'Shakespeare'],
    ['quiz_id' => 2, 'question' => 'What is the speed of light?', 'options' => json_encode(['299,792,458 m/s', '150,000,000 m/s', '100,000,000 m/s', '500,000,000 m/s']), 'correct_answer' => '299,792,458 m/s'],
]);
