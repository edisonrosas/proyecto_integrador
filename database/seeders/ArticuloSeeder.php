<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Articulo;
use App\Models\Marca;
use App\Models\Categoria;
use App\Models\Detalles;


class ArticuloSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Articulo::factory(50)->create()->each(function ($articulo) {
            $articulo->categoria()->save(Categoria::factory()->make());
            $articulo->detalles()->save(Detalles::factory()->make());
            $articulo->marca()->save(Marca::factory()->make());
        });
  /*
        Categoria::factory(4)
        ->has(Articulo::factory(4) 
        )
             
        ->create();*/


/*
        Articulo::factory(10)
            ->has(Marca::factory(1))
            ->has(Categoria::factory(1))
            ->has(Detalles::factory(1))      
            ->create();
*/
    }
}
