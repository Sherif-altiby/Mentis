<?php
// app/Http/Controllers/QuizResponseController.php

namespace App\Http\Controllers;

use App\Models\QuizResponse;
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
}

