<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class createstudentstable extends Migration
{
    public function up()
{
    Schema::create('students', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
        $table->integer('grade_level')->nullable(); // Integer representation of grade level
        $table->timestamps();
    });
}



    public function down()
    {
        Schema::dropIfExists('students');
    }
}
