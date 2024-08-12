<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
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
}
