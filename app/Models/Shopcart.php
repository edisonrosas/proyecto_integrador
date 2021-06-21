<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Shopcart extends Model
{
    use HasFactory;

    protected $fillable = [
        'cantidad',
        'articulos',
        'costo_total', 
    ]; 
    
    public function cliente()
    {
        return $this->belongsTo('App\Models\Cliente');
    }

}
