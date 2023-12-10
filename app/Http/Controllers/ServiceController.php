<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateServiceRequest;
use App\Models\Service;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Service::with('createdBy')->paginate(20);
        return Inertia::render('Services/Index', compact('services'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Services/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateServiceRequest $request)
    {
        try {
            $formattedCategories = array_map(function ($c) {
                return trim($c);
            }, explode(',', $request['sub_services']));

            DB::beginTransaction();
            Service::create([
                'name' => $request['name'],
                'description' => $request['description'],
                'is_active' => $request['is_active'],
                'user_id' => Auth::id(),
                'sub_services' => $formattedCategories,
            ]);
            DB::commit();
            return to_route('services.index')->with('success', 'New service added successfully.');
        } catch (Exception $e) {
            dd($e);
            DB::rollback();
            return redirect()->back()->withErrors(['error' => 'Unable to create this service ' . $e->getMessage()])->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service $service)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        //
    }
}
