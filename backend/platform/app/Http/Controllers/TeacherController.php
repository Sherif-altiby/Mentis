<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Course;
use App\Models\CourseContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\File;
use Illuminate\Support\Facades\Log;


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
        // Validate the request data
        $validatedData = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'content_type' => 'required|in:video,document,quiz',
            'title' => 'required|string|max:255',
            'file_name' => 'required|string|max:255',
            'file_type' => 'required|string|max:255',
            'file_data' => 'required|file|mimes:pdf,docx,txt,jpg,png',
            'user_id' => 'required|exists:users,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048' // Ensure the image is validated
        ]);

        // Call the store method from FileController
        $fileController = new FileController();
        $fileResponse = $fileController->store($request);

        // Check if the file was stored successfully
        if ($fileResponse->getStatusCode() != 201) {
            throw new \Exception('File storage failed.');
        }

        // Decode the JSON response to access the file data
        $fileRecord = json_decode($fileResponse->getContent());

        // Handle the uploaded image if provided
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imageFile = $request->file('image');
            if ($imageFile->isValid()) {
                // Generate a unique filename and save the image
                $imagePath = 'images/' . uniqid() . '.' . $imageFile->getClientOriginalExtension();
                $imageFile->move(public_path('images'), $imagePath); // Store the image in the public/images directory
            }
        }

        // Continue with storing the course content
        $courseContent = CourseContent::create([
            'course_id' => $validatedData['course_id'],
            'file_id' => $fileRecord->id, // Use the returned file ID
            'content_type' => $validatedData['content_type'],
            'title' => $validatedData['title'],
            'image' => $imagePath // Store the path to the image file
            // Add additional course content fields here...
        ]);
        
        // Return a success response
        return response()->json($courseContent, 201);

    } catch (\Illuminate\Validation\ValidationException $e) {
        // Handle validation errors
        return response()->json([
            'error' => 'Validation failed.',
            'messages' => $e->errors(),
        ], 422);
    } catch (\Exception $e) {
        // Handle general errors
        Log::error('Error storing file and course content:', ['message' => $e->getMessage()]);
        return response()->json([
            'error' => 'An error occurred while storing the file and course content.',
            'message' => $e->getMessage(),
        ], 500);
    }
}







public function getFilesTeacher($teacherId)
{
    try {
        // Validate the teacher ID
        $validatedData = \Validator::make(['teacher_id' => $teacherId], [
            'teacher_id' => 'required|exists:users,id',
        ])->validate();

        // Retrieve all files uploaded by the teacher
        $files = File::where('user_id', $teacherId)->get();

        // Ensure that file data is not included and that all strings are properly encoded
        $fileMetadata = $files->map(function($file) {
            return [
                'id' => $file->id,
                'file_name' => mb_convert_encoding($file->file_name, 'UTF-8', 'UTF-8'), // Ensure proper encoding
                'file_type' => mb_convert_encoding($file->file_type, 'UTF-8', 'UTF-8'), // Ensure proper encoding
                'created_at' => $file->created_at,
                'download_url' => route('files.download', ['fileId' => $file->id]) // Download URL for the file
            ];
        });

        // Retrieve all course content associated with the files
        $courseContents = CourseContent::whereIn('file_id', $files->pluck('id'))->with('file')->get();

        // Attach the file metadata to each course content item
        $courseContents->each(function ($courseContent) use ($fileMetadata) {
            $courseContent->file_metadata = $fileMetadata->firstWhere('id', $courseContent->file_id);
        });

        // Convert all fields to ensure they are properly encoded
        $courseContentsArray = $courseContents->toArray();
        array_walk_recursive($courseContentsArray, function (&$item) {
            if (is_string($item)) {
                $item = mb_convert_encoding($item, 'UTF-8', 'UTF-8');
            }
        });

        // Return a success response with the course contents and their associated files
        return response()->json($courseContentsArray, 200);

    } catch (\Exception $e) {
        // Handle general errors
        \Log::error('Error fetching files and course content for teacher:', ['message' => $e->getMessage()]);
        return response()->json([
            'error' => 'An error occurred while fetching files and course content for the teacher.',
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


public function showCourseContent($id)
{
    try {
        $courseContent = CourseContent::findOrFail($id);

        // Check if the course content has an image
        if ($courseContent->image) {
            // Encode binary image data to Base64 format
            $imageData = base64_encode($courseContent->image);
            // Determine the image MIME type
            $mimeType = 'image/jpeg'; // Default to jpeg
            if (strpos($courseContent->file_path, '.png') !== false) {
                $mimeType = 'image/png';
            }

            // Add the Base64 image data to the response
            $courseContent->image_base64 = 'data:' . $mimeType . ';base64,' . $imageData;
        }

        return response()->json($courseContent);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Course content not found', 'message' => $e->getMessage()], 404);
    }
}

}
