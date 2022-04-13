<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookingdatas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booked_by');
            $table->string('purpose')->nullable();
            $table->foreignId('timeslot')->constrained();
            $table->foreignId('seat')->constrained();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('booked_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bookingdatas');
    }
};
