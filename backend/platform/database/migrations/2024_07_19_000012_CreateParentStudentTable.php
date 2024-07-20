<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateParentStudentTable extends Migration
{
    public function up()
    {
        Schema::create('parent_student', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parent_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('parent_student');
    }
}
