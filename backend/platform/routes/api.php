<?php

use App\Http\Controllers\AuthController;

use App\Http\Controllers\CourseController;


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('courses', [CourseController::class, 'index']);
Route::post('courses', [CourseController::class, 'store']);
Route::get('courses/{course}', [CourseController::class, 'show']);
Route::put('courses/{course}', [CourseController::class, 'update']);
Route::delete('courses/{course}', [CourseController::class, 'destroy']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
