<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Articulo extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre_articulo',
        'precio',
        'marca',
        'descripcion',
        'slug',
        'status',
        'imagen',
    ];     

    public function user()
    {
        return $this->belongsTo('App\Models\Categoria');
    }

    public function detalles()
    {
        return $this->belongsTo('App\Models\Detalles');
    }

    public function marca()
    {
        return $this->belongsTo('App\Models\Marca');
    }

}
