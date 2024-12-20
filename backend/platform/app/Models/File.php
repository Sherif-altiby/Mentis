<?php

// app/Models/File.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'file_name', 'file_type','file_data'];
      // Hide file_data from being returned in JSON responses
    //  protected $hidden = ['file_data'];
    

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function assignmentSubmissions()
    {
        return $this->hasMany(AssignmentSubmission::class);
    }
    
}
