<?php
// app/Http/Controllers/QuizQuestionController.php

namespace App\Http\Controllers;

use App\Models\QuizQuestion;
use Illuminate\Http\Request;

class QuizQuestionController extends Controller
{
    public function index()
    {
        $questions = QuizQuestion::all();
        return response()->json($questions);
    }

    public function store(Request $request)
{
    $validatedData = $request->validate([
        'quiz_id' => 'required|exists:quizzes,id',
        'question' => 'required|string',
        'options' => 'required|array',
        'correct_answer' => 'required|string',
    ]);

    // Convert options array to JSON string
    $validatedData['options'] = json_encode($validatedData['options']);

    $question = QuizQuestion::create($validatedData);
    return response()->json($question, 201);
}


    public function show($id)
    {
        $question = QuizQuestion::findOrFail($id);
        return response()->json($question);
    }

    public function update(Request $request, $id)
{
    $validatedData = $request->validate([
        'quiz_id' => 'required|exists:quizzes,id',
        'question' => 'required|string',
        'options' => 'required|array', // Use array validation here
        'correct_answer' => 'required|string',
    ]);

    // Convert options array to JSON string
    $validatedData['options'] = json_encode($validatedData['options']);

    $question = QuizQuestion::findOrFail($id);
    $question->update($validatedData);
    return response()->json($question);
}


    public function destroy($id)
    {
        $question = QuizQuestion::findOrFail($id);
        $question->delete();
        return response()->json(null, 204);
    }
}
