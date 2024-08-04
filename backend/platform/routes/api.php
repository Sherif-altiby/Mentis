<?php

use App\Http\Controllers\AuthController;

use App\Http\Controllers\CourseController;
use App\Http\Controllers\TeacherController;


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);



Route::get('/courses', [CourseController::class, 'index']);//get all courses

Route::middleware('auth:sanctum')->group(function () {
        
   
    Route::post('/courses', [CourseController::class, 'store']);//store the course
    Route::get('/courses/{id}', [CourseController::class, 'show']);//get the course id
    Route::put('/courses/{course}', [CourseController::class, 'update']);//update the course by course id
    Route::delete('/courses/{course}', [CourseController::class, 'destroy']);//delete the course by id

    

    // ------------------------teacher----------------------------
    

    Route::get('/teachers', [TeacherController::class, 'index']);
    Route::get('/teachers/{id}', [TeacherController::class, 'show']);

    Route::post('/teachers/courses', [TeacherController::class, 'storeCourse']);
    Route::put('/teachers/courses/{id}', [TeacherController::class, 'updateCourse']);
    Route::delete('/teachers/courses/{id}', [TeacherController::class, 'deleteCourse']);


    Route::post('/teachers/courses/contents', [TeacherController::class, 'storeCourseContent']);
    Route::put('/teachers/courses/contents/{id}', [TeacherController::class, 'updateCourseContent']);
    Route::delete('/teachers/courses/contents/{id}', [TeacherController::class, 'deleteCourseContent']);

    // ----------------------------------------------------------



    Route::get('/user-from-token/{token}', [AuthController::class, 'getUserFromToken']);//get user
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);

});
