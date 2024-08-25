<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\AssignmentSubmissionController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\QuizQuestionController;
use App\Http\Controllers\QuizResponseController;
use App\Http\Middleware\RoleMiddleware;

// ------------------------ Authentication Routes ----------------------------
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// ---------------------------- Public Routes --------------------------------
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/teachers', [TeacherController::class, 'index']);


// -------------------------- Admin Routes -----------------------------------
Route::middleware(['auth:sanctum', RoleMiddleware::class . ':admin'])->group(function () {
   

    // Additional admin routes can be added here
});

// ------------------------- Teacher Routes ----------------------------------
Route::middleware(['auth:sanctum', RoleMiddleware::class . ':teacher'])->group(function () {
    // Teacher-specific routes
   
    Route::post('/teachers/courses/contents', [TeacherController::class, 'storeCourseContent']);
    Route::put('/teachers/courses/contents/{id}', [TeacherController::class, 'updateCourseContent']);
    Route::delete('/teachers/courses/contents/{id}', [TeacherController::class, 'deleteCourseContent']);
   
    Route::post('/course-content/store', [TeacherController::class, 'storeFileAndContent']);
   

    // Additional teacher routes can be added here
     // Admin-specific course routes
     Route::post('/courses', [CourseController::class, 'store']);
    
     Route::put('/courses/{course}', [CourseController::class, 'update']);
     Route::delete('/courses/{course}', [CourseController::class, 'destroy']);
     // Route to store a file
    Route::post('/files', [FileController::class, 'store']);

    // Route to show a specific file by its ID
    Route::get('/files/{id}', [FileController::class, 'show']);

    // Route to delete a specific file by its ID
    Route::delete('/files/{id}', [FileController::class, 'destroy']);
    Route::get('/teacher/{id}/files', [TeacherController::class, 'getFilesTeacher']);
    Route::put('/quiz-questions/{id}', [QuizQuestionController::class, 'update']);
    Route::delete('/quiz-questions/{id}', [QuizQuestionController::class, 'destroy']);

    Route::get('/student-results/{studentId}/quiz/{quizId}', [QuizResponseController::class, 'getStudentResult']);
    Route::get('/quiz-responses', [QuizResponseController::class, 'index']);
    Route::post('/quiz-responses', [QuizResponseController::class, 'store']);
    Route::get('/quiz-responses/{id}', [QuizResponseController::class, 'show']);
    Route::put('/quiz-responses/{id}', [QuizResponseController::class, 'update']);
    Route::delete('/quiz-responses/{id}', [QuizResponseController::class, 'destroy']);
     // Course Content Routes
     Route::get('/course-contents', [TeacherController::class, 'getAllCourseContents']);
     Route::post('/course-content/store', [TeacherController::class, 'storeFileAndContent']);
     Route::get('/course-contents/{id}', [TeacherController::class, 'showCourseContent']);
     Route::get('/course-contents/teacher/{teacherId}/level/{level}', [TeacherController::class, 'getCourseContentsByTeacherAndLevel']);
 
     // ----------------------------------------
     Route::get('/quizzes', [QuizController::class, 'index']);
     Route::post('/quizzes', [QuizController::class, 'store']);
     Route::get('/quizzes/{id}', [QuizController::class, 'show']);
     Route::put('/quizzes/{id}', [QuizController::class, 'update']);


     // Teacher-specific routes
    Route::get('/teachers/{id}', [TeacherController::class, 'show']);

    // Route to add new content to a course (e.g., lesson, video, etc.) (protected)
    Route::post('/teachers/courses/contents', [TeacherController::class, 'storeCourseContent']);

    // Route to update content of a specific course by content ID (protected)
    Route::put('/teachers/courses/contents/{id}', [TeacherController::class, 'updateCourseContent']);

    // Route to delete specific content from a course by content ID (protected)
    Route::delete('/teachers/courses/contents/{id}', [TeacherController::class, 'deleteCourseContent']);

    // Course Content Routes
    Route::get('/course-contents', [TeacherController::class, 'getAllCourseContents']);
    Route::post('/course-content/store', [TeacherController::class, 'storeFileAndContent']);
    Route::get('/course-contents/{id}', [TeacherController::class, 'showCourseContent']);
    Route::get('/course-contents/teacher/{teacherId}/level/{level}', [TeacherController::class, 'getCourseContentsByTeacherAndLevel']);

    // ----------------------------------------
    Route::get('/quizzes', [QuizController::class, 'index']);
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

    Route::get('/student-results/{studentId}/quiz/{quizId}', [QuizResponseController::class, 'getStudentResult']);
    Route::get('/quiz-responses', [QuizResponseController::class, 'index']);
    Route::post('/quiz-responses', [QuizResponseController::class, 'store']);
    Route::get('/quiz-responses/{id}', [QuizResponseController::class, 'show']);
    Route::put('/quiz-responses/{id}', [QuizResponseController::class, 'update']);
    Route::delete('/quiz-responses/{id}', [QuizResponseController::class, 'destroy']);



});



// ------------------------- Mixed Role Routes -------------------------------
Route::middleware(['auth:sanctum', RoleMiddleware::class . ':admin|teacher|student|parent'])->group(function () {
    // Routes accessible by admin, teacher, student, and parent
    Route::get('/course-contents/{id}', [TeacherController::class, 'showCourseContent']);
    Route::get('/user-from-token/{token}', [AuthController::class, 'getUserFromToken']);
    Route::get('/course-contents', [TeacherController::class, 'getAllCourseContents']);
    Route::get('/teachers/{id}', [TeacherController::class, 'show']);
    Route::get('/course-contents/teacher/{teacherId}/level/{level}', [TeacherController::class, 'getCourseContentsByTeacherAndLevel']);
    Route::get('/courses/{id}', [CourseController::class, 'show']);
    // Additional routes for multiple roles can be added here
});

// ----------------------- Authenticated User Routes -------------------------
Route::middleware(['auth:sanctum'])->group(function () {
    // Routes that require authentication but no specific role
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);

    // Additional authenticated routes can be added here
});

//----------------------------