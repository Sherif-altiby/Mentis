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
        $responses = QuizResponse::where('student_id', $studentId)
            ->whereHas('question', function($query) use ($quizId) {
                $query->where('quiz_id', $quizId);
            })
            ->get();

        $totalQuestions = QuizQuestion::where('quiz_id', $quizId)->count();
        $correctAnswersCount = 0;

        foreach ($responses as $response) {
            $question = QuizQuestion::find($response->quiz_question_id);

            if ($question && $response->answer === $question->correct_answer) {
                $correctAnswersCount++;
                $response->is_correct = true;
            } else {
                $response->is_correct = false;
            }
            $response->save();
        }

        $scorePercentage = ($totalQuestions > 0) ? ($correctAnswersCount / $totalQuestions) * 100 : 0;

        return response()->json([
            'student_id' => $studentId,
            'quiz_id' => $quizId,
            'total_questions' => $totalQuestions,
            'correct_answers' => $correctAnswersCount,
            'score_percentage' => $scorePercentage,
            'responses' => $responses
        ]);
    }
}
