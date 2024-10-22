<?php

// app/Http/Controllers/FileController.php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB; // Import the DB facade
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

use PDF; // Import the PDF facade

class FileController extends Controller
{
//     public function store(Request $request)
// {
//     try {
//         // Log the request data for debugging
//         \Log::info('Request data:', $request->all());

//         // Validate the request data
//         $validatedData = $request->validate([
//             'user_id' => 'required|exists:users,id',
//             'file_name' => 'required|string|max:255',
//             'file_type' => 'required|string|max:255',
//             'file_data' => 'required|file|mimes:pdf,docx,txt,jpg,png',
//         ]);

//         // Handle the uploaded file
//         $file = $request->file('file_data');
//         if (!$file->isValid()) {
//             throw new \Exception('The file upload failed. Please try again.');
//         }

//         // Read the file's binary data
//         $fileContents = file_get_contents($file->getRealPath());

//         // Create a record in the database
//         $fileRecord = File::create([
//             'user_id' => $validatedData['user_id'],
//             'file_name' => $validatedData['file_name'],
//             'file_type' => $validatedData['file_type'],
//             'file_data' => $fileContents,  // Store binary data
//         ]);

//         // Return a success response
//         return response()->json($fileRecord, 201);
//     } catch (\Illuminate\Validation\ValidationException $e) {
//         // Handle validation errors
//         return response()->json([
//             'error' => 'Validation failed.',
//             'messages' => $e->errors(),
//         ], 422);
//     } catch (\Exception $e) {
//         // Handle general errors
//         \Log::error('Error storing file:', ['message' => $e->getMessage()]);
//         return response()->json([
//             'error' => 'An error occurred while storing the file.',
//             'message' => $e->getMessage(),
//         ], 500);
//     }
// }
public function store(Request $request)
{
    try {
        // Log the request data for debugging
        Log::info('Request data:', $request->all());

        // Validate the request data
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'file_name' => 'required|string|max:255',
            'file_type' => 'required|string|max:255',
            'file_data' => 'required|file|mimes:pdf,docx,txt,jpg,png',
        ]);

        // Handle the uploaded file
        $file = $request->file('file_data');
        if (!$file->isValid()) {
            throw new \Exception('The file upload failed. Please try again.');
        }

        // Read the file's binary data
        $fileContents = file_get_contents($file->getRealPath());

        // Create a record in the database
        $fileRecord = File::create([
            'user_id' => $validatedData['user_id'],
            'file_name' => $validatedData['file_name'],
            'file_type' => $validatedData['file_type'],
            'file_data' => $fileContents,  // Store binary data
        ]);

        // Hide binary data from the response
        $fileRecord->makeHidden('file_data');

        // Return a success response without the binary field
        return response()->json($fileRecord->only(['id', 'file_name', 'file_type', 'user_id']), 201);

    } catch (\Illuminate\Validation\ValidationException $e) {
        // Handle validation errors
        return response()->json([
            'error' => 'Validation failed.',
            'messages' => $e->errors(),
        ], 422);
    } catch (\Exception $e) {
        // Handle general errors
        Log::error('Error storing file:', ['message' => $e->getMessage()]);
        return response()->json([
            'error' => 'An error occurred while storing the file.',
            'message' => $e->getMessage(),
        ], 500);
    }
}



public function calculateUserStorage($userId)
{
    try {
        // Check if the user exists using Eloquent
        $user = User::findOrFail($userId);

        // Calculate the total file size in bytes using Eloquent's sum method on the relationship
        $totalStorage = $user->files()->sum(DB::raw('LENGTH(file_data)'));

        // Handle the case where no files exist for the user
        if ($totalStorage === 0) {
            return response()->json([
                'message' => 'User has no uploaded files',
                'user_id' => $userId,
                'total_storage_bytes' => 0 // Return 0 bytes if no files
            ], 200);
        }

        return response()->json([
            'message' => 'Storage calculation successful',
            'user_id' => $userId,
            'total_storage_bytes' => $totalStorage // Return the total storage in bytes
        ], 200);

    } catch (ModelNotFoundException $e) {
        // If the user is not found, return a 404 error with a message
        return response()->json([
            'error' => 'User not found',
            'user_id' => $userId
        ], 404);
        
    } catch (\Exception $e) {
        // General error handling for unexpected issues
        return response()->json([
            'error' => 'An unexpected error occurred',
            'details' => $e->getMessage()
        ], 500);
    }
}




public function show($id)
{
    try {
        // Retrieve the file record
        $file = File::findOrFail($id);

        // Ensure file data exists
        if (empty($file->file_data)) {
            throw new \Exception('File data is missing.');
        }

        // Get the file's binary data and file name
        $fileData = $file->file_data;
        $fileName = $file->file_name;

        // Load the PDF data directly from the binary content
        // Make sure to set the correct MIME type
        return response($fileData)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'attachment; filename="' . $fileName . '"');

    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        \Log::error('File not found:', ['id' => $id, 'message' => $e->getMessage()]);
        return response()->json([
            'error' => 'File not found.',
            'message' => "File with ID $id does not exist."
        ], 404);

    } catch (\Exception $e) {
        \Log::error('Error retrieving file:', ['message' => $e->getMessage()]);
        return response()->json([
            'error' => 'An error occurred while retrieving the file.',
            'message' => $e->getMessage(),
        ], 500);
    }
}


public function downloadFile($fileId)
{
    try {
        // Retrieve the file by ID
        $file = File::findOrFail($fileId);

        // Decode the file data from Base64 (if stored as Base64) or return the raw binary data
        $fileData = base64_decode($file->file_data);

        // Return the file as a response, serving it as a downloadable PDF or another file type
        return response()->make($fileData, 200, [
            'Content-Type' => $file->file_type, // MIME type from the database, e.g., 'application/pdf'
            'Content-Disposition' => 'inline; filename="' . $file->file_name . '"', // Display or download the file
        ]);

    } catch (\Exception $e) {
        \Log::error('Error downloading file:', ['message' => $e->getMessage()]);
        return response()->json([
            'error' => 'An error occurred while downloading the file.',
            'message' => $e->getMessage(),
        ], 500);
    }
}


    public function destroy($id)
    {
        $file = File::findOrFail($id);
        Storage::disk('public')->delete($file->file_data);
        $file->delete();

        return response()->json("success", 204);
    }
}
