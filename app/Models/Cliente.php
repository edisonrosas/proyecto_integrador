<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;
    protected $fillable = [
        'apellidos',
        'celular',
        'fecha_nacimiento',
        'DNI',
        'ciudad',
        'codigo_postal',
        'direccion', 
    ]; 

    public function shopcart()
    {
        return $this->belongsTo('App\Models\Shopcart');
    }


}
