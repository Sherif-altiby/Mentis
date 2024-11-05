<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('enrollment_id')->constrained()->onDelete('cascade');
            $table->decimal('amount', 10, 2);
            $table->string('currency', 3)->default('USD'); // 3-letter ISO code for currency
            $table->string('payment_method');
            $table->string('transaction_id')->nullable()->unique(); // for external payment references
            $table->enum('status', ['completed', 'pending', 'failed', 'pending_admin_approval'])->default('pending');
            $table->timestamp('payment_date')->nullable();
            $table->timestamps();
        });
        
        
    }

    public function down()
    {
        Schema::dropIfExists('payments');
    }
}
