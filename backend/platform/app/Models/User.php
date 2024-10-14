<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, HasFactory;

    protected $table = 'users';

    protected $fillable = [
        'name', 'email', 'password', 'phone_number', 'role',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function courses()
    {
        return $this->hasMany(Course::class, 'teacher_id');
    }
        // In User model (app/Models/User.php)
    public function getRoleAttribute()
    {
        return $this->attributes['role'];
    }
    public function files()
    {
        return $this->hasMany(File::class);
    }
    public function isBlocked()
    {
        // Fetch block record related to this user
        $block = UserBlock::where('user_id', $this->id)->first();

        // Check if user is blocked
        return $block && $block->is_blocked;
    }

}
