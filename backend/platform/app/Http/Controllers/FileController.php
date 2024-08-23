<?php

// app/Http/Controllers/FileController.php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function store(Request $request)
{
    try {
        // Log the request data for debugging
        \Log::info('Request data:', $request->all());

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

        // Store the file
        $path = $file->store('files', 'public');

        // Create a record in the database
        $fileRecord = File::create([
            'user_id' => $validatedData['user_id'],
            'file_name' => $validatedData['file_name'],
            'file_type' => $validatedData['file_type'],
            'file_data' => $path,
        ]);

        // Return a success response
        return response()->json($fileRecord, 201);
    } catch (\Illuminate\Validation\ValidationException $e) {
        // Handle validation errors
        return response()->json([
            'error' => 'Validation failed.',
            'messages' => $e->errors(),
        ], 422);
    } catch (\Exception $e) {
        // Handle general errors
        \Log::error('Error storing file:', ['message' => $e->getMessage()]);
        return response()->json([
            'error' => 'An error occurred while storing the file.',
            'message' => $e->getMessage(),
        ], 500);
    }
}


    public function show($id)
    {
        $file = File::findOrFail($id);
        return response()->json($file);
    }

    public function destroy($id)
    {
        $file = File::findOrFail($id);
        Storage::disk('public')->delete($file->file_data);
        $file->delete();

        return response()->json("success", 204);
    }
}
