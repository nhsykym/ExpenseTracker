<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Expenses;
use Faker\Generator as Faker;


$faker = Faker\Factory::create('ja_JP');

$factory->define(Expenses::class, function (Faker $faker) {
    return [
        'purchased_at' => $faker->dateTimeThisMonth,
        'title' => $faker->word,
        'money' => Str::random(3),
        'category_id' => $faker->randomElement([1, 2]),
        'user_id' => $faker->randomElement([1, 2]),
    ];
});
