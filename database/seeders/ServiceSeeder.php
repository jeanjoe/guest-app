<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\User;
use Carbon\Carbon;
use Error;
use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('SEEDING SERVICES...');

        try {
            $firstUser = User::first();

            if (!isset($firstUser)) throw new Error('No User Account found in the Database');

            $services = [
                [
                    'name' => 'PASSPORT AND TRAVEL DOCUMENT',
                    'description' => 'Passports and Travel Documents',
                    'is_active' => true,
                    'user_id' => $firstUser->id,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                    'sub_services' => json_encode(["Ordinary Passport", "Service Passport", "Diplomatic Passport", "Certification of Passport", "Renewal/Replacement of Passport", "Lost/Damaged Passport", "Inter-State Pass", "Temporary Movement Permit", "Certificates of Identity", "Conventional travel Documents (CTDS)"]),
                ],
                [
                    'name' => 'VISA',
                    'description' => 'VISA PROCESSING',
                    'is_active' => true,
                    'user_id' => $firstUser->id,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                    'sub_services' => json_encode(["Uganda Tourist Visa – Single Entry", "Diplomatic and Other Visa", "Transit Visas", "Multiple-entry Visa", "East African Tourist Visa", "Visa Exempt Countries"]),
                ],
                [
                    'name' => 'PERMIT AND PASS',
                    'description' => 'Permits and Passes',
                    'is_active' => true,
                    'user_id' => $firstUser->id,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                    'sub_services' => json_encode(["Entry Permit", "Student Pass", "Dependent Pass", "Special Pass", "Certificate of Residence", "Security Bond Refund"]),
                ],
                [
                    'name' => 'INSPECTION AND LEGAL',
                    'description' => 'Inspections and Legal',
                    'is_active' => true,
                    'user_id' => $firstUser->id,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                    'sub_services' => json_encode(["Inspections and Investigations", "Issuing Immigration bond", "Detention", "Prosecution", "Removals and Deportations", "Appeals", "Legal Advisory"]),
                ],
                [
                    'name' => 'CITIZENSHIP',
                    'description' => 'Citizenship',
                    'is_active' => true,
                    'user_id' => $firstUser->id,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                    'sub_services' => json_encode(["Citizenship by Registration", "Citizenship by Naturalization", "Dual Citizenship", "Renunciation", "Re-Acquisition – Former Ugandan", "Certification of Citizenship", "Digitization of Manually Issued Certificates of Citizenship", "Replacement of Certificate of Citizenship"]),
                ]
            ];

            Service::insertOrIgnore($services);

            $this->command->info('SERVICES MIGRATED SUCCESSFULLY......');
        } catch (Exception $ex) {
            $this->command->error('UNABLE TO MIGRATE SERVICES' . $ex->getMessage());
        }
    }
}
