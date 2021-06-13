<?php

namespace Database\Factories;

use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;

class DetallesFactory extends Factory
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
            'tamaño' => $this->faker->randomFloat(2,50,130),
            'color' => $this->faker->colorName(),
            'peso' => $this->faker->randomFloat(2,1,12),
        ];
    }
}
