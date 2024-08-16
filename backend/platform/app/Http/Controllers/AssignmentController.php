<?php

// app/Http/Controllers/AssignmentController.php

namespace App\Http\Controllers;

use App\Models\Assignment;
use Illuminate\Http\Request;

class AssignmentController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'required|date',
            'is_published' => 'boolean',
        ]);

        $assignment = Assignment::create($validatedData);

        return response()->json($assignment, 201);
    }

    public function show($id)
    {
        $assignment = Assignment::findOrFail($id);
        return response()->json($assignment);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'required|date',
            'is_published' => 'boolean',
        ]);

        $assignment = Assignment::findOrFail($id);
        $assignment->update($validatedData);

        return response()->json($assignment);
    }

    public function destroy($id)
    {
        $assignment = Assignment::findOrFail($id);
        $assignment->delete();

        return response()->json(null, 204);
    }
}
