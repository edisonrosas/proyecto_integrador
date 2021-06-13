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
        
        Articulo::factory(10)
            ->has(Marca::factory()->count(1))
            ->has    (Categoria::factory()->count(1))
            ->has    (Detalles::factory()->count(1))      
            ->create();

    }
}
