<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable('key', 'content')]
class FrontendData extends Model
{
    protected $casts = [
        'content' => 'array',
    ];
}
