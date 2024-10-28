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

class FileController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Validate request data
            $validatedData = $request->validate([
                'user_id' => 'required|exists:users,id',
                'file_data' => 'required|file|mimes:pdf,docx,txt,jpg,png',
            ]);

            $file = $request->file('file_data');

            // Generate a hashed name for the file
            $hashedName = Str::random(40) . '.' . $file->getClientOriginalExtension();

            // Define the path to save the file
            $path = 'public/files/' . $hashedName;

            // Store the file in the public storage
            Storage::put($path, file_get_contents($file->getRealPath()));

            // Store the hashed name and file type in the database
            $fileRecord = File::create([
                'user_id' => $validatedData['user_id'],
                'file_name' => $hashedName,  // Save the hashed name here
                'file_type' => $file->getClientMimeType(),
                'file_data' => null, // Set to null since we're saving the file on disk
            ]);

            // Return the response excluding binary data
            return response()->json($fileRecord->only(['id', 'file_name', 'file_type', 'user_id']), 201);

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
            // Retrieve the file record by ID
            $file = File::findOrFail($id);

            // Generate the full path to the file
            $filePath = storage_path('app/public/files/' . $file->file_name);

            // Check if the file exists in the specified path
            if (!file_exists($filePath)) {
                throw new \Exception('File not found'.$filePath.'');
            }

            // Stream the file content
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
            $filePath = storage_path('app/public/files/' . $file->file_name);

            if (!file_exists($filePath)) {
                throw new \Exception('File not found.');
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
            Storage::disk('public')->delete('files/' . $file->file_name);

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
