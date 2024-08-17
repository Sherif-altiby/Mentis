<?php

// app/Models/Assignment.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    use HasFactory;

    // Specify the table associated with the model
    protected $table = 'assignments';

    // Specify the attributes that are mass assignable
    protected $fillable = [
        'course_id',
        'title',
        'description',
        'due_date',
        'is_published',
    ];

    // Define relationships if needed
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function submissions()
    {
        return $this->hasMany(AssignmentSubmission::class);
    }
}
