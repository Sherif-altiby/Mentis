<?php

// app/Http/Controllers/FileController.php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use PDF;

class FileController extends Controller
{
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

            // Generate a hashed file name with the original extension
            $hashedName = Str::random(40) . '.' . $file->getClientOriginalExtension();

            // Store the file in the "public/files" directory with the hashed name
            $filePath = $file->storeAs('files', $hashedName, 'public');

            // Create a record in the database with the path
            $fileRecord = File::create([
                'user_id' => $validatedData['user_id'],
                'file_name' => $validatedData['file_name'],
                'file_type' => $validatedData['file_type'],
                'file_data' => $filePath,  // Store file path instead of binary data
            ]);

            // Hide binary data from the response
            $fileRecord->makeHidden('file_data');

            return response()->json($fileRecord->only(['id', 'file_name', 'file_type', 'user_id', 'file_data']), 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed.',
                'messages' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error storing file:', ['message' => $e->getMessage()]);
            return response()->json([
                'error' => 'An error occurred while storing the file.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $file = File::findOrFail($id);
            $filePath = storage_path('app/public/' . $file->file_data);

            if (!file_exists($filePath)) {
                throw new \Exception('File data is missing.');
            }

            return response()->file($filePath, [
                'Content-Type' => $file->file_type,
                'Content-Disposition' => 'inline; filename="' . $file->file_name . '"',
            ]);

        } catch (ModelNotFoundException $e) {
            Log::error('File not found:', ['id' => $id, 'message' => $e->getMessage()]);
            return response()->json([
                'error' => 'File not found.',
                'message' => "File with ID $id does not exist."
            ], 404);
        } catch (\Exception $e) {
            Log::error('Error retrieving file:', ['message' => $e->getMessage()]);
            return response()->json([
                'error' => 'An error occurred while retrieving the file.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function downloadFile($fileId)
    {
        try {
            $file = File::findOrFail($fileId);
            $filePath = storage_path('app/public/' . $file->file_data);

            if (!file_exists($filePath)) {
                throw new \Exception('File data is missing.');
            }

            return response()->download($filePath, $file->file_name, [
                'Content-Type' => $file->file_type,
            ]);

        } catch (\Exception $e) {
            Log::error('Error downloading file:', ['message' => $e->getMessage()]);
            return response()->json([
                'error' => 'An error occurred while downloading the file.',
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



    public function destroy($id)
    {
        try {
            $file = File::findOrFail($id);

            // Delete the file from storage
            Storage::disk('public')->delete($file->file_data);

            // Delete the record from the database
            $file->delete();

            return response()->json("success", 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'File not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the file'], 500);
        }
    }
}
