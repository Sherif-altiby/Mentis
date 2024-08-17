<?php

// app/Models/AssignmentSubmission.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssignmentSubmission extends Model
{
    use HasFactory;

    protected $fillable = ['assignment_id', 'student_id', 'file_id', 'grade', 'submission_date'];

    public function assignment()
    {
        return $this->belongsTo(Assignment::class);
    }

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
