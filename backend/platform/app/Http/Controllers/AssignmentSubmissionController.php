<?php
// app/Http/Controllers/AssignmentSubmissionController.php

namespace App\Http\Controllers;

use App\Models\AssignmentSubmission;
use Illuminate\Http\Request;

class AssignmentSubmissionController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'assignment_id' => 'required|exists:assignments,id',
            'student_id' => 'required|exists:users,id',
            'file_id' => 'required|exists:files,id',
            'grade' => 'nullable|numeric|min:0|max:100',
            'submission_date' => 'required|date',
        ]);

        $submission = AssignmentSubmission::create($validatedData);

        return response()->json($submission, 201);
    }

    public function show($id)
    {
        $submission = AssignmentSubmission::findOrFail($id);
        return response()->json($submission);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'assignment_id' => 'required|exists:assignments,id',
            'student_id' => 'required|exists:users,id',
            'file_id' => 'required|exists:files,id',
            'grade' => 'nullable|numeric|min:0|max:100',
            'submission_date' => 'required|date',
        ]);

        $submission = AssignmentSubmission::findOrFail($id);
        $submission->update($validatedData);

        return response()->json($submission);
    }

    public function destroy($id)
    {
        $submission = AssignmentSubmission::findOrFail($id);
        $submission->delete();

        return response()->json(null, 204);
    }
}
