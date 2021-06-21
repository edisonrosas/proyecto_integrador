<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Marca extends Model
{
    use HasFactory;

    protected $fillable = [
        'marca',
        'slug',    
    ]; 

    public function articulo()
    {
        return $this->hasMany('App\Models\Articulo');
    }
}
