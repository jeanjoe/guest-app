<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterUserRequest;
use App\Mail\UserRegistered;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth:web', 'verified']);
        $this->middleware('permission:view-users');
        $this->middleware('permission:create-user', ['only' => ['create', 'store']]);
        $this->middleware('permission:edit-user', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete-user', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::get();

        return Inertia::render('Users/Index', ['users' => $users]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::get();
        return Inertia::render('Users/Create', compact('roles'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RegisterUserRequest $request)
    {
        try {
            DB::beginTransaction();
            $password = 'password' . rand(100, 999);
            $user = User::create([
                'name' => $request['name'],
                'phone' => $request['phone'],
                'email' => $request['email'],
                'title' => $request['title'],
                'password' => bcrypt($password),
            ]);

            $roles = $request['roles'];
            //Checking if a role was selected
            if (isset($roles)) {
                foreach ($roles as $role) {
                    $role_r = Role::where('id', '=', $role)->firstOrFail();
                    $user->assignRole($role_r); //Assigning role to user
                }
            }
            $emailTo = env('MAIL_ADDRESS', $request['email']);
            Mail::to($emailTo)->send(new UserRegistered($user, $password));
            $user->sendEmailVerificationNotification();
            DB::commit();
            return to_route('users.index')->with('success', 'New User successfully added and password has been emailed to them');
        } catch (Exception $e) {
            DB::rollback();
            return redirect()->back()->withErrors(['error' => 'Unable to create this user account ' . $e->getMessage()])->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
