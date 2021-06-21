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
        'imagen'
    ];     


    public function detalles()
    {
        return $this->hasOne('App\Models\Detalles');
    }

    public function marca()
    {
        return $this->hasOne('App\Models\Marca');
    }

    public function categoria()
    {
        return $this->hasOne('App\Models\Categoria');
    }

}
