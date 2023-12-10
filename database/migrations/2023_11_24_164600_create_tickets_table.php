<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('ticket_number', 20);
            $table->string('ticket_counter', 20);
            $table->string('serial_number', 50);
            $table->string('category');
            $table->unsignedBigInteger('service_id');
            $table->foreign('service_id')->references('id')->on('services');
            $table->timestamp('expiry_date');
            $table->boolean('serviced')->default(false)->comment('Client has been served');
            $table->timestamp('serviced_at')->nullable();
            $table->unsignedBigInteger('serviced_id')->nullable();
            $table->foreign('serviced_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
