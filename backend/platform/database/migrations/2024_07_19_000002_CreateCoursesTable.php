<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;



class CreateCoursesTable extends Migration
{
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('teacher_id')->constrained('users')->onDelete('cascade');
            // $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->decimal('price', 8, 2);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('courses');
    }
}
