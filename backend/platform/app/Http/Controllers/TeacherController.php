<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Course;
use App\Models\CourseContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TeacherController extends Controller
{
    public function index()
    {
        try {
            $teachers = User::where('role', 'teacher')->with(['courses' => function($query) {
                $query->select('id', 'teacher_id', 'title', 'description', 'price', 'created_at', 'updated_at'); // Exclude 'image'
            }])->get();
            return response()->json($teachers);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to retrieve teachers', 'message' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $teacher = User::where('role', 'teacher')->with(['courses' => function($query) {
                $query->select('id', 'teacher_id', 'title', 'description', 'price', 'created_at', 'updated_at'); // Exclude 'image'
            }])->findOrFail($id);
            return response()->json($teacher);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Teacher not found', 'message' => $e->getMessage()], 404);
        }
    }

    public function storeCourse(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'teacher_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'image' => 'nullable|binary',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Validation failed', 'message' => $validator->errors()], 422);
        }

        try {
            $courseData = $request->all();
            if ($request->has('image')) {
                $courseData['image'] = base64_encode($request->image);
            }
            $course = Course::create($courseData);
            return response()->json($course, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to create course', 'message' => $e->getMessage()], 500);
        }
    }

    public function updateCourse(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'image' => 'nullable|binary',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Validation failed', 'message' => $validator->errors()], 422);
        }

        try {
            $course = Course::findOrFail($id);
            $courseData = $request->all();
            if ($request->has('image')) {
                $courseData['image'] = base64_encode($request->image);
            }
            $course->update($courseData);
            return response()->json($course);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to update course', 'message' => $e->getMessage()], 500);
        }
    }

    public function deleteCourse($id)
    {
        try {
            $course = Course::findOrFail($id);
            $course->delete();
            return response()->json(['message' => 'Course deleted successfully'], 204);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to delete course', 'message' => $e->getMessage()], 500);
        }
    }

    public function storeCourseContent(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|exists:courses,id',
            'content_type' => 'required|in:video,document,quiz',
            'title' => 'required|string|max:255',
            'file_path' => 'nullable|string',
            'content' => 'nullable|string',
            'order' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Validation failed', 'message' => $validator->errors()], 422);
        }

        try {
            $courseContent = CourseContent::create($request->all());
            return response()->json($courseContent, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to create course content', 'message' => $e->getMessage()], 500);
        }
    }

    public function updateCourseContent(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'content_type' => 'required|in:video,document,quiz',
            'title' => 'required|string|max:255',
            'file_path' => 'nullable|string',
            'content' => 'nullable|string',
            'order' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Validation failed', 'message' => $validator->errors()], 422);
        }

        try {
            $courseContent = CourseContent::findOrFail($id);
            $courseContent->update($request->all());
            return response()->json($courseContent);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to update course content', 'message' => $e->getMessage()], 500);
        }
    }

    public function deleteCourseContent($id)
    {
        try {
            $courseContent = CourseContent::findOrFail($id);
            $courseContent->delete();
            return response()->json(['message' => 'Course content deleted successfully'], 204);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to delete course content', 'message' => $e->getMessage()], 500);
        }
    }
}
