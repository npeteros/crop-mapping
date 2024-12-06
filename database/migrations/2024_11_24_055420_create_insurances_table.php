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
        Schema::create('insurances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('rsba');
            $table->string('last_name');
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('sex');
            $table->string('mobile');
            $table->date('dob');
            $table->string('email');
            $table->string('civil_status');
            $table->string('spouse')->nullable();
            $table->string('crop_type');
            $table->string('planting_season');
            $table->date('planting_date');
            $table->date('harvest_date');
            $table->integer('cultivation_area');
            $table->string('coverage_type');
            $table->integer('sum_insured');
            $table->string('beneficiary_name_a');
            $table->integer('beneficiary_age_a');
            $table->string('beneficiary_relationship_a');
            $table->string('beneficiary_name_b');
            $table->integer('beneficiary_age_b');
            $table->string('beneficiary_relationship_b');
            $table->string('farm_image');
            $table->boolean('approved')->nullable();
            $table->date('schedule_date')->nullable();
            $table->string('schedule_time')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('insurances');
    }
};
