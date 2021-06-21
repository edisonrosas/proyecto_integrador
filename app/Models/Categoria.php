<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;

    protected $fillable = [
        'categoria',
        'slug',    
    ]; 

    public function articulos()
    {
        return $this->hasMany('App\Models\Articulo');
    }

}
