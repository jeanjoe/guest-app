<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        try {
            $this->info('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
            $this->info('XXXX                                                 XXXX');
            $this->info('XXXX            WELCOME TO GUEST APP SET UP          XXXX');
            $this->info('XXXX                                                 XXXX');
            $this->info('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');

            $this->newLine(3);

            $this->error('NOTE: THIS PROCESS WILL RESET YOUR DATABASE');
            
            $this->newLine(3);

            $fullName = $this->ask("ENTER ADMIN'S FULL NAME");
            $fullName = $this->ask("ADMIN'S EMAIL ADDRESS ");

        } catch (\Throwable $th) {
            //throw $th;
        }
        
    }
}
