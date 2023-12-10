<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'ticket_number',
        'ticket_counter',
        'category',
        'service_id',
        'expiry_date',
        'serial_number'
    ];

    public function servicedBy(): BelongsTo {
        return $this->belongsTo(User::class, 'id', 'serviced_by_id');
    }

    public function service(): BelongsTo {
        return $this->belongsTo(Service::class);
    }
}
