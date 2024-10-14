<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersBlocksTable extends Migration

{
    public function up()
{
    Schema::create('user_blocks', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
        $table->boolean('is_blocked')->default(0); // 0 = not blocked, 1 = blocked
        $table->string('reason')->nullable(); // Reason for blocking
        $table->timestamp('blocked_until')->nullable(); // Optional: block duration
        $table->timestamps();
    });
    
}


    public function down()
    {
        Schema::dropIfExists('user_blocks');
    }
}
