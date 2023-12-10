<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'is_active',
        'user_id',
        'sub_services',
    ];

    public function createdBy(): BelongsTo {
        
        return $this->belongsTo(User::class, 'user_id');
    }


    /**
     * Get the Service Category
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function subServices(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => json_decode($value, true),
            set: fn ($value) => json_encode($value),
        );
    } 
}
