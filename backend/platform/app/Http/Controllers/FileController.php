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
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'file_name' => 'required|string|max:255',
            'file_type' => 'required|string|max:255',
            'file_data' => 'required|file|mimes:pdf,docx,txt,jpg,png|max:20480',
        ]);

        $file = $request->file('file_data');
        $path = $file->store('files', 'public');

        $fileRecord = File::create([
            'user_id' => $validatedData['user_id'],
            'file_name' => $validatedData['file_name'],
            'file_type' => $validatedData['file_type'],
            'file_data' => $path,
        ]);

        return response()->json($fileRecord, 201);
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

        return response()->json(null, 204);
    }
}
