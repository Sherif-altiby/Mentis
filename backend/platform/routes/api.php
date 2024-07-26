<?php

use App\Http\Controllers\AuthController;

use App\Http\Controllers\CourseController;


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
        
    Route::get('/courses', [CourseController::class, 'index']);//get all courses
    Route::post('/courses', [CourseController::class, 'store']);//store the course
    Route::get('/courses/{id}', [CourseController::class, 'show']);//get the course id
    Route::put('/courses/{course}', [CourseController::class, 'update']);
    Route::delete('/courses/{course}', [CourseController::class, 'destroy']);

    

    Route::get('/user-from-token/{token}', [AuthController::class, 'getUserFromToken']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);

});
