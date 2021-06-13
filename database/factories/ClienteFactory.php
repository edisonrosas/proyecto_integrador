<?php

namespace Database\Factories;

use App\Models\Cliente;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClienteFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Cliente::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'apellidos' => $this->faker->lastname(),
            'celular' => $this->faker->phoneNumber(),
            'fecha_nacimiento' => $this->faker->dateTimeBetween('-80 years','-18 years'),
            'DNI' => $this->faker->randomNumber(8),
            'ciudad' => $this->faker->city(),
            'codigo_postal' => $this->faker->postcode(),
            'direccion' => $this->faker->address(),
        ];
    }
}
