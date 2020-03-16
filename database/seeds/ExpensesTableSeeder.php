<?php

use Illuminate\Database\Seeder;

class ExpensesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('expenses')->insert([
            'purchased_at' => '2020-03-12',
            'title' => Str::random(10),
            'money' => 300,
            'category_id' => 1,
            'user_id' => 1,
        ]);
        DB::table('expenses')->insert([
            'purchased_at' => '2020-03-13',
            'title' => Str::random(10),
            'money' => 200,
            'category_id' => 1,
            'user_id' => 1,
        ]);
    }
}
