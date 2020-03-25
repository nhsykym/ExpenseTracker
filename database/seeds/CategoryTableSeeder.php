<?php

use Illuminate\Database\Seeder;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            ['name' => '食費'],
            ['name' => '日用品費'],
            ['name' => '交際・娯楽費'],
            ['name' => '住居費'],
            ['name' => '水道光熱費'],
            ['name' => '通信費'],
            ['name' => 'その他']
        ];
        DB::table('categories')->insert($categories);
    }
}
