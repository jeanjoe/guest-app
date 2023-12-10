<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Auth\Events\Registered;
use App\Models\User;
use Carbon\Carbon;
use Exception;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
        $this->command->info('XXXX                                                 XXXX');
        $this->command->info('XXXX            WELCOME TO GUEST APP SET UP          XXXX');
        $this->command->info('XXXX                                                 XXXX');
        $this->command->info('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');

        $this->command->newLine();

        $this->command->error('NOTE: THIS PROCESS WILL RESET YOUR DATABASE');

        $this->command->newLine();


        $continue = $this->command->ask("ARE YOU SURE YOU WANT TO CONTINUE? Y/N - Default (N)");

        if (strtoupper($continue) == 'Y') {
            $superAdminName = $this->command->ask('Enter Super admin Full Name');
            $email = $this->command->ask("Enter " . $superAdminName . "'s Email address (Please provide a valid address, a verification link will be emailed to this address)");
            $phone = $this->command->ask("Enter " . $superAdminName . "'s  phone");
            $password = $this->command->ask("Enter " . $superAdminName . "'s  password");

            $permissionList = [
                [
                    'name' => 'view-roles',
                    'description' => 'Permission to view all System Roles.'
                ],
                [
                    'name' => 'create-role',
                    'description' => 'Permission to add New Role.'
                ],
                [
                    'name' => 'edit-role',
                    'description' => 'Permission to Edit System Roles.'
                ],
                [
                    'name' => 'delete-role',
                    'description' => 'Permission to Delete Roles.'
                ],
                [
                    'name' => 'view-permissions',
                    'description' => 'Permission to view all System Permissions.'
                ],
                [
                    'name' => 'create-permission',
                    'description' => 'Permission to add New Permission.'
                ],
                [
                    'name' => 'edit-permission',
                    'description' => 'Permission to Edit System Permission.'
                ],
                [
                    'name' => "delete-permission",
                    'description' => 'Permission to Delete System Permission.'
                ],
                [
                    'name' => 'view-users',
                    'description' => 'Permission to view all Users.'
                ],
                [
                    'name' => 'create-user',
                    'description' => 'Permission to add New User.'
                ],
                [
                    'name' => 'edit-user',
                    'description' => 'Permission to Edit User Account.'
                ],
                [
                    'name' => "delete-user",
                    'description' => 'Permission to Delete User accounts.'
                ],
                [
                    'name' => 'view-services',
                    'description' => 'Permission to view all Services.'
                ],
                [
                    'name' => 'print-certificates',
                    'description' => 'Permission to download Student Services.'
                ],
                [
                    'name' => 'create-service',
                    'description' => 'Permission to add New Service.'
                ],
                [
                    'name' => 'edit-service',
                    'description' => 'Permission to Edit Service.'
                ],
                [
                    'name' => "delete-service",
                    'description' => 'Permission to Delete Service.'
                ],
                [
                    'name' => "upload-services",
                    'description' => 'Permission to Upload Services.'
                ],
                [
                    'name' => "download-services",
                    'description' => 'Permission to Download Services.'
                ],
                [
                    'name' => 'view-tickets',
                    'description' => 'Permission to view all Tickets.'
                ],
                [
                    'name' => 'create-ticket',
                    'description' => 'Permission to add New Tickets.'
                ],
                [
                    'name' => 'edit-ticket',
                    'description' => 'Permission to Edit Tickets.'
                ],
                [
                    'name' => "delete-ticket",
                    'description' => 'Permission to Delete Tickets.'
                ],
                [
                    'name' => 'download-report',
                    'description' => 'Permission to Download Reports.'
                ],
                [
                    'name' => 'download-document',
                    'description' => 'Permission to Download documents.'
                ],
                [
                    'name' => "delete-document",
                    'description' => 'Permission to Delete Documents on the system.'
                ]
            ];

            try {
                DB::beginTransaction();

                // reset cached roles and permissions
                app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
                $user = User::firstOrCreate(
                    [
                        'email' => $email
                    ],
                    [
                        'name' => $superAdminName,
                        'email' => $email,
                        'phone' => $phone,
                        'is_active' => true,
                        'email_verified_at' => Carbon::now(),
                        'is_default_password' => false,
                        'user_type' => 'SYSTEM-USER',
                        'title' => 'SUPER ADMIN',
                        'password' => Hash::make($password)
                    ]
                );
                $user->save();

                $this->command->info('Migrating Permissions and Roles...');
                $role = new Role();
                $role->name = 'superadmin';
                $role->guard_name = 'web';
                $role->description = 'Super Admin Manages User Roles and Permissions.';
                $user->createdRoles()->save($role);

                $createdPermissions = [];
                foreach ($permissionList as $list) {
                    $permission = new Permission();
                    $permission->name = $list['name'];
                    $permission->description = $list['description'];
                    $permission->guard_name = 'web';
                    $user->createdPermissions()->save($permission);
                    $createdPermissions[] = $permission;
                }

                $role->givePermissionTo(Permission::all());
                $user->assignRole($role);
                $this->command->info('Permissions with role ' . $role->name . ' created successfully');

                $this->command->info('Sending Email to Super admin...');
                event(new Registered($user));
                $this->command->info('Email Sent!');

                DB::commit();
                $this->command->info('Super Admin account migrated successfully:');
                $this->command->info('Email: ' . $user->email . ' Password: ' . $password);
            } catch (Exception $e) {
                DB::rollback();
                $this->command->error('Unable to migrate super admin account : ' . $e->getMessage());
            }
        } else {
            $this->command->info('DB SEEDING EXITED!......BYE...');
        }
    }
}
