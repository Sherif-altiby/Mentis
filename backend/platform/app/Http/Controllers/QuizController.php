<?php
namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizController extends Controller
{

    public function index()
    {
        $quizzes = Quiz::all();
        return response()->json($quizzes);
    }
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
            'level' => 'required|string|in:first,second,third', // Add validation for grade_level
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
            'level' => 'required|string|in:first,second,third', // Add validation for grade_level
        ]);

        $quiz = Quiz::findOrFail($id);
        $quiz->update($validatedData);

        return response()->json($quiz);
    }
    public function getQuizQuestions($quizId)
{
    $quiz = Quiz::findOrFail($quizId);

    $questions = $quiz->getAllQuestions();

    return response()->json($questions);
}

    public function destroy($id)
    {
        $quiz = Quiz::findOrFail($id);
        $quiz->delete();

        return response()->json(null, 204);
    }
    public function getAllQuizzesWithTeacherId()
    {
        try {
            // Retrieve quizzes with associated teacher ID using the model method
            $quizzes = Quiz::getAllWithTeacherId();

            // Handle the case where no quizzes are found
            if ($quizzes->isEmpty()) {
                return response()->json(['message' => 'No quizzes found.'], 404);
            }

            // Transform the results to include teacher_id in the response
            $quizzes = $quizzes->map(function ($quiz) {
                return [
                    'id' => $quiz->id,
                    'course_id' => $quiz->course_id,
                    'title' => $quiz->title,
                    'description' => $quiz->description,
                    'type' => $quiz->type,
                    'is_published' => $quiz->is_published,
                    'level' => $quiz->level,
                    'start_time' => $quiz->start_time,
                    'end_time' => $quiz->end_time,
                    'created_at' => $quiz->created_at,
                    'updated_at' => $quiz->updated_at,
                    'teacher_id' => $quiz->course->teacher_id,
                ];
            });

            // Return the quizzes in JSON format
            return response()->json($quizzes, 200);

        } catch (\Exception $e) {
            // Log the error for debugging
            Log::error('Error retrieving quizzes with teacher ID: ' . $e->getMessage());

            // Return a generic error message to the client
            return response()->json(['error' => 'An error occurred while retrieving the quizzes. Please try again later.'], 500);
        }
    }

}
