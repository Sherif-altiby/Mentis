<?php
// app/Http/Controllers/QuizResponseController.php

namespace App\Http\Controllers;



use App\Models\QuizResponse;
use App\Models\QuizQuestion;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Carbon\Carbon;

class QuizResponseController extends Controller
{
    public function index()
    {
        $responses = QuizResponse::all();
        return response()->json($responses);
    }

   /**
     * Store a new quiz response and check the quiz's time window.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validate the basic fields
        $validatedData = $request->validate([
            'quiz_question_id' => 'required|exists:quiz_questions,id',
            'student_id' => 'required|exists:users,id',
            'answer' => 'required|string|max:255',
            'is_correct' => 'boolean',
        ], [
            'quiz_question_id.required' => 'The quiz question ID is required.',
            'quiz_question_id.exists' => 'The selected quiz question does not exist.',
            'student_id.required' => 'The student ID is required.',
            'student_id.exists' => 'The selected student does not exist.',
            'answer.required' => 'An answer is required.',
            'answer.string' => 'The answer must be a string.',
            'answer.max' => 'The answer must not exceed 255 characters.',
            'is_correct.boolean' => 'The is_correct field must be true or false.',
        ]);

        // Fetch the quiz associated with the question
        $quizQuestion = QuizQuestion::findOrFail($validatedData['quiz_question_id']);
        $quiz = $quizQuestion->quiz;

        // Check if the quiz is active based on time
        $quizStatus = $this->isQuizActive($quiz);

        if (!$quizStatus['is_active']) {
            return response()->json(['message' => $quizStatus['message']], 403);
        }

        // Check for duplicate quiz question for the same student
        if (QuizResponse::isDuplicate($validatedData['quiz_question_id'], $validatedData['student_id'])) {
            return response()->json([
                'message' => 'The quiz question has already been answered by this student.'
            ], 422);
        }

        // Create the quiz response
        try {
            $response = QuizResponse::create($validatedData);
            return response()->json($response, 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'There was an error saving the quiz response.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Check if the quiz is currently active based on the current time.
     *
     * @param Quiz $quiz
     * @return array
     */
    protected function isQuizActive(Quiz $quiz)
    {
        // Retrieve current time
        $currentTime = Carbon::now();

        // Check if both start_time and end_time exist
        if (!$quiz->start_time || !$quiz->end_time) {
            return [
                'is_active' => false,
                'message' => 'The quiz does not have a defined start or end time.'
            ];
        }

        $startTime = Carbon::parse($quiz->start_time);
        $endTime = Carbon::parse($quiz->end_time);

        // Check if the current time is within the start and end time
        if ($currentTime->greaterThanOrEqualTo($startTime) && $currentTime->lessThanOrEqualTo($endTime)) {
            return [
                'is_active' => true,
                'message' => 'The quiz is currently active and accepting answers.'
            ];
        } elseif ($currentTime->lessThan($startTime)) {
            return [
                'is_active' => false,
                'message' => 'The quiz has not started yet.'
            ];
        } elseif ($currentTime->greaterThan($endTime)) {
            return [
                'is_active' => false,
                'message' => 'The quiz has already ended.'
            ];
        }
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
