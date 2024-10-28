<?php
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
class User extends Authenticatable
{
    use HasApiTokens, Notifiable, HasFactory;

    protected $table = 'users';

    protected $fillable = [
        'name', 'email', 'password', 'phone_number', 'role', 'image'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Define the relationship with the Student model
    public function studentDetails()
    {
        return $this->hasOne(Student::class, 'user_id');
    }

    // Scope to filter only students
    public function scopeStudents($query)
    {
        return $query->where('role', 'student');
    }

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class, 'teacher_id');
    }
    public function files(): HasMany
{
    return $this->hasMany(File::class, 'user_id');
}




     // Add relationship with UserBlock model
     public function block()
     {
         return $this->hasOne(UserBlock::class);
     }
 
     // Method to check if the user is blocked
     public function isBlocked()
     {
         $block = $this->block;
         return $block && $block->is_blocked;
     }
}
