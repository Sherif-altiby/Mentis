<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\TeacherController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileController;
use App\Http\Controllers\AssignmentSubmissionController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\QuizQuestionController;
use App\Http\Controllers\QuizResponseController;

// ------------------------ Authentication Routes ----------------------------

// Route to register a new user (public access)
Route::post('register', [AuthController::class, 'register']);

// Route to log in an existing user (public access)
Route::post('login', [AuthController::class, 'login']);

// ---------------------------------------------------------------------------

// Route to get all courses (public access)
Route::get('/courses', [CourseController::class, 'index']);

// -------------------- Protected Routes (Requires Auth) --------------------

// Group of routes that require the user to be authenticated with Sanctum
Route::middleware('auth:sanctum')->group(function () {
    
    // -------------------------- Course Routes ------------------------------
    
    // Route to create a new course (protected)
    Route::post('/courses', [CourseController::class, 'store']);
    
    // Route to get details of a specific course by ID (protected)
    Route::get('/courses/{id}', [CourseController::class, 'show']);
    
    // Route to update an existing course by its ID (protected)
    Route::put('/courses/{course}', [CourseController::class, 'update']);
    
    // Route to delete a course by its ID (protected)
    Route::delete('/courses/{course}', [CourseController::class, 'destroy']);
    
    // ------------------------ Teacher Routes --------------------------------
    
    // Route to get a list of all teachers (protected)
    Route::get('/teachers', [TeacherController::class, 'index']);
    
    // Route to get details of a specific teacher by ID (protected)
    Route::get('/teachers/{id}', [TeacherController::class, 'show']);
    
    // Route to add new content to a course (e.g., lesson, video, etc.) (protected)
    Route::post('/teachers/courses/contents', [TeacherController::class, 'storeCourseContent']);
    
    // Route to update content of a specific course by content ID (protected)
    Route::put('/teachers/courses/contents/{id}', [TeacherController::class, 'updateCourseContent']);
    
    // Route to delete specific content from a course by content ID (protected)
    Route::delete('/teachers/courses/contents/{id}', [TeacherController::class, 'deleteCourseContent']);
    
    // Course Content Routes
    Route::get('/course-contents', [TeacherController::class, 'getAllCourseContents']);
    Route::get('/course-contents/{id}', [TeacherController::class, 'showCourseContent']);
    Route::get('/course-contents/teacher/{teacherId}/level/{level}', [TeacherController::class, 'getCourseContentsByTeacherAndLevel']);
    
    // ----------------------------------------
    Route::post('/quizzes', [QuizController::class, 'store']);
    Route::get('/quizzes/{id}', [QuizController::class, 'show']);
    Route::put('/quizzes/{id}', [QuizController::class, 'update']);
    Route::delete('/quizzes/{id}', [QuizController::class, 'destroy']);
    
    Route::post('/assignments', [AssignmentController::class, 'store']);
    Route::get('/assignments/{id}', [AssignmentController::class, 'show']);
    Route::put('/assignments/{id}', [AssignmentController::class, 'update']);
    Route::delete('/assignments/{id}', [AssignmentController::class, 'destroy']);
    
    Route::post('/files', [FileController::class, 'store']);
    Route::get('/files/{id}', [FileController::class, 'show']);
    Route::delete('/files/{id}', [FileController::class, 'destroy']);
    
    Route::post('/assignment-submissions', [AssignmentSubmissionController::class, 'store']);
    Route::get('/assignment-submissions/{id}', [AssignmentSubmissionController::class, 'show']);
    Route::put('/assignment-submissions/{id}', [AssignmentSubmissionController::class, 'update']);
    Route::delete('/assignment-submissions/{id}', [AssignmentSubmissionController::class, 'destroy']);
    
    Route::get('/quiz-questions', [QuizQuestionController::class, 'index']);
    Route::post('/quiz-questions', [QuizQuestionController::class, 'store']);
    Route::get('/quiz-questions/{id}', [QuizQuestionController::class, 'show']);
    Route::put('/quiz-questions/{id}', [QuizQuestionController::class, 'update']);
    Route::delete('/quiz-questions/{id}', [QuizQuestionController::class, 'destroy']);
    
    Route::get('/quiz-responses', [QuizResponseController::class, 'index']);
    Route::post('/quiz-responses', [QuizResponseController::class, 'store']);
    Route::get('/quiz-responses/{id}', [QuizResponseController::class, 'show']);
    Route::put('/quiz-responses/{id}', [QuizResponseController::class, 'update']);
    Route::delete('/quiz-responses/{id}', [QuizResponseController::class, 'destroy']);

    // --------------------- User & Authentication Routes ---------------------
    
    // Route to get user details from a token (protected)
    Route::get('/user-from-token/{token}', [AuthController::class, 'getUserFromToken']);
    
    // Route to log out the current user (protected)
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Route to initiate a password reset for the current user (protected)
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);
    
    // ------------------------------------------------------------------------
});
