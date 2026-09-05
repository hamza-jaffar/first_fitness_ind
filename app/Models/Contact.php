<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable('full_name', 'email', 'phone_no', 'subject', 'comment')]
class Contact extends Model
{
    //
}
