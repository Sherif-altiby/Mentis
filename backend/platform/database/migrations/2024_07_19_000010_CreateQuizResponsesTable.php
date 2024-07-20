<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuizResponsesTable extends Migration
{
    public function up()
    {
        Schema::create('quiz_responses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quiz_question_id')->constrained('quiz_questions')->onDelete('cascade');
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            $table->string('answer');
            $table->boolean('is_correct');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('quiz_responses');
    }
}
