<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    use HasFactory;

    protected $fillable = [
        'tipo_pago',
        'costo_total', 
    ]; 

    public function shopCart()
    {
        return $this->belongsTo('App\Models\Shopcart');
    }
}
