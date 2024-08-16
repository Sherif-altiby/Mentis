<?php

// app/Http/Controllers/QuizController.php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:multiple_choice,true_false,short_answer',
            'is_published' => 'boolean',
            'start_time' => 'nullable|date',
            'end_time' => 'nullable|date',
        ]);

        $quiz = Quiz::create($validatedData);

        return response()->json($quiz, 201);
    }

    public function show($id)
    {
        $quiz = Quiz::findOrFail($id);
        return response()->json($quiz);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:multiple_choice,true_false,short_answer',
            'is_published' => 'boolean',
            'start_time' => 'nullable|date',
            'end_time' => 'nullable|date',
        ]);

        $quiz = Quiz::findOrFail($id);
        $quiz->update($validatedData);

        return response()->json($quiz);
    }

    public function destroy($id)
    {
        $quiz = Quiz::findOrFail($id);
        $quiz->delete();

        return response()->json(null, 204);
    }
}
