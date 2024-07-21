<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CourseController extends Controller
{
    /**
     * Get all courses.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $courses = Course::all();
        return response()->json([
            'status' => 'success',
            'data' => $courses
        ], 200);
    }

    /**
     * Store a new course.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'teacher_id' => 'required|exists:users,id'
        ]);

        try {
            // Check if a course with the same title and teacher already exists
            $existingCourse = Course::where('title', $validated['title'])
                ->where('teacher_id', $validated['teacher_id'])
                ->first();

            if ($existingCourse) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'A course with this title and teacher already exists.'
                ], 409); // Conflict status code
            }

            // Create the course
            $course = Course::create($validated);

            // Return the created course with a 201 status code
            return response()->json([
                'status' => 'success',
                'message' => 'Course created successfully.',
                'data' => $course
            ], 201);

        } catch (\Exception $e) {
            // Handle unexpected exceptions
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while creating the course: ' . $e->getMessage()
            ], 500); // Internal server error status code
        }
    }

    /**
     * Show a specific course.
     *
     * @param \App\Models\Course $course
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Course $course)
    {
        return response()->json([
            'status' => 'success',
            'data' => $course
        ], 200);
    }

    /**
     * Update an existing course.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Course $course
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Course $course)
    {
        // Validate the request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'teacher_id' => 'required|exists:users,id'
        ]);

        try {
            // Check if a course with the same title and teacher already exists
            $existingCourse = Course::where('title', $validated['title'])
                ->where('teacher_id', $validated['teacher_id'])
                ->where('id', '!=', $course->id)
                ->first();

            if ($existingCourse) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'A course with this title and teacher already exists.'
                ], 409); // Conflict status code
            }

            // Update the course
            $course->update($validated);

            // Return the updated course
            return response()->json([
                'status' => 'success',
                'message' => 'Course updated successfully.',
                'data' => $course
            ], 200);

        } catch (\Exception $e) {
            // Handle unexpected exceptions
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while updating the course: ' . $e->getMessage()
            ], 500); // Internal server error status code
        }
    }

    /**
     * Delete a specific course.
     *
     * @param \App\Models\Course $course
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Course $course)
    {
        try {
            // Delete the course
            $course->delete();

            // Return a 204 status code with a success message
            return response()->json([
                'status' => 'success',
                'message' => 'Course deleted successfully.'
            ], 204);
        } catch (\Exception $e) {
            // Handle exceptions and return an error response
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while deleting the course: ' . $e->getMessage()
            ], 500);
        }
    }
}
