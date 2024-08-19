<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'file_id', // Added file_id to the fillable array
        'content_type',
        'title',
        'image',
        'file_path',
        'content',
        'order',
        'level',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
