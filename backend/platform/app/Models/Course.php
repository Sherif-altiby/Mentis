<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;
    

    protected $fillable = [
        'teacher_id',
        'title',
        'description',
        'price',
    ];

    public function teacher()
    {
        return $this->belongsTo(User::class);
    }
}
