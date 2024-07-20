<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuizQuestionsTable extends Migration
{
    public function up()
    {
        Schema::create('quiz_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quiz_id')->constrained('quizzes')->onDelete('cascade');
            $table->string('question');
            $table->json('options');
            $table->string('correct_answer');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('quiz_questions');
    }
}
