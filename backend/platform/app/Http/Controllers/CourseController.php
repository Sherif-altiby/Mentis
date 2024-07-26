<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CourseController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth:sanctum');
    }

    /**
     * Get all courses.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
{
    $courses = Course::with('teacher')->get()->map(function ($course) {
        return [
            'id' => $course->id,
            'teacher_id' => $course->teacher_id,
            'teacher' => $course->teacher ? [
                'id' => $course->teacher->id,
                'name' => $course->teacher->name,
                'email' => $course->teacher->email,
                // Add other teacher attributes as needed
            ] : null,
            'title' => $course->title,
            'description' => $course->description,
            'price' => $course->price,
            'image' => $course->image ? base64_encode($course->image) : null,
            'created_at' => $course->created_at,
            'updated_at' => $course->updated_at,
        ];
    });

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
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'teacher_id' => 'required|exists:users,id',
            'image' => 'nullable|string', // base64 encoded image
        ]);

        try {
            $existingCourse = Course::where('title', $validated['title'])
                ->where('teacher_id', $validated['teacher_id'])
                ->first();

            if ($existingCourse) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'A course with this title and teacher already exists.'
                ], 409);
            }

            $course = new Course($validated);

            if ($request->filled('image')) {
                $course->image = base64_decode($request->image);
            }

            $course->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Course created successfully.',
                'data' => $course
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while creating the course: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show a specific course.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $course = Course::findOrFail($id);

            return response()->json([
                'status' => 'success',
                'data' => [
                    'id' => $course->id,
                    'teacher_id' => $course->teacher_id,
                    'title' => $course->title,
                    'description' => $course->description,
                    'price' => $course->price,
                    'image' => $course->image ? base64_encode($course->image) : null,
                    'created_at' => $course->created_at,
                    'updated_at' => $course->updated_at,
                ]
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Course not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while fetching the course: ' . $e->getMessage()
            ], 500);
        }
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
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'teacher_id' => 'required|exists:users,id',
            'image' => 'nullable|string', // base64 encoded image
        ]);

        try {
            $existingCourse = Course::where('title', $validated['title'])
                ->where('teacher_id', $validated['teacher_id'])
                ->where('id', '!=', $course->id)
                ->first();

            if ($existingCourse) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'A course with this title and teacher already exists.'
                ], 409);
            }

            if ($request->filled('image')) {
                $validated['image'] = base64_decode($request->image);
            }

            $course->update($validated);

            return response()->json([
                'status' => 'success',
                'message' => 'Course updated successfully.',
                'data' => $course
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while updating the course: ' . $e->getMessage()
            ], 500);
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
            $course->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Course deleted successfully.'
            ], 204);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while deleting the course: ' . $e->getMessage()
            ], 500);
        }
    }
}
