<?php
// app/Http/Controllers/QuizResponseController.php

namespace App\Http\Controllers;

use App\Models\QuizResponse;
use App\Models\QuizQuestion;
use Illuminate\Http\Request;

class QuizResponseController extends Controller
{
    public function index()
    {
        $responses = QuizResponse::all();
        return response()->json($responses);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'quiz_question_id' => 'required|exists:quiz_questions,id',
            'student_id' => 'required|exists:users,id',
            'answer' => 'required|string',
            'is_correct' => 'boolean',
        ]);

        $response = QuizResponse::create($validatedData);
        return response()->json($response, 201);
    }

    public function show($id)
    {
        $response = QuizResponse::findOrFail($id);
        return response()->json($response);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'quiz_question_id' => 'required|exists:quiz_questions,id',
            'student_id' => 'required|exists:users,id',
            'answer' => 'required|string',
            'is_correct' => 'boolean',
        ]);

        $response = QuizResponse::findOrFail($id);
        $response->update($validatedData);
        return response()->json($response);
    }

    public function destroy($id)
    {
        $response = QuizResponse::findOrFail($id);
        $response->delete();
        return response()->json(null, 204);
    }

    public function getStudentResult($studentId, $quizId)
{
    // Get all quiz responses of the student for the specific quiz
    $responses = QuizResponse::where('student_id', $studentId)
        ->whereHas('question', function($query) use ($quizId) {
            $query->where('quiz_id', $quizId);
        })
        ->get();

    // Get the total number of questions in the quiz
    $totalQuestions = QuizQuestion::where('quiz_id', $quizId)->count();
    $correctAnswersCount = 0;
    $allResponses = [];

    foreach ($responses as $response) {
        // Find the related question for each response
        $question = QuizQuestion::find($response->quiz_question_id);

        // Check if the response matches the correct answer
        if ($question && $response->answer === $question->correct_answer) {
            $correctAnswersCount++;
            $response->is_correct = true;
        } else {
            $response->is_correct = false;
        }

        // Save the response correctness
        $response->save();

        // Add the correct answer to the response array
        $responseData = $response->toArray();
        $responseData['correct_answer'] = $question ? $question->correct_answer : null;

        $allResponses[] = $responseData;
    }

    // Calculate the score percentage
    $scorePercentage = ($totalQuestions > 0) ? ($correctAnswersCount / $totalQuestions) * 100 : 0;

    // Return the result
    return response()->json([
        'student_id' => $studentId,
        'quiz_id' => $quizId,
        'total_questions' => $totalQuestions,
        'correct_answers' => $correctAnswersCount,
        'score_percentage' => $scorePercentage,
        'responses' => $allResponses // Include responses with correct answers
    ]);
}

    

}
