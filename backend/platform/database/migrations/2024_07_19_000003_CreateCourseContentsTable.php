<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCourseContentsTable extends Migration
{
    public function up()
    {
        Schema::create('course_contents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained('courses')->onDelete('cascade');
            $table->enum('content_type', ['video', 'document', 'quiz']);
            $table->string('title');
            $table->binary('image')->nullable(); // Store image as binary data
            $table->string('file_path')->nullable();
            $table->text('content')->nullable();
            $table->integer('order')->default(0); // This will be updated later
            $table->enum('level', ['first', 'second', 'third'])->default('first');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('course_contents');
    }
}
