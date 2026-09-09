<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $mainCategories = [
            [
                'name' => 'Boxing Gear',
                'image' => 'categories/cat1.jpg',
            ],
            [
                'name' => 'Martial Arts',
                'image' => 'categories/cat3.jpg',
            ],
            [
                'name' => 'MMA Gear',
                'image' => 'categories/cat4.jpg',
            ],
            [
                'name' => 'Casual Wears',
                'image' => 'categories/cat2.jpg',
            ],
            [
                'name' => 'Sports Uniforms',
                'image' => 'categories/cat5.jpg',
            ],
            [
                'name' => 'Fitness Wears',
                'image' => 'categories/cat6.jpg',
            ],
            [
                'name' => 'Uniforms',
                'image' => null,
            ],
        ];

        foreach ($mainCategories as $category) {
            Category::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'image' => $category['image'],
                'desc' => null,
                'parent_category_id' => null,
            ]);
        }

        $uniforms = [
            'Company Uniforms',
            'Corporate Uniforms',
            'Hotel Uniforms',
            'Industrial Uniforms',
            'Medical Uniforms',
            'Labor Uniforms',
            'Militaria Uniforms',
            'School Uniforms',
            'Team Uniforms',
        ];

        $uniformCategory = Category::where('slug', 'uniforms')->first();

        foreach ($uniforms as $name) {
            Category::create([
                'name' => $name,
                'slug' => Str::slug($name),
                'image' => null,
                'desc' => null,
                'parent_category_id' => $uniformCategory->id,
            ]);
        }
    }
}
