<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombres',
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
        //Un cliente puede haber realizado más de un carrito de compra, y realizar uno nuevo
        return $this->hasMany('App\Models\Shopcart');
    }

    public function pago()
    {
        //Un cliente puede haber realizado más de un carrito de compra, y realizar uno nuevo
        return $this->hasMany('App\Models\Pago');
    }

}
