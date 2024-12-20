<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = ['course_id', 'title', 'description', 'type', 'is_published', 'start_time', 'end_time', 'level'];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function questions()
    {
        return $this->hasMany(QuizQuestion::class);
    }
    public function getAllQuestions()
    {
        return $this->questions()->get();
    }
    public static function getAllWithTeacherId()
    {
        return self::with(['course' => function($query) {
            $query->select('id', 'teacher_id');
        }])->get();
    }
    
}
