<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable=[
        'titulo',
        'documento1',
        'documento2'
    ];
}
