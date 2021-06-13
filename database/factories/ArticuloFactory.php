<?php

namespace Database\Factories;

use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;

class ArticuloFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Model::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nombre_articulo' => $this->faker->sentence(1),
                                       //Nro Decimales, Min,Max
            'precio' => $this->faker->randomFloat(2,10,50),
            'marca' => $this->faker->word(),
            'descripcion' => $this->faker->paragraph(1),
            'slug'=> $this->faker->word(),
            'status'=> 'A',
            'imagen' => 'img/'.$this->faker->image('public/img',400,300,null,false),
        ];
    }
}
