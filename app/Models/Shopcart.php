<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shopcart extends Model
{
    use HasFactory;

    protected $fillable = [
        'cantidad',
        'costo_total', 
    ]; 
    public function cliente()
    {
        return $this->belongsTo('App\Models\Cliente');
    }

    public function articulo()
    {
        return $this->hasMany('App\Models\Articulo');
    }


}
