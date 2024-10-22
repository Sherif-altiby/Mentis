<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserBlock extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'is_blocked', 'reason', 'blocked_until'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
