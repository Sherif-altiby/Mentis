<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Course;
use App\Models\CourseContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\File;

use Illuminate\Support\Facades\Http;


class TeacherController extends Controller
{
    // Retrieve all teachers and their courses
    public function index()
    {
        try {
            $teachers = User::where('role', 'teacher')->with(['courses' => function ($query) {
                $query->select('id', 'teacher_id', 'title', 'description', 'price', 'created_at', 'updated_at');
            }])->get();
            return response()->json($teachers);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to retrieve teachers', 'message' => $e->getMessage()], 500);
        }
    }

    // Retrieve a specific teacher and their courses
    public function show($id)
    {
        try {
            $teacher = User::where('role', 'teacher')->with(['courses' => function ($query) {
                $query->select('id', 'teacher_id', 'title', 'description', 'price', 'created_at', 'updated_at');
            }])->findOrFail($id);
            return response()->json($teacher);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Teacher not found', 'message' => $e->getMessage()], 404);
        }
    }

    // Create a new course
    public function storeCourse(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'teacher_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'image' => 'nullable|binary', // Image is optional
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Validation failed', 'message' => $validator->errors()], 422);
        }

        try {
            $courseData = $request->all();
            if ($request->has('image')) {
                $courseData['image'] = base64_encode($request->image); // Encode image as base64
            }
            $course = Course::create($courseData);
            return response()->json($course, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to create course', 'message' => $e->getMessage()], 500);
        }
    }

    // Update an existing course
    public function updateCourse(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'image' => 'nullable|binary', // Image is optional
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Validation failed', 'message' => $validator->errors()], 422);
        }

        try {
            $course = Course::findOrFail($id);
            $courseData = $request->all();
            if ($request->has('image')) {
                $courseData['image'] = base64_encode($request->image); // Encode image as base64
            }
            $course->update($courseData);
            return response()->json($course);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to update course', 'message' => $e->getMessage()], 500);
        }
        $responseData = [
            'message' => 'File uploaded successfully!',
            // other data
        ];
    
        // Ensure UTF-8 encoding
        return response()->json($responseData, 200, [], JSON_UNESCAPED_UNICODE | JSON_PARTIAL_OUTPUT_ON_ERROR);
    }

    // Delete a specific course
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
    // Validate the request
    $validator = Validator::make($request->all(), [
        'course_id' => 'required|exists:courses,id',
        'content_type' => 'required|in:video,document,quiz',
        'title' => 'required|string|max:255',
        'file_id' => 'nullable|exists:files,id', // Validate file_id
        'file_path' => 'nullable|string',
        'content' => 'nullable|string',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validate image with size and format
        'level' => 'required|in:first,second,third',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => 'error',
            'code' => 422,
            'error' => 'Validation failed',
            'details' => $validator->errors()
        ], 422);
    }

    try {
        $data = $request->all();

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');

            if (!$image->isValid()) {
                return response()->json([
                    'status' => 'error',
                    'code' => 422,
                    'error' => 'Invalid image file',
                    'message' => 'The uploaded image file is invalid.'
                ], 422);
            }

            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/images', $imageName);
            $data['image'] = $imageName;
        }

        // Set the order for the new content based on the current max order
        $maxOrder = CourseContent::where('course_id', $request->course_id)->max('order');
        $data['order'] = $maxOrder + 1;

        // Create CourseContent
        $courseContent = CourseContent::create($data);

        return response()->json([
            'status' => 'success',
            'code' => 201,
            'message' => 'Course content created successfully.',
            'data' => $courseContent
        ], 201);

    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'code' => 500,
            'error' => 'Unable to create course content',
            'message' => $e->getMessage()
        ], 500);
    }
}

public function storeFileAndContent(Request $request)
{
    try {
        // Log the request data for debugging
        \Log::info('Request data:', $request->all());

        // Validate the request data
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'course_id' => 'required|exists:courses,id',
            'file_name' => 'required|string|max:255',
            'file_type' => 'required|string|max:255',
            'file_data' => 'required|file|mimes:pdf,docx,txt,jpg,png',
            'content_type' => 'required|in:video,document,quiz',
            'title' => 'required|string|max:255',
            'level' => 'required|in:first,second,third',
            'content' => 'nullable|string',
            'order' => 'nullable|integer',
        ]);

        // Handle the uploaded file
        $file = $request->file('file_data');
        if (!$file->isValid()) {
            throw new \Exception('The file upload failed. Please try again.');
        }

        // Store the file
        $path = $file->store('files', 'public');

        // Create a record in the files table
        $fileRecord = File::create([
            'user_id' => $validatedData['user_id'],
            'file_name' => $validatedData['file_name'],
            'file_type' => $validatedData['file_type'],
            'file_data' => $path,
        ]);

        // Determine the order if not provided
        $maxOrder = CourseContent::where('course_id', $validatedData['course_id'])->max('order');
        $order = $validatedData['order'] ?? ($maxOrder + 1);

        // Store the course content
        $courseContent = CourseContent::create([
            'course_id' => $validatedData['course_id'],
            'file_id' => $fileRecord->id,
            'content_type' => $validatedData['content_type'],
            'title' => $validatedData['title'],
            'file_path' => $path,
            'content' => $validatedData['content'] ?? null,
            'order' => $order,
            'level' => $validatedData['level'],
        ]);

        // Return a success response with the course content details
        return response()->json($courseContent, 201);

    } catch (\Illuminate\Validation\ValidationException $e) {
        // Handle validation errors
        return response()->json([
            'error' => 'Validation failed.',
            'messages' => $e->errors(),
        ], 422);
    } catch (\Exception $e) {
        // Handle general errors
        \Log::error('Error storing file and course content:', ['message' => $e->getMessage()]);
        return response()->json([
            'error' => 'An error occurred while storing the file and course content.',
            'message' => $e->getMessage(),
        ], 500);
    }
}





public function updateCourseContent(Request $request, $id)
{
    $validator = Validator::make($request->all(), [
        'content_type' => 'required|in:video,document,quiz',
        'title' => 'required|string|max:255',
        'file_id' => 'nullable|exists:files,id', // Validate file_id
        'file_path' => 'nullable|string',
        'content' => 'nullable|string',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validate image
        'level' => 'required|in:first,second,third',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => 'error',
            'code' => 422,
            'error' => 'Validation failed',
            'details' => $validator->errors()
        ], 422);
    }

    try {
        $courseContent = CourseContent::findOrFail($id);
        $data = $request->all();

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');

            if (!$image->isValid()) {
                return response()->json([
                    'status' => 'error',
                    'code' => 422,
                    'error' => 'Invalid image file',
                    'message' => 'The uploaded image file is invalid.'
                ], 422);
            }

            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/images', $imageName);
            $data['image'] = $imageName;
        }

        if (isset($data['order'])) {
            $maxOrder = CourseContent::where('course_id', $courseContent->course_id)->max('order');
            $data['order'] = min($data['order'], $maxOrder);
        }

        $courseContent->update($data);

        return response()->json([
            'status' => 'success',
            'code' => 200,
            'message' => 'Course content updated successfully.',
            'data' => $courseContent
        ], 200);
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json([
            'status' => 'error',
            'code' => 404,
            'error' => 'Course content not found',
            'message' => 'No course content found with the provided ID.'
        ], 404);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'code' => 500,
            'error' => 'Unable to update course content',
            'message' => $e->getMessage()
        ], 500);
    }
}

    
    public function deleteCourseContent($id)
    {
        try {
            $courseContent = CourseContent::findOrFail($id);
            $courseContent->delete();
    
            return response()->json([
                'status' => 'success',
                'code' => 204,
                'message' => 'Course content deleted successfully.'
            ], 204);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'code' => 404,
                'error' => 'Course content not found',
                'message' => 'No course content found with the provided ID.'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'code' => 500,
                'error' => 'Unable to delete course content',
                'message' => $e->getMessage()
            ], 500);
        }
    }
    

    // Retrieve all course contents
    public function getAllCourseContents()
    {
        try {
            $courseContents = CourseContent::all();
            return response()->json($courseContents);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to retrieve course contents', 'message' => $e->getMessage()], 500);
        }
    }
    public function getCourseContentsByTeacherAndLevel($teacherId, $level)
{
    try {
        // Validate input parameters
        if (!is_numeric($teacherId) || $teacherId <= 0) {
            return response()->json([
                'error' => 'Invalid teacher ID',
                'message' => 'The provided teacher ID must be a positive number.'
            ], 400);
        }

        $validLevels = ['first', 'second', 'third'];
        if (!in_array($level, $validLevels)) {
            return response()->json([
                'error' => 'Invalid level',
                'message' => 'The level must be one of the following: ' . implode(', ', $validLevels) . '.'
            ], 400);
        }

        // Check if the teacher exists
        $teacherExists = User::where('id', $teacherId)->where('role', 'teacher')->exists();
        if (!$teacherExists) {
            return response()->json([
                'error' => 'Teacher not found',
                'message' => 'No teacher found with the provided ID.'
            ], 404);
        }

        // Retrieve course contents
        $courseContents = CourseContent::whereHas('course', function ($query) use ($teacherId) {
            $query->where('teacher_id', $teacherId);
        })
        ->where('level', $level)
        ->get();

        if ($courseContents->isEmpty()) {
            return response()->json([
                'error' => 'No course contents found',
                'message' => 'No course contents found for the specified teacher and level.'
            ], 404);
        }

        // Return the course contents
        return response()->json([
            'success' => true,
            'message' => 'Course contents retrieved successfully.',
            'data' => $courseContents
        ], 200);

    } catch (\Exception $e) {
        // Handle exceptions
        return response()->json([
            'error' => 'Unable to retrieve course contents',
            'message' => $e->getMessage()
        ], 500);
    }
}


    // Retrieve a specific course content
    public function showCourseContent($id)
    {
        try {
            $courseContent = CourseContent::findOrFail($id);
            return response()->json($courseContent);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Course content not found', 'message' => $e->getMessage()], 404);
        }
    }
}
