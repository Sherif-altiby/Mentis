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

// -------------------------- Admin Routes -----------------------------------
Route::middleware(['auth:sanctum', RoleMiddleware::class . ':admin'])->group(function () {
    // Admin-specific course routes
    Route::post('/courses', [CourseController::class, 'store']);
    Route::get('/courses/{id}', [CourseController::class, 'show']);
    Route::put('/courses/{course}', [CourseController::class, 'update']);
    Route::delete('/courses/{course}', [CourseController::class, 'destroy']);

    // Additional admin routes can be added here
});

// ------------------------- Teacher Routes ----------------------------------
Route::middleware(['auth:sanctum', RoleMiddleware::class . ':teacher'])->group(function () {
    // Teacher-specific routes
    Route::get('/teachers/{id}', [TeacherController::class, 'show']);
    Route::post('/teachers/courses/contents', [TeacherController::class, 'storeCourseContent']);
    Route::put('/teachers/courses/contents/{id}', [TeacherController::class, 'updateCourseContent']);
    Route::delete('/teachers/courses/contents/{id}', [TeacherController::class, 'deleteCourseContent']);
    Route::get('/course-contents', [TeacherController::class, 'getAllCourseContents']);
    Route::post('/course-content/store', [TeacherController::class, 'storeFileAndContent']);
    Route::get('/course-contents/teacher/{teacherId}/level/{level}', [TeacherController::class, 'getCourseContentsByTeacherAndLevel']);

    // Additional teacher routes can be added here
});



// ------------------------- Mixed Role Routes -------------------------------
Route::middleware(['auth:sanctum', RoleMiddleware::class . ':admin|teacher|student|parent'])->group(function () {
    // Routes accessible by admin, teacher, student, and parent
    Route::get('/course-contents/{id}', [TeacherController::class, 'showCourseContent']);
    Route::get('/user-from-token/{token}', [AuthController::class, 'getUserFromToken']);

    // Additional routes for multiple roles can be added here
});

// ----------------------- Authenticated User Routes -------------------------
Route::middleware(['auth:sanctum'])->group(function () {
    // Routes that require authentication but no specific role
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);

    // Additional authenticated routes can be added here
});
