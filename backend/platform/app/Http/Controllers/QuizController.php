<?php
namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;
use Carbon\Carbon;

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
   


    public function isQuizActive($quizId)
    {
        $quiz = Quiz::findOrFail($quizId);

        // Check if both start_time and end_time exist
        if (!$quiz->start_time || !$quiz->end_time) {
            return response()->json(['message' => 'The quiz does not have a defined start or end time.'], 400);
        }

        // Retrieve current time
        $currentTime = Carbon::now();

        $startTime = Carbon::parse($quiz->start_time);
        $endTime = Carbon::parse($quiz->end_time);

        // Check if the current time is within the start and end time
        if ($currentTime->greaterThanOrEqualTo($startTime) && $currentTime->lessThanOrEqualTo($endTime)) {
            return response()->json([
                'is_active' => true,
                'message' => 'The quiz is currently active and accepting answers.',
                'start_time' => $quiz->start_time,
                'end_time' => $quiz->end_time,
            ]);
        } elseif ($currentTime->lessThan($startTime)) {
            return response()->json([
                'is_active' => false,
                'message' => 'The quiz has not started yet.',
                'start_time' => $quiz->start_time,
                'end_time' => $quiz->end_time,
            ]);
        } elseif ($currentTime->greaterThan($endTime)) {
            return response()->json([
                'is_active' => false,
                'message' => 'The quiz has already ended.',
                'start_time' => $quiz->start_time,
                'end_time' => $quiz->end_time,
            ]);
        }
    }
    /**
     * Get the remaining time for the quiz
     *
     * @param int $quizId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getQuizTimer($quizId)
    {
        // Try to fetch the quiz, if not found, handle the error
        try {
            $quiz = Quiz::findOrFail($quizId);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Quiz not found.'], 404);
        }

        // Retrieve current time
        $currentTime = Carbon::now();

        // Check if both start_time and end_time exist
        if (!$quiz->start_time || !$quiz->end_time) {
            return response()->json([
                'message' => 'The quiz does not have a defined start or end time.',
                'details' => [
                    'start_time' => $quiz->start_time,
                    'end_time' => $quiz->end_time,
                ]
            ], 400);
        }

        // Calculate remaining time
        $endTime = Carbon::parse($quiz->end_time);

        // If the current time is greater than the end time, return an error message
        if ($currentTime->greaterThan($endTime)) {
            return response()->json([
                'message' => 'The quiz has already ended.',
                'end_time' => $quiz->end_time,
                'current_time' => $currentTime
            ], 403);
        }

        // Calculate the remaining time in seconds
        $remainingTimeInSeconds = $endTime->diffInSeconds($currentTime);

        // Format the remaining time as minutes and seconds
        $remainingMinutes = floor($remainingTimeInSeconds / 60);
        $remainingSeconds = $remainingTimeInSeconds % 60;

        return response()->json([
            'message' => 'The quiz is still active.',
            'start_time' => $quiz->start_time,
            'end_time' => $quiz->end_time,
            'remaining_time' => [
                'minutes' => $remainingMinutes,
                'seconds' => $remainingSeconds,
            ]
        ]);
    }

}
