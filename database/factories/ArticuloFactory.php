<?php

namespace Database\Factories;

use App\Models\Articulo;
use App\Models\Marca;
use App\Models\Categoria;
use App\Models\Detalles;
use Illuminate\Database\Eloquent\Factories\Factory;

class ArticuloFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Articulo::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nombre_articulo' => $this->faker->sentence(1),
            /*
            'marca_id'=> rand(1,Marca::count()),
            'categoria_id'=>rand(1,Categoria::count()),
            'detalles_id'=>rand(1,Detalles::count()),
*/
                                       //Nro Decimales, Min,Max
            'precio' => $this->faker->randomFloat(2,10,50),
            'descripcion' => $this->faker->paragraph(1),
            'slug'=> $this->faker->word(),
            'status'=> 'A',
            'imagen' => 'img/'.$this->faker->image('public/img',400,300,null,false),
        ];
    }
}
