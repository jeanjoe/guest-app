<?php

namespace App\Http\Controllers;

use App\Http\Requests\GenerateTicketRequest;
use App\Models\Service;
use App\Models\Ticket;
use Carbon\Carbon;
use Error;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class GuestController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function welcome()
    {
        return Inertia::render('Welcome');
    }

    public function newTicket(Request $request)
    {

        $services = Service::get();

        return Inertia::render('Guest/NewTicket', compact('services'))->with(['message', $request->getSession('message')]);
    }

    /**
     * GET TICKET STATUS
     * 
     */
    public function ticketSearch(Request $request)
    {

        $ticketNumber = $request->get('ticket_number', null);
        $ticket = null;

        if (isset($ticketNumber)) {
            $ticket = Ticket::with('service')->where(['ticket_number' => $ticketNumber, ['expiry_date', '>=', Carbon::today('Africa/Kampala')]])->first();
        }

        return Inertia::render('Guest/TicketSearch', compact('ticket', 'ticketNumber'));
    }


    /**
     * GENERATE NEW TICKET
     * 
     */
    public function generateTicket(GenerateTicketRequest $request)
    {
        try {
            $validated = $request->validated();

            if (!isset($validated)) throw new Error('Invalid request');

            $todays_tickets = DB::table('tickets')->whereDate('created_at', Carbon::today('Africa/Kampala'))->count();
            $tickets = Ticket::count();

            $serial_number = str_pad($tickets + 1, 12, 0, STR_PAD_LEFT);
            $ticket_number =  str_pad($todays_tickets + 1, 6, 0, STR_PAD_LEFT);
            DB::beginTransaction();

            $ticket = Ticket::create([
                'service_id' => $validated['service_id'],
                'category' => $validated['category'],
                'ticket_number' => $ticket_number,
                'ticket_counter' => $tickets + 1,
                'serial_number' => $serial_number,
                'expiry_date' => Carbon::today('Africa/Kampala')->endOfDay(),
            ]);

            $ticket_with_Service = Ticket::with('service')->findOrFail($ticket->id);

            DB::commit();
            return Inertia::render('Guest/Generated', ['ticket' => $ticket_with_Service]);
        } catch (Exception $ex) {
            DB::rollBack();
            return to_route('tickets.new')->withErrors(['error' => $ex->getMessage()]);
        }
    }
}
