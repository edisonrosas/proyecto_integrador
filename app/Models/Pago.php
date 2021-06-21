<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Pago extends Model
{
    use HasFactory;

    protected $fillable = [
        'tipo_pago',
        'costo_total',
        'cliente_id', 
    ]; 

    public function shopCart()
    {
        return $this->belongsTo('App\Models\Shopcart');
    }

    public function cliente()
    {
        return $this->belongsTo('App\Models\Cliente');
    }
}
