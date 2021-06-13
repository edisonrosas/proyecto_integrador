<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detalles extends Model
{
    use HasFactory;
    protected $fillable = [
        'tamaño',
        'color',
        'peso',
    ]; 

    public function articulo()
    {
        return $this->belongsTo('App\Models\Articulo');
    }


}
