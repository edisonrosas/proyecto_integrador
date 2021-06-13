<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
class Articulo extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre_articulo',
        'precio',
        'descripcion',
        'slug',
        'status',
        'imagen',
    ];     


    public function detalles()
    {
        return $this->belongsTo('App\Models\Detalles');
    }

    public function marca()
    {
        return $this->belongsTo('App\Models\Marca');
    }

    public function categoria()
    {
        return $this->belongsTo('App\Models\Categoria');
    }

}
