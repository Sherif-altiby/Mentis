<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateFilesTable extends Migration
{
    public function up()
    {
        Schema::create('files', function (Blueprint $table) {
            $table->id(); // This is an auto-incrementing UNSIGNED BIGINT
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('file_name');
            $table->string('file_type');
            $table->binary('file_data'); // Define it as binary for now
            $table->timestamps();
        });

        // Modify the 'file_data' column to be a LONGBLOB using raw SQL
        DB::statement('ALTER TABLE files MODIFY file_data LONGBLOB');
    }

    public function down()
    {
        Schema::dropIfExists('files');
    }
}
