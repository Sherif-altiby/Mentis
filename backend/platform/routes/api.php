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

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
|
| These routes are used for user authentication, including registration
| and login functionalities. They are accessible without authentication.
|
*/

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
|
| Routes accessible without authentication, used to display publicly
| available information such as courses and teachers.
|
*/

Route::get('/courses', [CourseController::class, 'index']);
Route::get('/teachers', [TeacherController::class, 'index']);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| These routes are protected by authentication and the 'admin' role.
| They allow administrators to manage resources such as courses,
| teachers, and files.
|
*/

Route::middleware(['auth:sanctum', RoleMiddleware::class . ':admin'])->group(function () {
    // Course Management
    Route::post('/courses', [CourseController::class, 'store']);
    Route::put('/courses/{course}', [CourseController::class, 'update']);
    Route::delete('/courses/{course}', [CourseController::class, 'destroy']);

    // Additional admin routes can be added here
});

/*
|--------------------------------------------------------------------------
| Teacher Routes
|--------------------------------------------------------------------------
|
| These routes are protected by authentication and the 'teacher' role.
| Teachers can manage their courses, upload content, and manage quizzes,
| assignments, and related resources.
|
*/

Route::middleware(['auth:sanctum', RoleMiddleware::class . ':teacher'])->group(function () {


    
    // Course Content Management
    Route::post('/teachers/courses/contents', [TeacherController::class, 'storeCourseContent']);
    Route::put('/teachers/courses/contents/{id}', [TeacherController::class, 'updateCourseContent']);
    Route::delete('/teachers/courses/contents/{id}', [TeacherController::class, 'deleteCourseContent']);

    // Course Content Files Management
    Route::post('/course-content/store', [TeacherController::class, 'storeFileAndContent']);
    

    
    
    Route::delete('/files/{id}', [FileController::class, 'destroy']);
   

    // Quiz Management
    
    Route::post('/quizzes', [QuizController::class, 'store']);
   
    Route::put('/quizzes/{id}', [QuizController::class, 'update']);
   
    Route::delete('/quizzes/{id}', [QuizController::class, 'destroy']);
    
    


    // Quiz Questions Management
   
    Route::post('/quiz-questions', [QuizQuestionController::class, 'store']);
    
    Route::put('/quiz-questions/{id}', [QuizQuestionController::class, 'update']);
    Route::delete('/quiz-questions/{id}', [QuizQuestionController::class, 'destroy']);

    // Quiz Responses Management
    
    
   
    Route::put('/quiz-responses/{id}', [QuizResponseController::class, 'update']);
    Route::delete('/quiz-responses/{id}', [QuizResponseController::class, 'destroy']);
   
   
    // Assignment Management
    Route::post('/assignments', [AssignmentController::class, 'store']);
   
    Route::put('/assignments/{id}', [AssignmentController::class, 'update']);
    Route::delete('/assignments/{id}', [AssignmentController::class, 'destroy']);

    
   
    Route::put('/assignment-submissions/{id}', [AssignmentSubmissionController::class, 'update']);
    Route::delete('/assignment-submissions/{id}', [AssignmentSubmissionController::class, 'destroy']);


    
});

/*
|--------------------------------------------------------------------------
| Mixed Role Routes
|--------------------------------------------------------------------------
|
| Routes accessible by multiple roles (admin, teacher, student, parent).
| These routes require authentication but are accessible by different
| user roles as specified in the RoleMiddleware.
|
*/

Route::middleware(['auth:sanctum', RoleMiddleware::class . ':admin|teacher|student|parent'])->group(function () {
    // Course Content Viewing
    Route::get('/course-contents/{id}', [TeacherController::class, 'showCourseContent']);
    Route::get('/course-contents', [TeacherController::class, 'getAllCourseContents']);
    Route::get('/course-contents/teacher/{teacherId}/level/{level}', [TeacherController::class, 'getCourseContentsByTeacherAndLevel']);

    // Teacher Profile Viewing
    Route::get('/teachers/{id}', [TeacherController::class, 'show']);

    // Course Viewing
    Route::get('/courses/{id}', [CourseController::class, 'show']);

    // User Information Retrieval
    Route::get('/user-from-token/{token}', [AuthController::class, 'getUserFromToken']);

    // Additional routes for multiple roles can be added here


    Route::get('/course-contents', [TeacherController::class, 'getAllCourseContents']);
    Route::get('/course-contents/{id}', [TeacherController::class, 'showCourseContent']);
    Route::get('/course-contents/teacher/{teacherId}/level/{level}', [TeacherController::class, 'getCourseContentsByTeacherAndLevel']);

    Route::get('/files/{id}', [FileController::class, 'show']);

    Route::get('/teacher/{id}/files', [TeacherController::class, 'getFilesTeacher']);
    Route::get('/assignment-submissions/{id}', [AssignmentSubmissionController::class, 'show']);
    Route::get('/assignments/{id}', [AssignmentController::class, 'show']);
    Route::get('/student-results/{studentId}/quiz/{quizId}', [QuizResponseController::class, 'getStudentResult']);
    Route::get('/quiz-responses', [QuizResponseController::class, 'index']);
    Route::get('/quiz-responses/{id}', [QuizResponseController::class, 'show']);
    Route::get('/quiz-questions', [QuizQuestionController::class, 'index']);
    Route::get('/quiz-questions/{id}', [QuizQuestionController::class, 'show']);
    Route::get('/quizzes', [QuizController::class, 'index']);
    Route::get('/quizzes/{id}', [QuizController::class, 'show']);
    Route::get('/quiz/{id}/questions', [QuizController::class, 'getQuizQuestions']);
    Route::get('/quizzes-with-teacher-id', [QuizController::class, 'getAllQuizzesWithTeacherId']);

    // Route in web.php or api.php (depending on your setup)
    Route::get('/quiz/{id}/timer', [QuizController::class, 'getQuizTimer']);


// ----------------------
    // Assignment Submission Management
    Route::post('/assignment-submissions', [AssignmentSubmissionController::class, 'store']);
    Route::post('/quiz-responses', [QuizResponseController::class, 'store']);
    // File Management
    Route::post('/files', [FileController::class, 'store']);
    Route::get('/files/{id}/storage', [FileController::class, 'calculateUserStorage']);


    


});

/*
|--------------------------------------------------------------------------
| Authenticated User Routes
|--------------------------------------------------------------------------
|
| Routes that require authentication, regardless of user role. These
| routes are accessible by any authenticated user.
|
*/

Route::middleware(['auth:sanctum'])->group(function () {
    // Logout and Password Reset
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);

    // Additional authenticated routes can be added here
});


// api pages
