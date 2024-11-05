<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'enrollment_id',
        'amount',
        'currency',
        'payment_method',
        'transaction_id',
        'status',
        'payment_date',
    ];

    public function enrollment()
    {
        return $this->belongsTo(Enrollment::class);
    }
}
