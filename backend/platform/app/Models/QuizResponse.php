<?php

// app/Models/QuizResponse.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizResponse extends Model
{
    use HasFactory;

    protected $fillable = ['quiz_question_id', 'student_id', 'answer', 'is_correct'];

    public function question()
    {
        return $this->belongsTo(QuizQuestion::class, 'quiz_question_id');
    }

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }
    public static function isDuplicate($quizQuestionId, $studentId)
    {
        return self::where('quiz_question_id', $quizQuestionId)
            ->where('student_id', $studentId)
            ->exists();
    }
}
