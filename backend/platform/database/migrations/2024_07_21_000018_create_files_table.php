<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class createfilestable extends Migration
{
    public function up()
{
    Schema::create('files', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('user_id'); // Assuming each file is associated with a user
        $table->string('file_name');
        $table->string('linker');
        $table->string('file_type');
        $table->binary('file_data');
        $table->timestamps();

        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
    });
}


    public function down()
    {
        Schema::dropIfExists('files');
    }
}
